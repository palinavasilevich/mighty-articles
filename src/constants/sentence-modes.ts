import type { SentenceMode } from "../store/sentence/types";

export const MODES: { value: SentenceMode; label: string }[] = [
  { value: "ai", label: "AI Generated" },
  { value: "book", label: "Harry Potter" },
];
