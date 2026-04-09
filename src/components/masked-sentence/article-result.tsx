import { isCorrectArticle } from "../../utils/isCorrectArticle";

export const ArticleResult = ({
  value,
  correctValue,
}: {
  value: string;
  correctValue: string;
}) => {
  const correct = isCorrectArticle(value, correctValue);
  return (
    <span
      className={`mx-1 px-1.5 py-0.5 rounded font-semibold ${
        correct
          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
          : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
      }`}
    >
      {value || "—"}
      {!correct && (
        <span className="ml-1 text-green-700 dark:text-green-500">
          ({correctValue})
        </span>
      )}
    </span>
  );
};
