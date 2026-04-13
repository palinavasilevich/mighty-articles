import { ArticleQuizCard } from "./components/article-quiz-card";
import { MagicalBackground } from "./components/layout/background/magical-background";
import { Header } from "./components/layout/header";

import { useDarkMode } from "./hooks/use-dark-mode";
import { useSentenceStore } from "./store/sentence";

export function App() {
  const { isDark, toggle } = useDarkMode();
  const mode = useSentenceStore((s) => s.mode);

  return (
    <div
      className={`${isDark ? "dark" : ""} flex flex-col items-center min-h-screen`}
    >
      <Header isDark={isDark} onToggle={toggle} isBookMode={mode === "book"} />
      <MagicalBackground>
        <main className="w-full max-w-5xl mx-auto px-4 pt-20">
          <h1 className="mb-8 text-center text-5xl font-bold text-glow-gold-strong font-cinzel text-transparent bg-clip-text bg-linear-to-br from-[#f5d060] via-[#d4a017] to-[#f5d060]">
            Learn German articles and become a master of sword, magic, and the
            German language!
          </h1>

          <ArticleQuizCard />
        </main>
      </MagicalBackground>
    </div>
  );
}
