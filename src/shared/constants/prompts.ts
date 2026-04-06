import { ARTICLES } from "./articles";
import type { SentenceLength } from "./sentence-length-options";

const LENGTH_INSTRUCTIONS: Record<SentenceLength, string> = {
  short: "The sentence should be short (around 5 words).",
  medium: "The sentence should be medium length (around 10 words).",
  long: "The sentence should be long (around 15 words).",
};

export function buildPrompt(length: SentenceLength): string {
  return `Generate a German sentence that uses multiple articles from this list: ${ARTICLES.join(", ")}.
The sentence should be simple and educational (A1-B1 level). ${LENGTH_INSTRUCTIONS[length]}
Return ONLY valid JSON with no markdown formatting:
{
  "sentence": "the full German sentence",
  "articles": ["first article (lowercase)", "second article (lowercase)"]
}
The "articles" array must list every article from the sentence in the order they appear.`;
}
