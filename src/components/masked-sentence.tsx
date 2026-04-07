import React from "react";

import type {
  MaskedSentenceData,
  Status,
} from "../hooks/use-generate-sentence";
import { getArticleHint } from "../utils/getArticleHint";
import { isCorrectArticle } from "../utils/isCorrectArticle";

type MaskedSentenceProps = {
  sentenceData: MaskedSentenceData;
  status: Status;
  userGuesses: string[];
  onGuessChange: (index: number, value: string) => void;
};

export function MaskedSentence({
  sentenceData,
  status,
  userGuesses,
  onGuessChange,
}: MaskedSentenceProps) {
  const { articles, maskedSentence } = sentenceData;
  const parts = maskedSentence.split("__ARTICLE__");

  return (
    <p className="text-lg leading-loose">
      {parts.map((part, i) => (
        <React.Fragment key={`${i}-${articles[i] ?? ""}`}>
          {part}
          {i < articles.length && (
            <>
              {status === "playing" && (
                <input
                  type="text"
                  value={userGuesses[i] ?? ""}
                  onChange={(e) => onGuessChange(i, e.target.value)}
                  placeholder={getArticleHint(articles[i])}
                  className="mb-2 mx-1 w-20 border-b-2 border-blue-500 bg-blue-50 rounded px-1 py-0.5 text-blue-800 font-medium focus:outline-none focus:border-blue-700"
                />
              )}
              {status === "checked" && (
                <span
                  className={`mx-1 px-1.5 py-0.5 rounded font-semibold ${
                    isCorrectArticle(userGuesses[i], articles[i])
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {userGuesses[i] || "—"}
                  {!isCorrectArticle(userGuesses[i], articles[i]) && (
                    <span className="ml-1 text-green-700">({articles[i]})</span>
                  )}
                </span>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </p>
  );
}
