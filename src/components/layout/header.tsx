import SunIcon from "/icons/sun.svg";
import MoonIcon from "/icons/moon.svg";

import SnitchIcon from "/icons/icons8-snitch-50.png";

type HeaderProps = {
  isDark: boolean;
  onToggle: () => void;
};

export function Header({ isDark, onToggle }: HeaderProps) {
  return (
    <header
      className={`
        w-full bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50
        border-b border-amber-200/60 shadow-lg shadow-black/15
        dark:bg-linear-to-r dark:from-indigo-950 dark:via-purple-950  dark:to-indigo-950
      `}
    >
      <div className="max-w-4xl w-full m-auto px-4 py-4 flex items-center justify-between">
        <img src={SnitchIcon} alt="Snitch Icon" className="w-10 h-10" />

        <button
          type="button"
          onClick={onToggle}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          aria-label="Toggle dark mode"
        >
          <img
            src={isDark ? SunIcon : MoonIcon}
            alt={isDark ? "Toggle Light Mode" : "Toggle Dark Mode"}
            className="w-6 h-6"
          />
        </button>
      </div>
    </header>
  );
}
