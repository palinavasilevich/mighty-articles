import type React from "react";

export const ArticleInput = ({
  value,
  placeholder,
  onChange,
  onEnter,
  inputRef,
}: {
  index: number;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  onEnter: () => void;
  inputRef: (el: HTMLInputElement | null) => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onEnter();
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      placeholder={placeholder}
      className={`
      inline-block mb-2 mx-1 w-20 border-b-2 border-blue-500 
      bg-blue-50 dark:bg-blue-900/30 rounded px-1 py-0.5 text-blue-800 
      dark:text-blue-300 font-medium focus:outline-none focus:border-blue-700`}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
