import React, { useEffect, useRef } from "react";

import type {
  MaskedSentenceData,
  Status,
} from "../hooks/use-generate-sentence";
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

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Enter") {
      if (index === articles.length - 1) {
        inputRefs.current[0]?.focus();
      } else {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <p className="text-lg leading-loose dark:text-gray-100">
      {parts.map((part, i) => {
        return (
          <React.Fragment key={`${i}-${articles[i] ?? ""}`}>
            {part}
            {i < articles.length && (
              <>
                {status === "playing" && (
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current[i] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    type="text"
                    value={userGuesses[i] ?? ""}
                    onChange={(e) => onGuessChange(i, e.target.value)}
                    placeholder={articles[i][0]}
                    className="mx-1 w-20 border-b-2 border-blue-500 bg-blue-50 dark:bg-blue-900/30 rounded px-1 py-0.5 text-blue-800 dark:text-blue-300 font-medium focus:outline-none focus:border-blue-700"
                  />
                )}
                {status === "checked" && (
                  <span
                    className={`mx-1 px-1.5 py-0.5 rounded font-semibold ${
                      isCorrectArticle(userGuesses[i], articles[i])
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                    }`}
                  >
                    {userGuesses[i] || "—"}
                    {!isCorrectArticle(userGuesses[i], articles[i]) && (
                      <span className="ml-1 text-green-700 dark:text-green-500">
                        ({articles[i]})
                      </span>
                    )}
                  </span>
                )}
              </>
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
}
