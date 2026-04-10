function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const DECLENSIONS: Record<string, string[]> = {
  ein: ["einen", "einem", "einer", "eines"],
  kein: ["keinen", "keinem", "keiner", "keines"],
  eine: ["einen", "einem", "einer"],
  keine: ["keinen", "keinem", "keiner"],
};

export function buildMaskedSentence(
  sentence: string,
  articles: string[],
): { maskedSentence: string; sortedArticles: string[] } {
  const variants = [
    ...new Set(articles.flatMap((a) => [a, ...(DECLENSIONS[a] ?? [])])),
  ];

  const pattern = new RegExp(
    `\\b(${variants.map(escapeRegex).join("|")})\\b`,
    "gi",
  );

  const matches = [...sentence.matchAll(pattern)];

  if (matches.length !== articles.length) {
    throw new Error(`Masking error: could not find all articles in sentence.`);
  }

  let masked = "";
  let cursor = 0;

  for (const match of matches) {
    const start = match.index!;
    masked += sentence.slice(cursor, start) + "__ARTICLE__";
    cursor = start + match[0].length;
  }

  return {
    maskedSentence: masked + sentence.slice(cursor),
    sortedArticles: matches.map((m) => m[0].toLowerCase()),
  };
}
