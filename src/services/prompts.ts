export const PROMPT = `Generate a German sentence that uses exactly one of these articles: der, die, das, ein, eine, einen, einem, einer, kein, keine, keinen.
The sentence should be simple and educational (A1-B1 level).
Return ONLY valid JSON with no markdown formatting:
{
  "sentence": "the full German sentence",
  "article": "the exact article used (lowercase)",
  "maskedSentence": "same sentence but with the article replaced by the placeholder __ARTICLE__"
}`;
