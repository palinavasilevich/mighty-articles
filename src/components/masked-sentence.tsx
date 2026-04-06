import type { SentenceData } from "../services/groq";
import { getArticleHint } from "../utils/getArticleHint";

type MaskedSentenceProps = {
  sentenceData: SentenceData;
};
export function MaskedSentence({ sentenceData }: MaskedSentenceProps) {
  const { articles, maskedSentence } = sentenceData;

  const parts = maskedSentence.split("__ARTICLE__");

  return (
    <p>
      {parts.map((part, i) => (
        <span key={`${i}-${articles[i] ?? ""}`}>
          {part}
          {i < articles.length && (
            <span>{getArticleHint({ article: articles[i], position: i })}</span>
          )}
        </span>
      ))}
    </p>
  );
}
