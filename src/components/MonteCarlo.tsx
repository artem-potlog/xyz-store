import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
} from "recharts";
import { Dice5, Info, X } from "lucide-react";
import { Section } from "./Section";
import { AnimatedNumber } from "./AnimatedNumber";
import { MC_SUMMARY, MC_NPV_HIST, MC_TORNADO } from "../data/caseData";

// Единый стиль тёмного тултипа со СВЕТЛЫМ шрифтом.
const TOOLTIP_STYLE = {
  background: "rgba(10,14,26,0.95)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  color: "#e2e8f0",
  fontSize: 12,
};
const TOOLTIP_LABEL_STYLE = { color: "#ffffff", fontWeight: 600 };
const TOOLTIP_ITEM_STYLE = { color: "#e2e8f0" };

export function MonteCarlo() {
  return (
    <Section
      id="monte-carlo"
      eyebrow="Monte Carlo · 20 000 итераций"
      title="Вероятностный анализ NPV"
      intro={
        <>
          Симуляция совместного действия пяти драйверов - средний чек, steady-state orders, ФОТ,
          аренда, gross margin - на 20&nbsp;000 итераций.
        </>
      }
    >
      <MetricsStrip />
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <NpvDistribution />
        </div>
        <div className="lg:col-span-5">
          <Tornado />
        </div>
      </div>
      <Conclusion />
    </Section>
  );
}

/* ===================== KPI strip ===================== */

type Metric = {
  key: string;
  label: string;
  value?: number;
  text?: string;
  suffix?: string;
  decimals?: number;
  tone: "neutral" | "positive" | "warning";
  what: string;
  why: string;
};

const METRICS: Metric[] = [
  {
    key: "median",
    label: "Медиана NPV",
    value: MC_SUMMARY.medianNpv,
    suffix: " млн ₽",
    decimals: 1,
    tone: "neutral",
    what: "P50 - серединное значение распределения NPV. Половина из 20 000 сценариев даёт NPV ≤ 23,4, вторая половина ≥ 23,4 млн ₽.",
    why: "Устойчивая к выбросам оценка центра распределения. Близка к базовой NPV 26,4 млн ₽ - значит, базовая ФЭМ-оценка валидна как типичный исход, а не как оптимистичный кейс.",
  },
  {
    key: "pneg",
    label: "P(NPV < 0)",
    value: MC_SUMMARY.pNegNpv,
    suffix: "%",
    decimals: 1,
    tone: "warning",
    what: "Доля сценариев из 20 000, где NPV получается отрицательным при WACC 20%.",
    why: "Это и есть количественная вероятность убыточности проекта - главная цифра для решения «инвестировать или нет». 34,4% значит, что каждый третий сценарий не окупает капитал по требуемой ставке.",
  },
  {
    key: "p05p95",
    label: "P05 / P95 NPV",
    text: `${MC_SUMMARY.p05Npv.toFixed(1)} / +${MC_SUMMARY.p95Npv.toFixed(1)}`,
    suffix: " млн ₽",
    tone: "neutral",
    what: "90-процентный доверительный интервал NPV. С вероятностью 90% NPV окажется между -65,4 и +115,8 млн ₽.",
    why: "Заменяет точечные «оптимистичный/пессимистичный» сценарии реальными границами массы вероятности. Хвосты (5% слева и 5% справа) - крайние случаи редкого стечения шоков.",
  },
  {
    key: "irrMed",
    label: "Медиана IRR",
    value: MC_SUMMARY.medianIrr,
    suffix: "%",
    decimals: 1,
    tone: "positive",
    what: "Типичная внутренняя норма доходности проекта по медианному сценарию.",
    why: "Превышает WACC 20% на 4,9 п.п. - в половине сценариев проект создаёт стоимость сверх требуемой ставки. Сравнение с детерминированной IRR базы (25,5%) подтверждает: базовый расчёт реалистичен.",
  },
  {
    key: "pIrr",
    label: "P(IRR < 20% WACC)",
    value: MC_SUMMARY.pIrrBelowWacc,
    suffix: "%",
    decimals: 1,
    tone: "warning",
    what: "Доля сценариев, где IRR оказывается ниже стоимости капитала (20%).",
    why: "Математически тождественно P(NPV<0) - но язык IRR удобнее для Совета директоров. Говорит то же самое: треть сценариев не приносит требуемую доходность.",
  },
];

