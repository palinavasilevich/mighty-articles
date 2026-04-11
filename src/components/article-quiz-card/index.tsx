import {
  LENGTH_OPTIONS,
  type SentenceLength,
} from "../../constants/sentence-length-options";

import { GenerateSentenceButton } from "./generate-sentence-button";

import { useSentenceStore } from "../../store/sentence";

import { SentenceMode } from "../sentence-mode";
import { QuizCard } from "./quiz-card";

export function ArticleQuizCard() {
  const {
    status,
    score,
    errorMsg,
    sentenceData,
    userGuesses,
    sentenceLength,
    mode,
    generateSentence,
    setSentenceLength,
    setGuess,
    checkAnswers,
    resetGuesses,
    setMode,
  } = useSentenceStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 items-center">
        <SentenceMode mode={mode} setMode={setMode} />

        <p className="text-lg text-amber-200/80 tracking-wide">
          {mode === "ai"
            ? "Select a sentence length and click the button to generate a German sentence or question."
            : "Click the button to get a random sentence from Harry Potter."}
        </p>

        <div className="flex items-center justify-between gap-4">
          {mode === "ai" && (
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
        <QuizCard
          sentenceData={sentenceData}
          status={status}
          score={score}
          userGuesses={userGuesses}
          setGuess={setGuess}
          checkAnswers={checkAnswers}
          resetGuesses={resetGuesses}
        />
      )}
    </div>
  );
}
