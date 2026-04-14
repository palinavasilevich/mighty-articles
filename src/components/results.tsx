import { motion } from "framer-motion";
import MagicalButton from "./ui/magical-button";

type ResultsProps = {
  score: number;
  total: number;
  onReset: () => void;
};

type Level = {
  label: string;
  message: string;
  color: string;
};

function getLevel(score: number, total: number): Level {
  const pct = score / total;

  if (pct === 1)
    return {
      label: "Perfect!",
      message: "Outstanding! You have mastered the articles.",
      color: "text-yellow-300",
    };

  if (pct >= 0.7)
    return {
      label: "Well done!",
      message: "Great work. Keep practicing to reach perfection.",
      color: "text-emerald-300",
    };

  if (pct >= 0.4)
    return {
      label: "Not bad!",
      message: "Decent effort. A bit more practice will help.",
      color: "text-sky-300",
    };

  return {
    label: "Keep trying!",
    message: "Don't give up. Every mistake is a lesson.",
    color: "text-rose-400",
  };
}

export function Results({ score, total, onReset }: ResultsProps) {
  const level = getLevel(score, total);

  return (
    <motion.div className="mt-2 flex flex-col items-center gap-4">
      <motion.div className="flex flex-col items-center gap-1">
        <span
          className={`text-xl sm:text-2xl font-bold tracking-wide ${level.color}`}
        >
          {level.label}
        </span>
        <span className="text-sm text-amber-800 dark:text-white/50 text-center max-w-xs leading-relaxed">
          {level.message}
        </span>
      </motion.div>

      <motion.div>
        <MagicalButton onClick={onReset}>Try again</MagicalButton>
      </motion.div>
    </motion.div>
  );
}
