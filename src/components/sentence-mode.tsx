import { MODES } from "../constants/sentence-modes";

import { type SentenceMode } from "../store/sentence/types";
import MagicalButton from "./ui/magical-button";

type SentenceModeProps = {
  mode: SentenceMode;
  setMode: (mode: SentenceMode) => void;
};

export function SentenceMode({ mode, setMode }: SentenceModeProps) {
  return (
    <div>
      {MODES.map(({ value, label }) => (
        <MagicalButton
          key={value}
          onClick={() => setMode(value)}
          variant={mode === value ? "primary" : "secondary"}
          className="mr-3 font-cinzel transition-colors"
        >
          {label}
        </MagicalButton>
      ))}
    </div>
  );
}
