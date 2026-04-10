import { create } from "zustand";
import { fetchSentence } from "../../services/groq";
import { getRandomBookSentence } from "../../services/book";
import { buildMaskedSentence } from "../../utils/masking";
import { isCorrectArticle } from "../../utils/isCorrectArticle";
import type { MaskedSentenceData, SentenceMode, Status } from "./types";
import type { SentenceLength } from "../../constants/sentence-length-options";

export type SentenceStoreState = {
  status: Status;
  errorMsg: string;
  sentenceData: MaskedSentenceData | null;
  userGuesses: string[];
  score: number | null;
  sentenceLength: SentenceLength;
  mode: SentenceMode;
};

type SentenceStoreActions = {
  generateSentence: () => Promise<void>;
  setGuess: (index: number, value: string) => void;
  checkAnswers: () => void;
  resetGuesses: () => void;
  reset: () => void;
  setSentenceLength: (length: SentenceLength) => void;
  setMode: (mode: SentenceMode) => void;
};

const initialState: SentenceStoreState = {
  status: "idle",
  errorMsg: "",
  sentenceData: null,
  userGuesses: [],
  score: null,
  sentenceLength: "medium",
  mode: "ai",
};

let abortController: AbortController | null = null;

export const useSentenceStore = create<
  SentenceStoreState & SentenceStoreActions
>()((set, get) => ({
  ...initialState,

  generateSentence: async () => {
    abortController?.abort();
    abortController = new AbortController();

    set({
      ...initialState,
      status: "loading",
      mode: get().mode,
      sentenceLength: get().sentenceLength,
    });

    try {
      const { mode, sentenceLength } = get();
      const data =
        mode === "book"
          ? getRandomBookSentence()
          : await fetchSentence(sentenceLength);

      if (abortController.signal.aborted) return;

      const { maskedSentence, sortedArticles } = buildMaskedSentence(
        data.sentence,
        data.articles,
      );

      set({
        status: "playing",
        errorMsg: "",
        sentenceData: { ...data, articles: sortedArticles, maskedSentence },
        userGuesses: Array.from({ length: sortedArticles.length }, () => ""),
      });
    } catch (error) {
      if (abortController.signal.aborted) return;
      set({
        ...initialState,
        status: "error",
        errorMsg: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  setGuess: (index, value) =>
    set((state) => ({
      userGuesses: state.userGuesses.map((g, i) => (i === index ? value : g)),
    })),

  checkAnswers: () =>
    set((state) => {
      if (!state.sentenceData) return { status: "checked" };
      const score = state.userGuesses.filter((g, i) =>
        isCorrectArticle(g, state.sentenceData!.articles[i]),
      ).length;
      return { status: "checked", score };
    }),

  resetGuesses: () =>
    set((state) => {
      if (!state.sentenceData) return {};
      return {
        status: "playing",
        score: null,
        userGuesses: state.userGuesses.map((guess, i) =>
          isCorrectArticle(guess, state.sentenceData!.articles[i]) ? guess : "",
        ),
      };
    }),

  reset: () => set(initialState),

  setSentenceLength: (sentenceLength) => set({ sentenceLength }),

  setMode: (mode) => set({ mode }),
}));
