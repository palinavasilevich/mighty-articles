type ResultBoardProps = {
  score: number;
  total: number;
  onReset: () => void;
};

export function ResultBoard({ score, total, onReset }: ResultBoardProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {score === total ? (
        <div className="flex flex-col items-center gap-3">
          <div className="text-2xl font-bold flex flex-col items-center gap-1">
            <span>🎉 Gut gemacht!</span>
            <span className="text-green-600">
              {score} / {total}
            </span>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 transition-colors cursor-pointer"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
            Score:{" "}
            <span className="text-orange-500">
              {score} / {total}
            </span>
          </p>
          <button
            type="button"
            onClick={onReset}
            className="px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 transition-colors cursor-pointer"
          >
            Try again
          </button>
        </>
      )}
    </div>
  );
}
