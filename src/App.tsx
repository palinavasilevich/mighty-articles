import { useGenerateSentence } from "./hooks/use-generate-sentence";
import { type SentenceLength } from "./shared/constants/prompts";
import { MaskedSentence } from "./components/masked-sentence";

const LENGTH_OPTIONS: { value: SentenceLength; label: string }[] = [
  { value: "short", label: "Short (~5 words)" },
  { value: "medium", label: "Medium (~10 words)" },
  { value: "long", label: "Long (~15 words)" },
];

export function App() {
  const { sentenceData, length, setLength, generateSentence } =
    useGenerateSentence();

  return (
    <main className="w-full max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Mighty Articles — Learn German Articles
      </h1>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <p className="text-gray-600">
          Click the button below to generate a German sentence. Figure out the
          missing article!
        </p>

        <div className="flex items-center gap-3">
          <label htmlFor="length" className="text-sm font-medium text-gray-700">
            Sentence length
          </label>
          <select
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value as SentenceLength)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LENGTH_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {sentenceData && <MaskedSentence sentenceData={sentenceData} />}

        <button
          onClick={generateSentence}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
        >
          Generate sentence
        </button>
      </div>
    </main>
  );
}
