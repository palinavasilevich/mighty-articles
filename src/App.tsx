import { ArticleQuizCard } from "./components/article-quiz-card";
import { Header } from "./components/header";

export function App() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <main className="w-full max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Learn German articles and become a master of sword, magic, and the
          German language!
        </h1>
        <ArticleQuizCard />
      </main>
    </div>
  );
}
