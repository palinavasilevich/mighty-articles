import SunIcon from "/icons/sun.svg";
import MoonIcon from "/icons/moon.svg";
import { LogoIcon } from "../ui/icons";

type HeaderProps = {
  isDark: boolean;
  onToggle: () => void;
  isBookMode: boolean;
};

export function Header({ isDark, onToggle, isBookMode }: HeaderProps) {
  return (
    <header className="w-full h-18 shadow-sm flex items-center bg-white dark:bg-gray-800">
      <div className="max-w-4xl w-full m-auto flex items-center justify-between px-4">
        {isBookMode ? (
          <LogoIcon width={50} height={50} className="dark:fill-gray-100" />
        ) : (
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            <span className="text-blue-500">Mighty</span> Articles
          </span>
        )}

        <button
          type="button"
          onClick={onToggle}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          aria-label="Toggle dark mode"
        >
          <img
            src={isDark ? SunIcon : MoonIcon}
            alt={isDark ? "Toggle Light Mode" : "Toggle Dark Mode"}
            className="w-5 h-5"
          />
        </button>
      </div>
    </header>
  );
}
