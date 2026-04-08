import { useState } from "react";
import { fetchSentence, type SentenceData } from "../services/groq";
import type { SentenceLength } from "../constants/sentence-length-options";
import { isCorrectArticle } from "../utils/isCorrectArticle";

export type Status = "idle" | "loading" | "playing" | "checked" | "error";

export type MaskedSentenceData = SentenceData & { maskedSentence: string };

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildMaskedSentence(
  sentence: string,
  articles: string[],
): { maskedSentence: string; sortedArticles: string[] } {
  // Find each article's position by scanning left-to-right through the sentence.
  // This correctly handles duplicate articles and avoids stale positions from
  // searching the full string for every article independently.
  const found: { index: number; matchedText: string; article: string }[] = [];
  let searchFrom = 0;

  for (const article of articles) {
    const pattern = new RegExp(`\\b${escapeRegex(article)}\\b`, "i");
    const match = pattern.exec(sentence.slice(searchFrom));

    if (!match) {
      throw new Error(
        `Masking error: could not find "${article}" in sentence.`,
      );
    }

    found.push({
      index: searchFrom + match.index,
      matchedText: match[0],
      article,
    });
    searchFrom = searchFrom + match.index + match[0].length;
  }

  // Sort by position in case the LLM returned articles out of order.
  found.sort((a, b) => a.index - b.index);

  let masked = "";
  let cursor = 0;

  for (const { index, matchedText } of found) {
    masked += sentence.slice(cursor, index) + "__ARTICLE__";
    cursor = index + matchedText.length;
  }

  return {
    maskedSentence: masked + sentence.slice(cursor),
    sortedArticles: found.map((f) => f.article),
  };
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

      setSentenceData({
        ...data,
        articles: sortedArticles,
        maskedSentence,
      });

      setUserGuesses(Array.from({ length: sortedArticles.length }, () => ""));

      setStatus("playing");
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Unknown error");
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
