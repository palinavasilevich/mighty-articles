import { useGenerateSentence } from "../../hooks/use-generate-sentence";
import {
  LENGTH_OPTIONS,
  type SentenceLength,
} from "../../shared/constants/sentence-length-options";
import { MaskedSentence } from "../masked-sentence";

import { ResultBoard } from "./result-board";
import { GenerateSentenceButton } from "./generate-sentence-button";

export function ArticleQuizCard() {
  const {
    sentenceData,
    status,
    errorMsg,
    sentenceLength,
    setSentenceLength,
    generateSentence,
    userGuesses,
    score,
    setGuess,
    checkAnswers,
    resetGuesses,
  } = useGenerateSentence();

  const allFilled =
    userGuesses.length > 0 && userGuesses.every((g) => g !== "");

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <p className="text-gray-600 dark:text-gray-400">
          Select the sentence length and click the button to generate a German
          sentence.
        </p>

        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="length"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Sentence Length:
          </label>
          <select
            id="length"
            value={sentenceLength}
            onChange={(e) =>
              setSentenceLength(e.target.value as SentenceLength)
            }
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
          >
            {LENGTH_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <GenerateSentenceButton
            status={status}
            onGenerate={generateSentence}
            className="m-auto"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {errorMsg}
          </p>
        )}
      </div>
      {sentenceData && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 space-y-4">
          {sentenceData && (
            <div className="pt-5 dark:border-gray-700 flex flex-col gap-4 items-center">
              <MaskedSentence
                sentenceData={sentenceData}
                status={status}
                userGuesses={userGuesses}
                onGuessChange={setGuess}
              />

              {status === "playing" && (
                <button
                  type="button"
                  onClick={checkAnswers}
                  disabled={!allFilled}
                  className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Check answers
                </button>
              )}

              {status === "checked" && score !== null && (
                <ResultBoard
                  score={score}
                  total={userGuesses.length}
                  onReset={resetGuesses}
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
