import { type ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "danger"
  | "success"
  | "outline";
type ButtonSize = "sm" | "md" | "lg";

type MagicalButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 text-amber-950 shadow-lg shadow-yellow-500/25 hover:shadow-yellow-400/40",
  secondary:
    "bg-gradient-to-r from-slate-400 via-slate-300 to-gray-400 text-slate-900 shadow-lg shadow-slate-400/25 hover:shadow-slate-400/40",
  accent:
    "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-amber-950 shadow-lg shadow-purple-400/25 hover:shadow-purple-400/40",
  danger:
    "bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40",
  success:
    "bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40",
  outline:
    "border border-amber-700 text-amber-950 hover:bg-amber-700 hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm min-h-[40px] rounded-lg",
  md: "px-6 py-3 text-base min-h-[48px] rounded-xl",
  lg: "px-8 py-4 text-lg min-h-[56px] rounded-xl",
};

export default function MagicalButton({
  variant = "primary",
  size = "md",
  children,
  disabled,
  className = "",
  type = "button",
  onClick,
}: MagicalButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-bold tracking-wide
        transition-all duration-200 cursor-pointer select-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? "opacity-50 cursor-not-allowed saturate-50" : ""}
        ${className}
     `}
    >
      {children}
    </button>
  );
}
