import type { Status } from "../../store/sentence/types";
import MagicalButton from "../ui/magical-button";

type GenerateSentenceButtonProps = {
  status: Status;
  onGenerate: () => void;
};

export function GenerateSentenceButton({
  status,
  onGenerate,
}: GenerateSentenceButtonProps) {
  const buttonContent =
    status === "loading" ? (
      <>
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
        Generating...
      </>
    ) : status === "playing" || status === "checked" ? (
      "Generate new sentence"
    ) : (
      "Generate sentence"
    );

  return (
    <MagicalButton
      variant="accent"
      onClick={onGenerate}
      disabled={status === "loading"}
      className="flex items-center gap-2"
    >
      {buttonContent}
    </MagicalButton>
  );
}
