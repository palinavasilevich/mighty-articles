import { motion } from "framer-motion";
import SparkleEffect from "./sparkle-effect";
import MagicalButton from "../ui/magical-button";

type ResultsProps = {
  score: number;
  total: number;
  onReset: () => void;
};

export function Results({ score, total, onReset }: ResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden">
        <SparkleEffect trigger={score >= 7} count={15} />

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="mb-4"
          >
            <span className="text-5xl font-extrabold text-amber-800">
              {score}
            </span>
            <span className="text-3xl font-bold text-amber-600">/{total}</span>
          </motion.div>

          {score === total && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg md:text-xl text-amber-800 font-medium leading-relaxed max-w-md"
            >
              🎉 Gut gemacht!
            </motion.p>
          )}

          <MagicalButton variant="outline" onClick={onReset}>
            Try again
          </MagicalButton>
        </div>
      </div>
    </motion.div>
  );
}
