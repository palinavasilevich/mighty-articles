import { useMemo } from "react";
import { useGenerateSentence } from "../hooks/use-generate-sentence";
import {
  LENGTH_OPTIONS,
  type SentenceLength,
} from "../shared/constants/sentence-length-options";
import { isCorrectArticle } from "../utils/isCorrectArticle";
import { MaskedSentence } from "./masked-sentence";

export function ArticleQuizCard() {
  const {
    sentenceData,
    status,
    errorMsg,
    length,
    setLength,
    generateSentence,
    userGuesses,
    setGuess,
    checkAnswers,
    resetGuesses,
  } = useGenerateSentence();

  const allFilled =
    userGuesses.length > 0 && userGuesses.every((g) => g !== "");
  const score = useMemo(
    () =>
      status === "checked" && sentenceData
        ? userGuesses.filter((g, i) =>
            isCorrectArticle(g, sentenceData.articles[i]),
          ).length
        : null,
    [status, userGuesses, sentenceData],
  );

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">
      <div className="flex flex-col gap-4 items-center">
        <p className="text-center text-gray-600">
          Click the button below to generate a German sentence. <br /> Figure
          out the missing article!
        </p>

        <div className="flex items-center gap-3">
          <label htmlFor="length" className="text-sm font-medium text-gray-700">
            Length:
          </label>
          <select
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value as SentenceLength)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LENGTH_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button
            onClick={generateSentence}
            disabled={status === "loading"}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer disabled:bg-blue-500"
          >
            {status === "loading" && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {status === "idle" && "Generate sentence"}
            {status === "loading" && "Generating…"}
            {(status === "playing" || status === "checked") &&
              "Generate new sentence"}
          </button>
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {errorMsg}
          </p>
        )}
      </div>

      {sentenceData && (
        <div className="pt-5 border-t flex flex-col gap-4 items-center">
          <MaskedSentence
            sentenceData={sentenceData}
            status={status}
            userGuesses={userGuesses}
            onGuessChange={setGuess}
          />

          {status === "playing" && (
            <button
              onClick={checkAnswers}
              disabled={!allFilled}
              className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check answers
            </button>
          )}

          {status === "checked" && score !== null && (
            <div className="space-y-3">
              {score === userGuesses.length ? (
                <p className="text-2xl font-bold text-green-600">
                  Perfect! {score} / {userGuesses.length}
                </p>
              ) : (
                <>
                  <p className="text-lg font-semibold text-gray-700">
                    Score:{" "}
                    <span className="text-orange-500">
                      {score} / {userGuesses.length}
                    </span>
                  </p>
                  <button
                    onClick={resetGuesses}
                    className="px-5 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors cursor-pointer"
                  >
                    Try again
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
