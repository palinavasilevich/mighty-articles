import { useState } from "react";
import { generateSentence, type SentenceData } from "./services/groq";

export function App() {
  const [sentenceData, setSentenceData] = useState<SentenceData | null>(null);

  const handleGenerate = async () => {
    const data = await generateSentence();

    setSentenceData(data);
  };

  return (
    <main className="w-full max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Mighty Articles — Learn German Articles
      </h1>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <p className="text-gray-600">
          Click the button below to generate a German sentence. Figure out the
          missing article!
        </p>
        {sentenceData && <p>{sentenceData.sentence}</p>}
        <button
          onClick={handleGenerate}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
        >
          Generate sentence
        </button>
      </div>
    </main>
  );
}
