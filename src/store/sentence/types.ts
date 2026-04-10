import type { SentenceData } from "../../services/groq";

export type SentenceMode = "ai" | "book";
export type Status = "idle" | "loading" | "playing" | "checked" | "error";
export type MaskedSentenceData = SentenceData & { maskedSentence: string };
