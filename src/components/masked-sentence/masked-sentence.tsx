import React, { useEffect, useRef, useCallback, useMemo } from "react";

import { ArticleInput } from "./article-input";
import { ArticleResult } from "./article-result";
import type { MaskedSentenceData, Status } from "../../store/sentence/types";

type MaskedSentenceProps = {
  sentenceData: MaskedSentenceData;
  status: Status;
  userGuesses: string[];
  onGuessChange: (index: number, value: string) => void;
  checkAnswers: () => void;
};

export function MaskedSentence({
  sentenceData,
  status,
  userGuesses,
  onGuessChange,
  checkAnswers,
}: MaskedSentenceProps) {
  const { articles, maskedSentence } = sentenceData;
  const parts = maskedSentence.split("__ARTICLE__");

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const allFilled = useMemo(() => {
    return userGuesses.length > 0 && userGuesses.every((g) => g !== "");
  }, [userGuesses]);

  const handleEnter = useCallback(
    (index: number) => {
      if (allFilled) {
        checkAnswers();
        return;
      }
      const nextIndex = index === articles.length - 1 ? 0 : index + 1;
      focusInput(nextIndex);
    },
    [articles.length, focusInput, allFilled, checkAnswers],
  );

  useEffect(() => {
    focusInput(0);
  }, [focusInput]);

  return (
    <p className="text-xl font-bold text-amber-100 leading-relaxed">
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < articles.length && (
            <>
              {status === "playing" && (
                <ArticleInput
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
