import type React from "react";

export const ArticleInput = ({
  value,
  placeholder,
  onChange,
  onEnter,
  inputRef,
}: {
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
        magical-input inline-block mb-2 mx-1 w-20 px-1 py-0.5
        rounded-lg text-amber-900 font-lora font-medium`}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
