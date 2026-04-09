import { Moon, Sun } from "lucide-react";

type HeaderProps = {
  isDark: boolean;
  onToggle: () => void;
};

export function Header({ isDark, onToggle }: HeaderProps) {
  return (
    <header className="w-full py-3 shadow-sm bg-white dark:bg-gray-800">
      <div className="max-w-4xl w-full m-auto flex items-center justify-between">
        <p className="text-lg font-semibold dark:text-white">
          <span className="text-blue-600">Mighty</span> Articles
        </p>
        <button
          type="button"
          onClick={onToggle}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Sun size={20} color="yellow" />
          ) : (
            <Moon size={20} color="blue" />
          )}
        </button>
      </div>
    </header>
  );
}
