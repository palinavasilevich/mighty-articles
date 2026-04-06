import { useState } from "react";
import { fetchSentence, type SentenceData } from "../services/groq";
import type { SentenceLength } from "../shared/constants/sentence-length-options";

export type Status = "idle" | "loading" | "playing" | "checked" | "error";

export type MaskedSentenceData = SentenceData & { maskedSentence: string };

function buildMaskedSentence(sentence: string, articles: string[]): string {
  let remaining = sentence;
  let masked = "";

  for (const article of articles) {
    const pattern = new RegExp(`\\b${article}\\b`, "i");
    const match = pattern.exec(remaining);
    if (!match) {
      throw new Error(
        `Sentence masking mismatch: could not find article "${article}" in the remaining sentence. The model response may be inconsistent.`,
      );
    }
    masked += remaining.slice(0, match.index) + "__ARTICLE__";
    remaining = remaining.slice(match.index + match[0].length);
  }

  return masked + remaining;
}

export function useGenerateSentence() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentenceData, setSentenceData] = useState<MaskedSentenceData | null>(
    null,
  );
  const [length, setLength] = useState<SentenceLength>("medium");
  const [userGuesses, setUserGuesses] = useState<string[]>([]);

  const generateSentence = async () => {
    setStatus("loading");
    setErrorMsg("");
    setSentenceData(null);
    setUserGuesses([]);

    try {
      const data = await fetchSentence(length);
      setSentenceData({
        ...data,
        maskedSentence: buildMaskedSentence(data.sentence, data.articles),
      });
      setUserGuesses(new Array(data.articles.length).fill(""));

      setStatus("playing");
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "An unknown error occurred.",
      );
      setStatus("error");
    }
  };

  const setGuess = (index: number, value: string) => {
    setUserGuesses((prev) => prev.map((g, i) => (i === index ? value : g)));
  };

  const checkAnswers = () => {
    setStatus("checked");
  };

  const resetGuesses = () => {
    setUserGuesses(new Array(userGuesses.length).fill(""));
    setStatus("playing");
  };

  return {
    status,
    errorMsg,
    sentenceData,
    length,
    setLength,
    generateSentence,
    userGuesses,
    setGuess,
    checkAnswers,
    resetGuesses,
  };
}
