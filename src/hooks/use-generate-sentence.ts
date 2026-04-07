import { useState } from "react";
import { fetchSentence, type SentenceData } from "../services/groq";
import type { SentenceLength } from "../shared/constants/sentence-length-options";
import { isCorrectArticle } from "../utils/isCorrectArticle";

export type Status = "idle" | "loading" | "playing" | "checked" | "error";

export type MaskedSentenceData = SentenceData & { maskedSentence: string };

function buildMaskedSentence(
  sentence: string,
  articles: string[],
): { maskedSentence: string; sortedArticles: string[] } {
  const sortedArticles = [...articles].sort((a, b) => {
    const posA = sentence.search(new RegExp(`\\b${a}\\b`, "i"));
    const posB = sentence.search(new RegExp(`\\b${b}\\b`, "i"));
    return posA - posB;
  });

  let remaining = sentence;
  let masked = "";

  for (const article of sortedArticles) {
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

  return { maskedSentence: masked + remaining, sortedArticles };
}

export function useGenerateSentence() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentenceData, setSentenceData] = useState<MaskedSentenceData | null>(
    null,
  );
  const [sentenceLength, setSentenceLength] =
    useState<SentenceLength>("medium");
  const [userGuesses, setUserGuesses] = useState<string[]>([]);

  const score =
    status === "checked" && sentenceData
      ? userGuesses.filter((g, i) =>
          isCorrectArticle(g, sentenceData.articles[i]),
        ).length
      : null;

  const generateSentence = async () => {
    setStatus("loading");
    setErrorMsg("");
    setSentenceData(null);
    setUserGuesses([]);

    try {
      const data = await fetchSentence(sentenceLength);
      const { maskedSentence, sortedArticles } = buildMaskedSentence(
        data.sentence,
        data.articles,
      );
      setSentenceData({ ...data, articles: sortedArticles, maskedSentence });
      setUserGuesses(new Array(sortedArticles.length).fill(""));

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
    sentenceLength,
    setSentenceLength,
    generateSentence,
    userGuesses,
    score,
    setGuess,
    checkAnswers,
    resetGuesses,
  };
}
