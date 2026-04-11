import SunIcon from "/icons/sun.svg";
import MoonIcon from "/icons/moon.svg";

import HarryPotterIcon from "/icons/harry-potter.svg";
import SnitchIcon from "/icons/icons8-snitch-50.png";

type HeaderProps = {
  isDark: boolean;
  onToggle: () => void;
  isBookMode: boolean;
};

export function Header({ isDark, onToggle, isBookMode }: HeaderProps) {
  return (
    <header
      className={`
        w-full 
        bg-linear-to-r from-indigo-950 via-purple-950 to-indigo-950
        border-b border-yellow-600/30
        shadow-lg shadow-black/20
      `}
    >
      <div className="max-w-4xl w-full m-auto px-4 py-4 flex items-center justify-between">
        <img
          src={isBookMode ? HarryPotterIcon : SnitchIcon}
          alt={isBookMode ? "Toggle Book Mode" : "Toggle AI Mode"}
          className="w-10 h-10"
        />

        {/* <button
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
        </button> */}
      </div>
    </header>
  );
}
