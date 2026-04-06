import { useState } from "react";
import { fetchSentence, type SentenceData } from "../services/groq";
import type { SentenceLength } from "../shared/constants/sentence-length-options";

// export type Status = "idle" | "loading" | "playing" | "checked" | "error";

export type EnrichedSentenceData = SentenceData & { maskedSentence: string };

function buildMaskedSentence(sentence: string, articles: string[]): string {
  const pattern = new RegExp(`\\b(${articles.join("|")})\\b`, "gi");
  return sentence.replace(pattern, "__ARTICLE__");
}

export function useGenerateSentence() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sentenceData, setSentenceData] = useState<EnrichedSentenceData | null>(null);
  const [length, setLength] = useState<SentenceLength>("medium");

  const generateSentence = async () => {
    setIsLoading(true);
    setErrorMsg("");
    setSentenceData(null);

    try {
      const data = await fetchSentence(length);
      setSentenceData({
        ...data,
        maskedSentence: buildMaskedSentence(data.sentence, data.articles),
      });
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "An unknown error occurred.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    sentenceData,
    length,
    setLength,
    generateSentence,
  };
}
