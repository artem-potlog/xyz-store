import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Section } from "./Section";
import { SEGMENTS, SCORING_WEIGHTS } from "../data/caseData";

const TONE = {
  green: {
    text: "text-neon-green",
    bg: "bg-neon-green/10",
    border: "border-neon-green/30",
    glow: "shadow-glow",
    dot: "bg-neon-green",
  },
  yellow: {
    text: "text-neon-amber",
    bg: "bg-neon-amber/10",
    border: "border-neon-amber/30",
    glow: "shadow-glow-amber",
    dot: "bg-neon-amber",
  },
  red: {
    text: "text-neon-rose",
    bg: "bg-neon-rose/10",
    border: "border-neon-rose/30",
    glow: "shadow-glow-rose",
    dot: "bg-neon-rose",
  },
};

export function Segments() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = SEGMENTS[selectedIdx];
  const tone = TONE[selected.status];

  const radarData = SCORING_WEIGHTS.map((c) => ({
    criterion: c.label,
    score: (selected.criteria as Record<string, number>)[c.key],
    fullMark: 5,
  }));

  return (
    <Section
      id="segments"
      eyebrow="Слой 1 · Сегментный анализ"
      title="Светофор: 4 сегмента × 5 критериев"
      intro="Балльная модель с весами: рост 30% · конкуренция 25% · unit-экономика 25% · CAPEX 10% · ops 10%. Зелёный ≥ 4,0 · жёлтый 3,0–3,9 · красный < 3,0."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-7">
          {SEGMENTS.map((seg, i) => {
            const t = TONE[seg.status];
            const isActive = i === selectedIdx;
            return (
              <motion.button
                key={seg.name}
                onClick={() => setSelectedIdx(i)}
                whileHover={{ x: 4 }}
                className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                  isActive
                    ? `${t.border} ${t.bg} ring-1 ring-white/10 ${t.glow}`
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${t.dot} ${isActive ? "animate-pulse" : ""}`} />
                      <span className={`text-[11px] font-semibold uppercase tracking-wider ${t.text}`}>
                        {seg.verdict}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white md:text-xl">
                      {seg.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-400">{seg.rationale}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">Балл</div>
                    <div className={`font-display text-3xl font-bold num ${t.text}`}>
                      {seg.score.toFixed(2)}
                    </div>
                  </div>
                </div>
                {/* progress bar */}
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(seg.score / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 }}
                    className={`h-full ${t.dot}`}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="lg:col-span-5">
          <div className="card sticky top-24 h-fit">
            <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-400">
              Профиль сегмента
            </div>
            <AnimatePresence mode="wait">
              <motion.h3
                key={selected.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="font-display text-xl font-semibold text-white"
              >
                {selected.short}
              </motion.h3>
            </AnimatePresence>

            <div className="mt-4 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis
                    dataKey="criterion"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 5]}
                    tick={{ fill: "#475569", fontSize: 10 }}
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <Radar
                    name={selected.short}
                    dataKey="score"
                    stroke={selected.status === "green" ? "#5eead4" : selected.status === "yellow" ? "#fbbf24" : "#fb7185"}
                    fill={selected.status === "green" ? "#5eead4" : selected.status === "yellow" ? "#fbbf24" : "#fb7185"}
                    fillOpacity={0.25}
                    strokeWidth={2}
                    isAnimationActive
                    animationDuration={800}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-1.5">
              {SCORING_WEIGHTS.map((c) => (
                <div
                  key={c.key}
                  className="flex items-center justify-between text-xs text-slate-400"
                >
                  <span>{c.label}</span>
                  <span className="num text-white">
                    {(selected.criteria as Record<string, number>)[c.key].toFixed(1)}
                    <span className="text-slate-500"> / 5 · w{c.weight}%</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Вердикт</div>
              <div className={`mt-1 text-sm font-semibold ${tone.text}`}>{selected.verdict}</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
