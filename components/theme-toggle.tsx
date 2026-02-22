"use client";

import { useTheme } from "@/context/theme-provider";

const Sun = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="5" fill="#FCD34D" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1="10"
        y1="10"
        x2={10 + 8.5 * Math.cos((angle * Math.PI) / 180)}
        y2={10 + 8.5 * Math.sin((angle * Math.PI) / 180)}
        stroke="#FCD34D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

const Cloud = ({ style }: { style?: React.CSSProperties }) => (
  <svg width="36" height="22" viewBox="0 0 36 22" fill="none" style={style}>
    <ellipse cx="18" cy="15" rx="15" ry="7" fill="white" fillOpacity="0.9" />
    <ellipse cx="12" cy="13" rx="9" ry="7" fill="white" fillOpacity="0.9" />
    <ellipse cx="24" cy="14" rx="8" ry="6" fill="white" fillOpacity="0.85" />
    <ellipse cx="18" cy="11" rx="10" ry="7" fill="white" />
  </svg>
);

const Moon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M15.5 10.5A7 7 0 1 1 7.5 2.5a5.5 5.5 0 0 0 8 8z"
      fill="#FDE68A"
      stroke="#FCD34D"
      strokeWidth="0.5"
    />
  </svg>
);

const stars = [
  { cx: 14, cy: 8, r: 1.2, opacity: 0.9, delay: 0 },
  { cx: 28, cy: 14, r: 0.8, opacity: 0.7, delay: 0.3 },
  { cx: 22, cy: 6, r: 1, opacity: 0.85, delay: 0.6 },
  { cx: 8, cy: 16, r: 0.7, opacity: 0.6, delay: 0.9 },
  { cx: 18, cy: 18, r: 0.9, opacity: 0.75, delay: 0.2 },
  { cx: 34, cy: 9, r: 0.6, opacity: 0.65, delay: 0.5 },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    document.startViewTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });

    // Set the click origin as a CSS custom property
    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }

        /* The incoming theme expands as a circle from the click point */
        ::view-transition-new(root) {
          clip-path: circle(0% at var(--x, 50%) var(--y, 50%));
          animation: theme-transition 700ms ease-in forwards;
        }

        /* Ensure the old theme sits underneath */
        ::view-transition-old(root) {
          z-index: 1;
        }

        ::view-transition-new(root) {
          z-index: 2;
        }

        @keyframes theme-transition {
          to {
            /* 150vmax guarantees the circle covers the whole screen regardless of where it starts */
            clip-path: circle(150vmax at var(--x, 50%) var(--y, 50%));
          }
        }


        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes float-cloud {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(3px) translateY(-2px); }
        }
        @keyframes sun-pulse {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(252, 211, 77, 0.8)); }
          50% { filter: drop-shadow(0 0 8px rgba(252, 211, 77, 1)); }
        }
        @keyframes moon-glow {
          0%, 100% { filter: drop-shadow(0 0 3px rgba(253, 230, 138, 0.6)); }
          50% { filter: drop-shadow(0 0 7px rgba(253, 230, 138, 1)); }
        }

        .toggle-track {
          position: relative;
          width: 60px;
          height: 30px;
          border-radius: 20px;
          cursor: pointer;
          border: none;
          padding: 0;
          outline: none;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
          box-shadow: ${
            isDark
              ? "0 0 0 2px rgba(99, 102, 241, 0.5), inset 0 2px 4px rgba(0,0,0,0.4), 0 4px 20px rgba(99, 102, 241, 0.3)"
              : "0 0 0 2px rgba(14, 165, 233, 0.5), inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 20px rgba(14, 165, 233, 0.35)"
          };
        }

        .toggle-track:focus-visible {
          outline: 3px solid rgba(99, 102, 241, 0.7);
          outline-offset: 3px;
        }

        .toggle-track:hover {
          box-shadow: ${
            isDark
              ? "0 0 0 2px rgba(99, 102, 241, 0.7), inset 0 2px 4px rgba(0,0,0,0.4), 0 6px 24px rgba(99, 102, 241, 0.5)"
              : "0 0 0 2px rgba(14, 165, 233, 0.7), inset 0 2px 4px rgba(0,0,0,0.1), 0 6px 24px rgba(14, 165, 233, 0.5)"
          };
        }

        .bg-layer {
          position: absolute;
          inset: 0;
          transition: opacity 0.6s ease;
        }

        .light-bg {
          background: linear-gradient(135deg, #74b9ff, #0984e3);
          opacity: ${isDark ? 0 : 1};
        }

        .dark-bg {
          background: linear-gradient(135deg, #0f0c29, #1a1a4e, #0f2027);
          opacity: ${isDark ? 1 : 0};
        }

        .ground-strip {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 10px;
          background: linear-gradient(to top, rgba(167, 234, 131, 0.7), transparent);
          border-radius: 0 0 20px 20px;
          transition: opacity 0.4s ease;
          opacity: ${isDark ? 0 : 1};
          pointer-events: none;
        }

        .stars-layer {
          position: absolute;
          inset: 0;
          opacity: ${isDark ? 1 : 0};
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .cloud-1 {
          position: absolute;
          top: 2px;
          left: 24px;
          opacity: ${isDark ? 0 : 1};
          transition: opacity 0.4s ease;
          pointer-events: none;
          animation: float-cloud 5s ease-in-out infinite;
          transform-origin: center;
        }

        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: ${isDark ? "32px" : "2px"};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: left 0.4s cubic-bezier(0.4, 0.0, 0.2, 1), 
                      background 0.4s ease, 
                      box-shadow 0.4s ease;
          background: ${
            isDark
              ? "radial-gradient(circle at 40% 35%, #2d1b69, #1e0a3c)"
              : "radial-gradient(circle at 40% 35%, #fff9e6, #fff3c4)"
          };
          box-shadow: ${
            isDark
              ? "0 2px 12px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1)"
              : "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.9)"
          };
          z-index: 10;
          will-change: left;
        }

        .sun-icon {
          animation: sun-pulse 2.5s ease-in-out infinite;
          transition: opacity 0.3s ease, transform 0.4s ease;
          opacity: ${isDark ? 0 : 1};
          transform: ${isDark ? "scale(0.5) rotate(90deg)" : "scale(1) rotate(0deg)"};
          position: absolute;
        }

        .moon-icon {
          animation: moon-glow 3s ease-in-out infinite;
          transition: opacity 0.3s ease, transform 0.4s ease;
          opacity: ${isDark ? 1 : 0};
          transform: ${isDark ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-90deg)"};
          position: absolute;
        }

        .star-dot {
          animation: twinkle var(--duration, 2s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>

      <button
        className="toggle-track"
        onClick={toggleTheme}
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        type="button"
      >
        <span className="sr-only">
          {isDark ? "Dark mode active" : "Light mode active"}
        </span>

        {/* Background layers for smooth cross-fade */}
        <div className="bg-layer light-bg" />
        <div className="bg-layer dark-bg" />

        <div className="ground-strip" />

        <div className="stars-layer">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            {stars.map((star, i) => (
              <circle
                key={i}
                className="star-dot"
                cx={star.cx}
                cy={star.cy}
                r={star.r}
                fill="white"
                opacity={star.opacity}
                style={
                  {
                    "--duration": `${1.5 + i * 0.4}s`,
                    "--delay": `${star.delay}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </svg>
        </div>

        <div className="cloud-1">
          <Cloud style={{ width: 30, height: 18 }} />
        </div>

        <div className="toggle-thumb group">
          <span className="sun-icon">
            <Sun />
          </span>
          <span className="moon-icon">
            <Moon />
          </span>
        </div>
      </button>
    </>
  );
}
