import { useMemo, useState } from "react";
import type { Status, MaskedSentenceData } from "../../store/sentence/types";
import { MaskedSentence } from "../masked-sentence/masked-sentence";
import MagicalButton from "../ui/magical-button";
import { Results } from "../results/results";

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
  const [modalOpen, setModalOpen] = useState(false);

  const allFilled = useMemo(() => {
    return userGuesses.length > 0 && userGuesses.every((g) => g !== "");
  }, [userGuesses]);

  const handleCheck = () => {
    checkAnswers();
    setModalOpen(true);
  };

  const handleReset = () => {
    resetGuesses();
    setModalOpen(false);
  };

  return (
    <div
      className={`
        max-w-2xl w-full m-auto
        flex flex-col gap-4 items-center
        bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50
        border border-amber-200/60
        rounded-2xl p-4 md:p-6 shadow-md
      `}
    >
      <MaskedSentence
        sentenceData={sentenceData}
        status={status}
        userGuesses={userGuesses}
        onGuessChange={setGuess}
        checkAnswers={handleCheck}
      />

      {status === "playing" && (
        <MagicalButton
          variant="success"
          onClick={handleCheck}
          disabled={!allFilled}
          className="transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check answers
        </MagicalButton>
      )}

      <Results
        open={modalOpen}
        score={score ?? 0}
        total={userGuesses.length}
        onClose={() => setModalOpen(false)}
        onReset={handleReset}
      />

      {status === "checked" && (
        <MagicalButton variant="retry" onClick={handleReset}>
          Try again
        </MagicalButton>
      )}
    </div>
  );
}
