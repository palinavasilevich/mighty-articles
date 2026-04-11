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
    // <div className="flex flex-col items-center gap-3">
    //   {score === total ? (
    //     <div className="text-2xl font-bold flex flex-col items-center gap-1">
    //       <span className="text-green-600">🎉 Gut gemacht!</span>
    //       <span className="text-green-600">
    //         {score} / {total}
    //       </span>
    //     </div>
    //   ) : (
    //     <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
    //       Score:{" "}
    //       <span className="text-orange-500">
    //         {score} / {total}
    //       </span>
    //     </p>
    //   )}
    //   <button
    //     type="button"
    //     onClick={onReset}
    //     className="px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 transition-colors cursor-pointer"
    //   >
    //     Try again
    //   </button>
    // </div>

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

          <MagicalButton type="button" variant="danger" onClick={onReset}>
            Try again
          </MagicalButton>
        </div>
      </div>
    </motion.div>
  );
}
