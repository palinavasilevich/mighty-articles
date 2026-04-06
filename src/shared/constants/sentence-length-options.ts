export type SentenceLength = "short" | "medium" | "long";

export const LENGTH_OPTIONS: { value: SentenceLength; label: string }[] = [
  { value: "short", label: "Short (~5 words)" },
  { value: "medium", label: "Medium (~10 words)" },
  { value: "long", label: "Long (~15 words)" },
];
