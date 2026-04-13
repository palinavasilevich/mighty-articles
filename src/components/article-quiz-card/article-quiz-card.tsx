import {
  LENGTH_OPTIONS,
  type SentenceLength,
} from "../../constants/sentence-length-options";

import { GenerateSentenceButton } from "./generate-sentence-button";

import { useSentenceStore } from "../../store/sentence";

import { SentenceMode } from "../sentence-mode";
import { QuizCard } from "./quiz-card";
import { Select } from "../ui/select";

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
    <div>
      <div className="flex flex-col gap-4 items-center">
        <SentenceMode mode={mode} setMode={setMode} />

        <div
          className={`
          max-w-2xl w-full m-auto
          flex flex-col gap-4 items-center
         bg-white/80 border-amber-200 hover:border-yellow-400 
          rounded-2xl p-4 md:p-6 shadow-md
          `}
        >
          <p className="text-lg text-amber-600 tracking-wide text-center">
            {mode === "ai"
              ? "Select a sentence length and click the button to generate a German sentence or question."
              : "Click the button to get a random sentence from Harry Potter."}
          </p>

          <div className="flex items-center justify-between gap-4">
            {mode === "ai" && (
              <Select
                value={sentenceLength}
                onChange={(e) =>
                  setSentenceLength(e.target.value as SentenceLength)
                }
                options={LENGTH_OPTIONS}
              />
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
      </div>
    </div>
  );
}
