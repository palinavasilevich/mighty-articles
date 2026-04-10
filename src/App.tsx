import { ArticleQuizCard } from "./components/article-quiz-card";
import { Header } from "./components/layout/header";
import { useDarkMode } from "./hooks/use-dark-mode";
import { useSentenceStore } from "./store/sentence";

export function App() {
  const { isDark, toggle } = useDarkMode();
  const mode = useSentenceStore((s) => s.mode);

  return (
    <div
      className={`${isDark ? "dark" : ""} flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900`}
    >
      <Header isDark={isDark} onToggle={toggle} isBookMode={mode === "book"} />
      <main className="w-full max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Learn German articles and become a master of sword, magic, and the
          German language!
        </h1>
        <ArticleQuizCard />
      </main>
    </div>
  );
}
