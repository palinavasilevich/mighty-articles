import { ArticleQuiz } from "./components/article-quiz/article-quiz";
import { MagicalBackground } from "./components/layout/background/magical-background";
import { Header } from "./components/layout/header";

import { useDarkMode } from "./hooks/use-dark-mode";

export function App() {
  const { isDark, toggle } = useDarkMode();

  return (
    <div
      className={`${isDark ? "dark" : ""} flex flex-col items-center min-h-screen`}
    >
      <Header isDark={isDark} onToggle={toggle} />
      <MagicalBackground>
        <main className="w-full max-w-4xl mx-auto px-4 pt-20">
          <h1 className="mb-4 text-center text-2xl sm:text-4xl font-semibold font-cinzel text-transparent bg-clip-text bg-linear-to-br from-[#f5d060] via-[#d4a017] to-[#f5d060]">
            Learn German articles and become a master of sword, magic, and the
            German language!
          </h1>

          <ArticleQuiz />
        </main>
      </MagicalBackground>
    </div>
  );
}
