import { MODES } from "../constants/sentence-modes";

import { type SentenceMode } from "../store/sentence/types";
import MagicalButton from "./ui/magical-button";

type SentenceModeProps = {
  mode: SentenceMode;
  setMode: (mode: SentenceMode) => void;
};

export function SentenceMode({ mode, setMode }: SentenceModeProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {MODES.map(({ value, label }) => (
        <MagicalButton
          key={value}
          onClick={() => setMode(value)}
          variant={mode === value ? "primary" : "secondary"}
          className="transition-colors"
        >
          {label}
        </MagicalButton>
      ))}
    </div>
  );
}
