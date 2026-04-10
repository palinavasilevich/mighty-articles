import React, { useEffect, useRef, useCallback } from "react";

import { ArticleInput } from "./article-input";
import { ArticleResult } from "./article-result";
import type { MaskedSentenceData, Status } from "../../store/sentence/types";

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

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  useEffect(() => {
    focusInput(0);
  }, [focusInput]);

  const handleEnter = useCallback(
    (index: number) => {
      const nextIndex = index === articles.length - 1 ? 0 : index + 1;
      focusInput(nextIndex);
    },
    [articles.length, focusInput],
  );

  return (
    <p className="text-lg leading-loose dark:text-gray-100">
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < articles.length && (
            <>
              {status === "playing" && (
                <ArticleInput
                  index={i}
                  value={userGuesses[i] ?? ""}
                  placeholder={articles[i][0]}
                  onChange={(val) => onGuessChange(i, val)}
                  onEnter={() => handleEnter(i)}
                  inputRef={(el) => {
                    if (el) inputRefs.current[i] = el;
                  }}
                />
              )}
              {status === "checked" && (
                <ArticleResult
                  value={userGuesses[i]}
                  correctValue={articles[i]}
                />
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </p>
  );
}
