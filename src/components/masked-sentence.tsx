import type { EnrichedSentenceData } from "../hooks/use-generate-sentence";
import { getArticleHint } from "../utils/getArticleHint";

type MaskedSentenceProps = {
  sentenceData: EnrichedSentenceData;
};
export function MaskedSentence({ sentenceData }: MaskedSentenceProps) {
  const { articles, maskedSentence } = sentenceData;

  const parts = maskedSentence.split("__ARTICLE__");

  return (
    <p>
      {parts.map((part, i) => (
        <span key={`${i}-${articles[i] ?? ""}`}>
          {part}
          {i < articles.length && <span>{getArticleHint(articles[i])}</span>}
        </span>
      ))}
    </p>
  );
}
