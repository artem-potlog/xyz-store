/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      colors: {
        ink: {
          900: "#05070d",
          800: "#0a0e1a",
          700: "#111729",
          600: "#1a2238",
          500: "#222b46",
          400: "#2d3957",
        },
        neon: {
          green: "#5eead4",
          cyan: "#22d3ee",
          violet: "#a78bfa",
          amber: "#fbbf24",
          rose: "#fb7185",
        },
      },
      boxShadow: {
        glow: "0 0 30px -5px rgba(94, 234, 212, 0.35)",
        "glow-violet": "0 0 30px -5px rgba(167, 139, 250, 0.35)",
        "glow-amber": "0 0 30px -5px rgba(251, 191, 36, 0.35)",
        "glow-rose": "0 0 30px -5px rgba(251, 113, 133, 0.35)",
        card: "0 10px 40px -10px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(94,234,212,0.10), transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>\")",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
