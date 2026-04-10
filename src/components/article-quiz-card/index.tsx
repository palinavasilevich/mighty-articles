type ArticleQuizCardProps = {
  mode: SentenceMode;
  setMode: (mode: SentenceMode) => void;
};
import {
  LENGTH_OPTIONS,
  type SentenceLength,
} from "../../constants/sentence-length-options";

import { ResultBoard } from "./result-board";
import { GenerateSentenceButton } from "./generate-sentence-button";
import { MaskedSentence } from "../masked-sentence";
import {
  useGenerateSentence,
  type SentenceMode,
} from "../../hooks/use-generate-sentence";

const MODES: { value: SentenceMode; label: string }[] = [
  { value: "ai", label: "AI Generated" },
  { value: "book", label: "Harry Potter" },
];

export function ArticleQuizCard({ mode, setMode }: ArticleQuizCardProps) {
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
  } = useGenerateSentence(mode);

  const allFilled =
    userGuesses.length > 0 && userGuesses.every((g) => g !== "");

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
          {MODES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                mode === value
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="text-gray-600 dark:text-gray-400">
          {mode === "ai"
            ? "Select the length and click the button to generate a German sentence or question."
            : "Click the button to get a random sentence from Harry Potter."}
        </p>

        <div className="flex items-center justify-between gap-3">
          {mode === "ai" && (
            <>
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
            </>
          )}

          <GenerateSentenceButton
            status={status}
            onGenerate={generateSentence}
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
          <div className="flex flex-col gap-4 items-center">
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
        </div>
      )}
    </>
  );
}
