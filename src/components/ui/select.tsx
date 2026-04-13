interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

export function Select({ options, className, ...props }: SelectProps) {
  return (
    <select
      className={`
        py-3 px-6 border border-amber-700 rounded-xl
        font-cinzel 
        focus:ring-2 focus:ring-amber-500 focus:outline-none
        cursor-pointer
        ${className ?? ""}
        `}
      {...props}
    >
      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className="text-amber-950 bg-slate-200 "
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}
