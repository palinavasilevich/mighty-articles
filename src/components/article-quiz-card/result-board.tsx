type ResultBoardProps = {
  score: number;
  total: number;
  onReset: () => void;
};

export function ResultBoard({ score, total, onReset }: ResultBoardProps) {
  return (
    <div className="space-y-3">
      {score === total ? (
        <p className="text-2xl font-bold text-green-600">
          Super gemacht! {score} / {total}
        </p>
      ) : (
        <>
          <p className="text-lg font-semibold text-gray-700">
            Score:{" "}
            <span className="text-orange-500">
              {score} / {total}
            </span>
          </p>
          <button
            onClick={onReset}
            className="px-5 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors cursor-pointer"
          >
            Try again
          </button>
        </>
      )}
    </div>
  );
}
