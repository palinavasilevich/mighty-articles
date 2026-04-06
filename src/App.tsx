import { GenerateSentenceCard } from "./components/generate-sentence-card";
import { Header } from "./components/header";

export function App() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <main className="w-full max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Mighty Articles — Learn German Articles
        </h1>
        <GenerateSentenceCard />
      </main>
    </div>
  );
}
