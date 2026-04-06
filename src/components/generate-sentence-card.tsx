import { useGenerateSentence } from "../hooks/use-generate-sentence";
import {
  LENGTH_OPTIONS,
  type SentenceLength,
} from "../shared/constants/sentence-length-options";
import { MaskedSentence } from "./masked-sentence";

export function GenerateSentenceCard() {
  const { sentenceData, isLoading, length, setLength, generateSentence } =
    useGenerateSentence();

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">
      <div className="space-y-3">
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

        <button
          onClick={generateSentence}
          disabled={isLoading}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer disabled:bg-blue-500"
        >
          {!isLoading ? "Generate sentence" : "Generating sentence..."}
        </button>
      </div>

      {sentenceData && <MaskedSentence sentenceData={sentenceData} />}
    </div>
  );
}
