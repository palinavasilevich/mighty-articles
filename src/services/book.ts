import rawText from "../data/harry-potter.txt?raw";
import type { SentenceData } from "./groq";

const GERMAN_ARTICLES = [
  "der", "die", "das", "den", "dem", "des",
  "ein", "eine", "einen", "einem", "einer", "eines",
  "kein", "keine", "keinen", "keinem", "keiner", "keines",
];

const ARTICLE_REGEX = new RegExp(
  `\\b(${GERMAN_ARTICLES.join("|")})\\b`,
  "gi",
);

function splitIntoSentences(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/^#[^\n]*\n/gm, "") // strip comment lines
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 20 && /[.!?]$/.test(s));
}

function extractArticles(sentence: string): string[] {
  const articles: string[] = [];
  ARTICLE_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = ARTICLE_REGEX.exec(sentence)) !== null) {
    articles.push(match[1].toLowerCase());
  }
  return articles;
}

type Candidate = { sentence: string; articles: string[] };
let cachedCandidates: Candidate[] | null = null;

function getCandidates(): Candidate[] {
  if (!cachedCandidates) {
    const sentences = splitIntoSentences(rawText);
    cachedCandidates = sentences
      .map((sentence) => ({ sentence, articles: extractArticles(sentence) }))
      .filter(({ articles }) => articles.length >= 1 && articles.length <= 5);
  }
  return cachedCandidates;
}

export function getRandomBookSentence(): SentenceData {
  const list = getCandidates();

  if (list.length === 0) {
    throw new Error(
      "No suitable sentences found. Make sure src/data/harry-potter.txt contains German text.",
    );
  }

  return list[Math.floor(Math.random() * list.length)];
}
