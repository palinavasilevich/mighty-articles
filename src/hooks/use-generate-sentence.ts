import { useState, useMemo, useRef, useReducer } from "react";
import { fetchSentence, type SentenceData } from "../services/groq";
import { getRandomBookSentence } from "../services/book";
import type { SentenceLength } from "../constants/sentence-length-options";
import { isCorrectArticle } from "../utils/isCorrectArticle";
import { buildMaskedSentence } from "../utils/masking";

export type SentenceMode = "ai" | "book";
export type Status = "idle" | "loading" | "playing" | "checked" | "error";
export type MaskedSentenceData = SentenceData & { maskedSentence: string };

type State = {
  status: Status;
  errorMsg: string;
  sentenceData: MaskedSentenceData | null;
  userAnswers: string[];
};

type Action =
  | { type: "LOADING" }
  | { type: "LOADED"; sentenceData: MaskedSentenceData }
  | { type: "ERROR"; msg: string }
  | { type: "CHECK" }
  | { type: "SET_GUESS"; index: number; value: string }
  | { type: "RESET_WRONG"; newGuesses: string[] }
  | { type: "RESET" };

const initialState: State = {
  status: "idle",
  errorMsg: "",
  sentenceData: null,
  userAnswers: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOADING":
      return { ...initialState, status: "loading" };
    case "LOADED":
      return {
        status: "playing",
        errorMsg: "",
        sentenceData: action.sentenceData,
        userAnswers: Array.from(
          { length: action.sentenceData.articles.length },
          () => "",
        ),
      };
    case "ERROR":
      return { ...initialState, status: "error", errorMsg: action.msg };
    case "CHECK":
      return { ...state, status: "checked" };
    case "SET_GUESS":
      return {
        ...state,
        userAnswers: state.userAnswers.map((g, i) =>
          i === action.index ? action.value : g,
        ),
      };
    case "RESET_WRONG":
      return { ...state, status: "playing", userAnswers: action.newGuesses };
    case "RESET":
      return initialState;
  }
}

export function useGenerateSentence(mode: SentenceMode) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sentenceLength, setSentenceLength] =
    useState<SentenceLength>("medium");
  const abortRef = useRef<AbortController | null>(null);

  const { status, errorMsg, sentenceData, userAnswers } = state;

  const score = useMemo(() => {
    if (status !== "checked" || !sentenceData) return null;
    return userAnswers.filter((g, i) =>
      isCorrectArticle(g, sentenceData.articles[i]),
    ).length;
  }, [status, sentenceData, userAnswers]);

  const generateSentence = async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    dispatch({ type: "LOADING" });

    try {
      const data =
        mode === "book"
          ? getRandomBookSentence()
          : await fetchSentence(sentenceLength);

      if (abortRef.current.signal.aborted) return;

      const { maskedSentence, sortedArticles } = buildMaskedSentence(
        data.sentence,
        data.articles,
      );

      dispatch({
        type: "LOADED",
        sentenceData: { ...data, articles: sortedArticles, maskedSentence },
      });
    } catch (error) {
      if (abortRef.current.signal.aborted) return;
      dispatch({
        type: "ERROR",
        msg: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const setGuess = (index: number, value: string) =>
    dispatch({ type: "SET_GUESS", index, value });

  const checkAnswers = () => dispatch({ type: "CHECK" });

  const resetGuesses = () => {
    if (!sentenceData) return;
    dispatch({
      type: "RESET_WRONG",
      newGuesses: userAnswers.map((guess, i) =>
        isCorrectArticle(guess, sentenceData.articles[i]) ? guess : "",
      ),
    });
  };

  const reset = () => dispatch({ type: "RESET" });

  return {
    status,
    errorMsg,
    sentenceData,
    sentenceLength,
    setSentenceLength,
    generateSentence,
    userGuesses: userAnswers,
    score,
    setGuess,
    checkAnswers,
    resetGuesses,
    reset,
  };
}
