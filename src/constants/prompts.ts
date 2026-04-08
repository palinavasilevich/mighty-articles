import { ARTICLES } from "./articles";
import type { SentenceLength } from "./sentence-length-options";

const LENGTH_INSTRUCTIONS: Record<SentenceLength, string> = {
  short: "The sentence should be short (around 5 words).",
  medium: "The sentence should be medium length (around 10 words).",
  long: "The sentence should be long (around 15 words).",
};

const TOPICS = [
  "food and cooking",
  "travel and transportation",
  "work and office life",
  "shopping and money",
  "hobbies and free time",
  "sports and fitness",
  "school and education",
  "nature and weather",
  "health and medicine",
  "technology and computers",
  "music and concerts",
  "cinema and TV",
  "animals and pets",
  "home and furniture",
  "friends and social life",
  "books and reading",
  "restaurants and cafés",
  "cities and neighborhoods",
  "clothing and fashion",
  "holidays and celebrations",
];

function pickRandomTopic(): string {
  return TOPICS[Math.floor(Math.random() * TOPICS.length)];
}

export function buildPrompt(length: SentenceLength): string {
  const topic = pickRandomTopic();
  return `Generate a natural, everyday German sentence at A1-B2 level. ${LENGTH_INSTRUCTIONS[length]}
The sentence must be about: ${topic}.
The sentence must contain 2 to 3 articles chosen from this list: ${ARTICLES.join(", ")}.
Vary your article choices — frequently use kein/keine/keinen from the list above, not just der/die/das/ein/eine.
Avoid awkward constructions — the sentence must sound like something a native speaker would actually say.
Return ONLY valid JSON with no markdown formatting:
{
  "sentence": "the full German sentence",
  "articles": ["first article in order of appearance (lowercase)", "second article (lowercase)", "third article if present (lowercase)"]
}
Rules:
- The "articles" array must list every article from the sentence in the exact order they appear.
- Only include articles from the allowed list above.
- Do not include the same word twice in the articles array unless it genuinely appears twice.`;
}
