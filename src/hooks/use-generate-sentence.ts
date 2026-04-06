import { useState } from "react";
import { fetchSentence, type SentenceData } from "../services/groq";
import { type SentenceLength } from "../shared/constants/prompts";

export type Status = "idle" | "loading" | "playing" | "checked" | "error";

export function useGenerateSentence() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentenceData, setSentenceData] = useState<SentenceData | null>(null);
  const [length, setLength] = useState<SentenceLength>("medium");

  const resetData = () => {
    setStatus("loading");
    setErrorMsg("");
    setSentenceData(null);
  };

  const generateSentence = async () => {
    resetData();

    try {
      const data = await fetchSentence(length);
      setSentenceData(data);
      setStatus("playing");
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "An unknown error occurred.",
      );
      setStatus("error");
    }
  };

  return {
    status,
    errorMsg,
    sentenceData,
    length,
    setLength,
    generateSentence,
  };
}
