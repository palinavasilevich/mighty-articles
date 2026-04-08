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

const CONTENT_TYPES = ["sentence", "question"] as const;
type ContentType = (typeof CONTENT_TYPES)[number];

function pickRandomTopic(): string {
  return TOPICS[Math.floor(Math.random() * TOPICS.length)];
}

function pickRandomContentType(): ContentType {
  return CONTENT_TYPES[Math.floor(Math.random() * CONTENT_TYPES.length)];
}

export function buildPrompt(length: SentenceLength): string {
  const topic = pickRandomTopic();
  const type = pickRandomContentType();
  const typeInstruction =
    type === "question"
      ? "Generate a natural, everyday German question at B1 level. The question must end with a question mark (?)."
      : "Generate a natural, everyday German sentence at B1 level. The sentence must end with a period (.).";
  const subject = type === "question" ? "question" : "sentence";
  return `${typeInstruction} ${LENGTH_INSTRUCTIONS[length]}
The ${subject} must be about: ${topic}.
The ${subject} must contain 2 to 3 articles chosen from this list: ${ARTICLES.join(", ")}.
Change your choice of articles often—don't limit yourself to just der/die/das/ein/eine.
Avoid awkward constructions — the ${subject} must sound like something a native speaker would actually say.
Return ONLY valid JSON with no markdown formatting:
{
  "sentence": "the full German ${subject}",
  "articles": ["first article in order of appearance (lowercase)", "second article (lowercase)", "third article if present (lowercase)"]
}
Rules:
- The "articles" array must list every article from the ${subject} in the exact order they appear.
- Only include articles from the allowed list above.
- Do not include the same word twice in the articles array unless it genuinely appears twice.
- Write the EXACT form that appears in the ${subject} (e.g., "einen" not "ein" if the ${subject} uses "einen").`;
}
