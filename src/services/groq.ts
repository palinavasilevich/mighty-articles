import { API_KEY, GROQ_API_URL, GROQ_MODEL } from "../shared/constants/config";
import { buildPrompt } from "../shared/constants/prompts";
import type { SentenceLength } from "../shared/constants/sentence-length-options";

export interface SentenceData {
  sentence: string;
  articles: string[];
}

export async function fetchSentence(
  length: SentenceLength,
): Promise<SentenceData> {
  if (!API_KEY) {
    throw new Error(
      "Missing VITE_GROQ_API_KEY. Please add it to your .env file.",
    );
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: buildPrompt(length) }],
      temperature: 0.9,
      max_tokens: 256,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();

  const rawText = data?.choices?.[0]?.message?.content;

  if (!rawText) {
    throw new Error(
      "Unexpected API response structure — no text content found.",
    );
  }

  const cleaned = rawText
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  let parsed;

  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(
      `Could not parse API response as JSON. Raw response: ${rawText}`,
    );
  }

  const { sentence, articles } = parsed;

  if (!sentence || !Array.isArray(articles) || articles.length === 0) {
    throw new Error(
      "API response is missing required fields (sentence, articles).",
    );
  }

  const normalizedArticles: string[] = articles.map((a: string) =>
    a.toLowerCase().trim(),
  );

  return { sentence, articles: normalizedArticles };
}