function MetricsStrip() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toneClass = (t: string) =>
    t === "positive" ? "text-neon-green" : t === "warning" ? "text-neon-amber" : "text-white";

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {METRICS.map((m, i) => {
        const isOpen = openKey === m.key;
        return (
          <motion.button
            key={m.key}
            type="button"
            onClick={() => setOpenKey(isOpen ? null : m.key)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -2 }}
            className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all ${
              isOpen
                ? "border-white/30 bg-white/[0.05]"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">{m.label}</div>
              <Info
                className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                  isOpen ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                }`}
              />
            </div>
            <div className={`num mt-2 font-display text-2xl font-bold ${toneClass(m.tone)}`}>
              {m.text ? (
                <>
                  {m.text}
                  <span className="text-xs text-slate-400">{m.suffix}</span>
                </>
              ) : (
                <AnimatedNumber value={m.value!} decimals={m.decimals} suffix={m.suffix ?? ""} />
              )}
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Что это
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">{m.what}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Зачем
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">{m.why}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ===================== NPV histogram ===================== */

function NpvDistribution() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const totalSim = MC_SUMMARY.nSim;
  const selected = selectedIdx !== null ? MC_NPV_HIST[selectedIdx] : null;
  const selectedShare = selected ? (selected.count / totalSim) * 100 : null;

  return (
    <div className="card h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            Распределение NPV @ 20%
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Красная зона - NPV &lt; 0 ({MC_SUMMARY.pNegNpv}% массы). Зелёная - NPV ≥ 0
            ({(100 - MC_SUMMARY.pNegNpv).toFixed(1)}%). Базовая оценка +26,4 млн ₽ попадает в бин «+18».
            Клик/наведение на бар - детали по интервалу.
          </p>
        </div>
        <div className="hidden shrink-0 rounded-xl border border-white/10 bg-white/[0.03] p-2 text-neon-violet sm:block">
          <Dice5 className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={MC_NPV_HIST}
            margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
            onClick={(state: { activeTooltipIndex?: number }) => {
              if (typeof state?.activeTooltipIndex === "number") {
                setSelectedIdx(state.activeTooltipIndex);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="mid"
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              tickFormatter={(v: number) => (v > 0 ? `+${v}` : `${v}`)}
              label={{ value: "NPV, млн ₽", position: "insideBottom", offset: -4, fill: "#64748b", fontSize: 11 }}
            />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={TOOLTIP_STYLE}
              itemStyle={TOOLTIP_ITEM_STYLE}
              labelStyle={TOOLTIP_LABEL_STYLE}
              formatter={(value: number, _: string, item: { payload?: { bucket?: string } }) => {
                const share = ((value / totalSim) * 100).toFixed(2);
                return [`${value.toLocaleString("ru-RU")} (${share}%)`, item?.payload?.bucket ?? "NPV"];
              }}
              labelFormatter={() => "Бин NPV"}
            />
            <ReferenceLine x={0} stroke="#fb7185" strokeWidth={1.5} strokeDasharray="4 3" label={{ value: "NPV=0", fill: "#fb7185", fontSize: 11, position: "insideTopLeft" }} />
            <ReferenceLine x={18} stroke="#5eead4" strokeWidth={1.5} strokeDasharray="2 3" label={{ value: "база +26", fill: "#5eead4", fontSize: 11, position: "insideTopRight" }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={1100} cursor="pointer">
              {MC_NPV_HIST.map((b, i) => (
                <Cell
                  key={i}
                  fill={b.mid < 0 ? "#fb7185" : "#5eead4"}
                  opacity={selectedIdx === null ? 0.9 : selectedIdx === i ? 1 : 0.35}
                  stroke={selectedIdx === i ? "#ffffff" : "transparent"}
                  strokeWidth={selectedIdx === i ? 1.5 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm"
            >
              <div className="text-slate-400">
                Бин <span className="num text-white">{selected.bucket}</span> млн ₽
              </div>
              <div className="text-slate-400">
                Сценариев: <span className="num font-semibold text-white">{selected.count.toLocaleString("ru-RU")}</span>
              </div>
              <div className="text-slate-400">
                Вероятность:{" "}
                <span className={`num font-semibold ${selected.mid >= 0 ? "text-neon-green" : "text-neon-rose"}`}>
                  {selectedShare!.toFixed(2)}%
                </span>
              </div>
              <button
                onClick={() => setSelectedIdx(null)}
                className="ml-auto inline-flex items-center gap-1 text-[11px] text-slate-500 underline-offset-2 hover:text-white hover:underline"
              >
                <X className="h-3 w-3" /> сбросить
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-slate-500"
            >
              Стандартное отклонение σ(NPV) = {MC_SUMMARY.stdNpv} млн ₽ - около 2× от базы, отсюда широкое распределение.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ===================== Tornado ===================== */

function Tornado() {
  const [selectedKey, setSelectedKey] = useState<string | null>(MC_TORNADO[0].driver);
  const selected = MC_TORNADO.find((t) => t.driver === selectedKey) ?? null;

  return (
    <div className="card h-full">
      <h3 className="font-display text-lg font-semibold text-white">
        Tornado: вклад в дисперсию NPV
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        Метод: Spearman² корреляции с NPV, нормированный на 100%. 91% риска - три коммерческих рычага.
        Клик по бару - подробности по драйверу.
      </p>

      <div className="mt-5 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={MC_TORNADO}
            layout="vertical"
            margin={{ top: 4, right: 30, left: 0, bottom: 4 }}
            onClick={(state: { activeTooltipIndex?: number }) => {
              if (typeof state?.activeTooltipIndex === "number") {
                setSelectedKey(MC_TORNADO[state.activeTooltipIndex].driver);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="driver"
              tick={{ fill: "#cbd5e1", fontSize: 11 }}
              width={140}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={TOOLTIP_STYLE}
              itemStyle={TOOLTIP_ITEM_STYLE}
              labelStyle={TOOLTIP_LABEL_STYLE}
              formatter={(value: number, _: string, item: { payload?: { rho?: number } }) => [
                `${value.toFixed(1)}%   (ρ=${item?.payload?.rho?.toFixed(2)})`,
                "доля дисперсии",
              ]}
              labelFormatter={(l: string) => l}
            />
            <Bar dataKey="share" radius={[0, 6, 6, 0]} isAnimationActive animationDuration={1100} cursor="pointer">
              {MC_TORNADO.map((t, i) => (
                <Cell
                  key={i}
                  fill={t.rho >= 0 ? "#5eead4" : "#fb7185"}
                  opacity={selectedKey === null ? 0.9 : selectedKey === t.driver ? 1 : 0.35}
                  stroke={selectedKey === t.driver ? "#ffffff" : "transparent"}
                  strokeWidth={selectedKey === t.driver ? 1.5 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.driver}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="text-sm font-semibold text-white">{selected.driver}</div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="num text-slate-400">
                    ρ ={" "}
                    <span className={selected.rho >= 0 ? "text-neon-green" : "text-neon-rose"}>
                      {selected.rho >= 0 ? "+" : ""}
                      {selected.rho.toFixed(2)}
                    </span>
                  </span>
                  <span className="num font-semibold text-white">{selected.share.toFixed(1)}% дисперсии</span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-1 text-xs text-slate-400 sm:grid-cols-[auto_1fr]">
                <span className="text-slate-500">База:</span>
                <span className="num text-slate-200">{selected.base}</span>
                <span className="text-slate-500">Распределение:</span>
                <span className="num text-slate-200">{selected.distribution}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">{selected.rationale}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ===================== Conclusion ===================== */

function Conclusion() {
  const callouts = [
    {
      tag: "Капитал защищён",
      text: (
        <>
          P(IRR &lt; 0%) = <strong className="text-white">{MC_SUMMARY.pIrrNeg}%</strong>;
          {" "}P(EBITDA Y1 &lt; 0) = <strong className="text-white">{MC_SUMMARY.pEbitdaNeg}%</strong>.
          Даже в худших сценариях деньги возвращаются, бизнес операционно стоит на ногах.
        </>
      ),
      tone: "green",
    },
    {
      tag: "2 из 3 сценариев создают ценность",
      text: (
        <>
          P(NPV &gt; 0) = <strong className="text-white">{(100 - MC_SUMMARY.pNegNpv).toFixed(1)}%</strong>;
          {" "}P(NPV &gt; +50 млн ₽) = <strong className="text-white">{MC_SUMMARY.pBigUpside}%</strong>.
          Распределение асимметрично в плюс: апсайд P95 = +115,8 млн ₽ - в 4,4× больше базовой оценки.
        </>
      ),
      tone: "green",
    },
    {
      tag: "Фокус stage-gate - на трёх драйверах",
      text: (
        <>
          <strong className="text-white">91% дисперсии NPV</strong> объясняют валовая маржа,
          steady-state orders и средний чек. Аренда и ФОТ в сумме &lt;10% - мониторинг квартально,
          а не еженедельно.
        </>
      ),
      tone: "violet",
    },
  ];
  const tone = (t: string) => {
    if (t === "green") return "border-neon-green/30 bg-neon-green/[0.05]";
    if (t === "amber") return "border-neon-amber/30 bg-neon-amber/[0.05]";
    return "border-neon-violet/30 bg-neon-violet/[0.05]";
  };
  const tagTone = (t: string) => {
    if (t === "green") return "text-neon-green";
    if (t === "amber") return "text-neon-amber";
    return "text-neon-violet";
  };

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {callouts.map((c, i) => (
        <motion.div
          key={c.tag}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`rounded-2xl border p-5 ${tone(c.tone)}`}
        >
          <div className={`text-[10px] font-semibold uppercase tracking-wider ${tagTone(c.tone)}`}>
            {c.tag}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
