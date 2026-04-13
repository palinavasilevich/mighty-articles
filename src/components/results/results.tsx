import { motion, AnimatePresence, type Variants } from "framer-motion";
import SparkleEffect from "./sparkle-effect";
import MagicalButton from "../ui/magical-button";

type ResultsProps = {
  open: boolean;
  score: number;
  total: number;
  onReset: () => void;
};

type Level = {
  label: string;
  message: string;
  color: string;
  ringColor: string;
  glowColor: string;
};

function getLevel(score: number, total: number): Level {
  const pct = score / total;
  if (pct === 1)
    return {
      label: "Perfect!",
      message: "Outstanding! You have mastered the articles.",
      color: "text-yellow-300",
      ringColor: "#fde047",
      glowColor: "rgba(253,224,71,0.5)",
    };
  if (pct >= 0.7)
    return {
      label: "Well done!",
      message: "Great work. Keep practicing to reach perfection.",
      color: "text-emerald-300",
      ringColor: "#6ee7b7",
      glowColor: "rgba(110,231,183,0.4)",
    };
  if (pct >= 0.4)
    return {
      label: "Not bad!",
      message: "Decent effort. A bit more practice will help.",
      color: "text-sky-300",
      ringColor: "#7dd3fc",
      glowColor: "rgba(125,211,252,0.4)",
    };
  return {
    label: "Keep trying!",
    message: "Don't give up. Every mistake is a lesson.",
    color: "text-rose-400",
    ringColor: "#fb7185",
    glowColor: "rgba(251,113,133,0.4)",
  };
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 32 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
      staggerChildren: 0.12,
    },
  },
  exit: { opacity: 0, scale: 0.9, y: 16, transition: { duration: 0.25 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export function Results({ open, score, total, onReset }: ResultsProps) {
  const level = getLevel(score, total);
  const pct = score / total;
  const dashOffset = CIRCUMFERENCE * (1 - pct);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
          onClick={onReset}
          style={{
            background: "rgba(5,4,20,0.75)",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Card — stop propagation so clicking inside doesn't close */}
          <motion.div
            key="card"
            onClick={(e) => e.stopPropagation()}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex flex-col items-center gap-6 px-8 py-10 rounded-2xl overflow-hidden w-full max-w-sm
              bg-linear-to-b from-indigo-950 via-purple-950 to-indigo-950
              border border-yellow-600/30 shadow-2xl shadow-black/60"
          >
            {/* ambient glow */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
              style={{
                background: `radial-gradient(ellipse at 50% 30%, ${level.glowColor} 0%, transparent 70%)`,
              }}
            />

            <SparkleEffect trigger={pct >= 0.7} count={18} />

            {/* Score ring */}
            <motion.div variants={childVariants} className="relative w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  fill="none"
                  stroke={level.ringColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3,
                    ease: "easeOut" as const,
                  }}
                  style={{ filter: `drop-shadow(0 0 8px ${level.ringColor})` }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className={`text-4xl font-extrabold leading-none ${level.color}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 220 }}
                >
                  {score}
                </motion.span>
                <span className="text-sm text-white/40 font-medium">
                  / {total}
                </span>
              </div>
            </motion.div>

            {/* Level label + message */}
            <motion.div
              variants={childVariants}
              className="flex flex-col items-center gap-1"
            >
              <span
                className={`text-2xl font-bold tracking-wide ${level.color}`}
              >
                {level.label}
              </span>
              <span className="text-sm text-white/50 text-center max-w-xs leading-relaxed">
                {level.message}
              </span>
            </motion.div>

            {/* Stars */}
            <motion.div
              variants={childVariants}
              className="flex gap-2 flex-wrap justify-center"
            >
              {Array.from({ length: total }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.8 + i * 0.07,
                    type: "spring",
                    stiffness: 260,
                  }}
                  className={`text-xl ${
                    i < score
                      ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]"
                      : "text-white/15"
                  }`}
                >
                  ★
                </motion.span>
              ))}
            </motion.div>

            {/* Button */}
            <motion.div variants={childVariants}>
              <MagicalButton variant="primary" size="lg" onClick={onReset}>
                Try again
              </MagicalButton>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
