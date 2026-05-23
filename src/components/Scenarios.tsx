import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, AlertOctagon, Rocket } from "lucide-react";
import { Section } from "./Section";
import { AnimatedNumber } from "./AnimatedNumber";
import { SCENARIOS } from "../data/caseData";

const ICONS: Record<string, React.ReactNode> = {
  base: <TrendingUp className="h-4 w-4" />,
  stagflation: <TrendingDown className="h-4 w-4" />,
  easing: <Rocket className="h-4 w-4" />,
  discount_race: <AlertOctagon className="h-4 w-4" />,
};

export function Scenarios() {
  const [selectedId, setSelectedId] = useState(SCENARIOS[0].id);
  const selected = SCENARIOS.find((s) => s.id === selectedId)!;

  const npvMin = Math.min(...SCENARIOS.map((s) => s.npv));
  const npvMax = Math.max(...SCENARIOS.map((s) => s.npv));
  const zero = (-npvMin / (npvMax - npvMin)) * 100;

  return (
    <Section
      id="scenarios"
      eyebrow="4 макросценария · research-grounded"
      title="Что если макро изменится"
      intro="Каждый сценарий — это набор драйверов с обоснованием в источниках. Кликните по сценарию, чтобы увидеть детали и сравнить NPV/IRR/DPP."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-7">
          {SCENARIOS.map((s) => {
            const isActive = s.id === selectedId;
            const isPositive = s.tone === "positive";
            return (
              <motion.button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                whileHover={{ scale: 1.005 }}
                className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                  isActive
                    ? isPositive
                      ? "border-neon-green/30 bg-neon-green/[0.06] shadow-glow"
                      : "border-neon-rose/30 bg-neon-rose/[0.06] shadow-glow-rose"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${isPositive ? "text-neon-green" : "text-neon-rose"}`}>
                      {ICONS[s.id]}
                      {s.name}
                    </div>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {s.drivers.map((d) => (
                        <li
                          key={d}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-slate-400"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid shrink-0 grid-cols-3 gap-3 text-right">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-500">NPV</div>
                      <div className={`num font-display text-lg font-bold ${s.npv > 0 ? "text-neon-green" : "text-neon-rose"}`}>
                        {s.npv > 0 ? "+" : ""}
                        {s.npv.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-500">IRR</div>
                      <div className={`num font-display text-lg font-bold ${s.irr > 0 ? "text-white" : "text-neon-rose"}`}>
                        {s.irr.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-500">DPP</div>
                      <div className="num font-display text-lg font-bold text-white">
                        {s.dpp ? s.dpp.toFixed(1) : "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="lg:col-span-5">
          <div className="card sticky top-24">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">
              Сравнение NPV @ 20%
            </div>

            {/* NPV bar chart with zero line */}
            <div className="relative mt-5 space-y-3">
              {SCENARIOS.map((s) => {
                const isPositive = s.npv >= 0;
                const widthPct = (Math.abs(s.npv) / Math.max(Math.abs(npvMin), npvMax)) * 50;
                return (
                  <div key={s.id} className="text-xs">
                    <div className="mb-1 flex justify-between">
                      <span
                        className={`font-medium ${
                          s.id === selectedId ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span className={`num font-semibold ${isPositive ? "text-neon-green" : "text-neon-rose"}`}>
                        {isPositive ? "+" : ""}
                        {s.npv.toFixed(1)} млн ₽
                      </span>
                    </div>
                    <div className="relative h-3 w-full overflow-visible">
                      <div className="absolute inset-y-0 left-1/2 w-px bg-white/15" />
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${widthPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`absolute top-1/2 h-2 -translate-y-1/2 rounded ${
                          isPositive ? "left-1/2 bg-neon-green" : "right-1/2 bg-neon-rose"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="my-5 divider" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-[10px] uppercase tracking-wider text-slate-400">
                  Выбран: {selected.name}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <Metric label="NPV" value={selected.npv} suffix=" млн ₽" decimals={1} accent />
                  <Metric label="IRR" value={selected.irr} suffix="%" decimals={1} accent />
                  <Metric
                    label="DPP"
                    value={selected.dpp ?? 0}
                    suffix={selected.dpp ? " года" : ""}
                    decimals={1}
                    text={selected.dpp ? undefined : selected.dppLabel}
                  />
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-slate-400">
                  <strong className="text-white">Ключевое:</strong>{" "}
                  пилот выдерживает одиночный шок (выручка −5% или GM −0,5 п.п.), но
                  не выдерживает двойного. Отсюда жёсткие go/no-go пороги.
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Metric({
  label,
  value,
  decimals = 1,
  suffix = "",
  accent,
  text,
}: {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  accent?: boolean;
  text?: string;
}) {
  const isNeg = value < 0;
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="text-[9px] uppercase tracking-wider text-slate-500">{label}</div>
      <div
        className={`num mt-1 font-display text-lg font-bold ${
          accent ? (isNeg ? "text-neon-rose" : "text-neon-green") : "text-white"
        }`}
      >
        {text ?? (
          <>
            {value > 0 && accent && "+"}
            <AnimatedNumber value={value} decimals={decimals} suffix={suffix} />
          </>
        )}
      </div>
    </div>
  );
}
