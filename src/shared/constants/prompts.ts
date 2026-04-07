import { ARTICLES } from "./articles";
import type { SentenceLength } from "./sentence-length-options";

const LENGTH_INSTRUCTIONS: Record<SentenceLength, string> = {
  short: "The sentence should be short (around 5 words).",
  medium: "The sentence should be medium length (around 10 words).",
  long: "The sentence should be long (around 15 words).",
};

export function buildPrompt(length: SentenceLength): string {
  return `Generate a natural, everyday German sentence at A1-B1 level. ${LENGTH_INSTRUCTIONS[length]}
The sentence must contain 2 to 3 articles chosen from this list: ${ARTICLES.join(", ")}.
The sentence should describe a realistic, everyday situation (e.g. someone buying something, going somewhere, describing their home or family). Avoid awkward constructions — the sentence must sound like something a native speaker would actually say.
Return ONLY valid JSON with no markdown formatting:
{
  "sentence": "the full German sentence",
  "articles": ["first article in order of appearance (lowercase)", "second article (lowercase)"]
}
Rules:
- The "articles" array must list every article from the sentence in the exact order they appear.
- Only include articles from the allowed list above.
- Do not include the same word twice in the articles array unless it genuinely appears twice.`;
}
