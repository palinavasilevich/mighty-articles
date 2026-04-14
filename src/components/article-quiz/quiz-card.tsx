import { useMemo } from "react";
import type { Status, MaskedSentenceData } from "../../store/sentence/types";
import { MaskedSentence } from "../masked-sentence/masked-sentence";
import MagicalButton from "../ui/magical-button";
import { Results } from "../results";

type QuizCardProps = {
  status: Status;
  sentenceData: MaskedSentenceData;
  userGuesses: string[];
  score: number | null;
  setGuess: (index: number, value: string) => void;
  checkAnswers: () => void;
  resetGuesses: () => void;
};

export function QuizCard({
  sentenceData,
  status,
  score,
  userGuesses,
  setGuess,
  checkAnswers,
  resetGuesses,
}: QuizCardProps) {
  const allFilled = useMemo(() => {
    return userGuesses.length > 0 && userGuesses.every((g) => g !== "");
  }, [userGuesses]);

  return (
    <div className={`mt-5 flex flex-col gap-4 items-center`}>
      <MaskedSentence
        sentenceData={sentenceData}
        status={status}
        userGuesses={userGuesses}
        onGuessChange={setGuess}
        checkAnswers={checkAnswers}
      />

      {status === "playing" && (
        <MagicalButton
          variant="secondary"
          onClick={checkAnswers}
          disabled={!allFilled}
          className="transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check answers
        </MagicalButton>
      )}

      {status === "checked" && (
        <Results
          score={score ?? 0}
          total={userGuesses.length}
          onReset={resetGuesses}
        />
      )}
    </div>
  );
}
