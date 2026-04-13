import type { Status, MaskedSentenceData } from "../../store/sentence/types";
import { MaskedSentence } from "../masked-sentence";
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
  const allFilled =
    userGuesses.length > 0 && userGuesses.every((g) => g !== "");

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
      />

      {status === "playing" && (
        <MagicalButton
          variant="success"
          onClick={checkAnswers}
          disabled={!allFilled}
          className="transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check answers
        </MagicalButton>
      )}

      {status === "checked" && score !== null && (
        <Results
          score={score}
          total={userGuesses.length}
          onReset={resetGuesses}
        />
      )}
    </div>
  );
}
