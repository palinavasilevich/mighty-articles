import { useState } from "react";
import { fetchSentence, type SentenceData } from "../services/groq";
import type { SentenceLength } from "../constants/sentence-length-options";
import { isCorrectArticle } from "../utils/isCorrectArticle";

export type Status = "idle" | "loading" | "playing" | "checked" | "error";

export type MaskedSentenceData = SentenceData & { maskedSentence: string };

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const DECLENSIONS: Record<string, string[]> = {
  ein: ["einen", "einem", "einer", "eines"],
  kein: ["keinen", "keinem", "keiner", "keines"],
  eine: ["einen", "einem", "einer"],
  keine: ["keinen", "keinem", "keiner"],
};

function findArticleMatch(
  slice: string,
  article: string,
): RegExpExecArray | null {
  const exact = new RegExp(`\\b${escapeRegex(article)}\\b`, "i");
  const match = exact.exec(slice);
  if (match) return match;

  for (const alt of DECLENSIONS[article] ?? []) {
    const altMatch = new RegExp(`\\b${escapeRegex(alt)}\\b`, "i").exec(slice);
    if (altMatch) return altMatch;
  }

  return null;
}

function buildMaskedSentence(
  sentence: string,
  articles: string[],
): { maskedSentence: string; sortedArticles: string[] } {
  const found: { index: number; matchedText: string; article: string }[] = [];
  const usedRanges: [number, number][] = [];

  for (const article of articles) {
    let searchFrom = 0;
    let resolved: { index: number; matchedText: string } | null = null;

    while (searchFrom <= sentence.length) {
      const match = findArticleMatch(sentence.slice(searchFrom), article);
      if (!match) break;
      const start = searchFrom + match.index;
      const end = start + match[0].length;
      const overlaps = usedRanges.some(([s, e]) => start < e && end > s);
      if (!overlaps) {
        resolved = { index: start, matchedText: match[0] };
        usedRanges.push([start, end]);
        break;
      }
      searchFrom = start + 1;
    }

    if (!resolved) {
      throw new Error(
        `Masking error: could not find "${article}" in sentence.`,
      );
    }

    found.push({ index: resolved.index, matchedText: resolved.matchedText, article });
  }
  found.sort((a, b) => a.index - b.index);

  let masked = "";
  let cursor = 0;

  for (const { index, matchedText } of found) {
    masked += sentence.slice(cursor, index) + "__ARTICLE__";
    cursor = index + matchedText.length;
  }

  return {
    maskedSentence: masked + sentence.slice(cursor),
    sortedArticles: found.map((f) => f.matchedText.toLowerCase()),
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
    setUserGuesses(
      Array.from({ length: sentenceData!.articles.length }, () => ""),
    );
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
