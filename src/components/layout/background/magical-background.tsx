import { useMemo, type ReactNode } from "react";
import { FloatingElement } from "./floating-element";

type MagicalBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

type StarConfig = {
  id: number;
  left: string;
  top: string;
  size: number;
  amplitude: number;
  speed: number;
  opacity: number;
};

export function MagicalBackground({
  children,
  className,
}: MagicalBackgroundProps) {
  const stars: StarConfig[] = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        size: (i % 3) + 1,
        amplitude: (i % 4) + 4,
        speed: (i % 3) + 3,
        opacity: 0.2 + (i % 5) * 0.1,
      })),
    [],
  );

  return (
    <>
      <div
        className={`
          fixed inset-0 -z-10 overflow-hidden pointer-events-none
          bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50
          dark:bg-linear-to-b dark:from-indigo-950 dark:via-purple-950 dark:to-slate-950

          ${className}
        `}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: star.left,
              top: star.top,
              opacity: star.opacity,
            }}
          >
            <FloatingElement amplitude={star.amplitude} speed={star.speed}>
              <svg
                width={star.size * 6}
                height={star.size * 6}
                viewBox="0 0 24 24"
                fill="none"
                className="text-yellow-300"
              >
                <path
                  d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
                  fill="currentColor"
                />
              </svg>
            </FloatingElement>
          </div>
        ))}
      </div>

      {children}
    </>
  );
}
