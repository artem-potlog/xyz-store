import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Старт" },
  { id: "recommendation", label: "Рекомендация" },
  { id: "concept", label: "Концепция" },
  { id: "segments", label: "Сегменты" },
  { id: "model", label: "Модель" },
  { id: "scenarios", label: "Сценарии" },
  { id: "sensitivity", label: "Чувствительность" },
  { id: "peers", label: "Пиры" },
  { id: "monte-carlo", label: "Monte Carlo" },
  { id: "stage-gate", label: "Stage-gate" },
  { id: "sources", label: "Источники" },
];

export function Navigation() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Active section is the one closest to the top (with some offset).
      const offset = 200;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = s.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "border-white/10 bg-ink-900/80 backdrop-blur-xl shadow-card"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#hero" className="flex items-center gap-2.5">
            <Logo />
            <div className="hidden sm:block">
              <div className="text-sm font-semibold leading-tight text-white">Company XYZ</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Пилот · СПб</div>
            </div>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {SECTIONS.slice(1).map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    active === s.id
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="chip border-neon-green/30 bg-neon-green/10 text-neon-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" />
              Live
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0" stopColor="#5eead4" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#0a0e1a" />
      <path
        d="M14 44 L24 28 L34 36 L50 16"
        stroke="url(#lg)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="16" r="3.5" fill="#5eead4" />
    </svg>
  );
}
