import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Line,
  Legend,
} from "recharts";
import { Users, Repeat, ShoppingBag, Coins, Receipt, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { AnimatedNumber } from "./AnimatedNumber";
import {
  COHORT_FUNNEL,
  PRODUCT_MIX,
  BLENDED_GM,
  PAYROLL,
  PAYROLL_TOTAL,
  CAPEX_BREAKDOWN,
  FIVE_YEAR_PNL,
  ASSUMPTIONS,
} from "../data/caseData";

type Tab = "cohort" | "mix" | "payroll" | "capex" | "pnl" | "assumptions";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "cohort", label: "Когорта", icon: <Users className="h-3.5 w-3.5" /> },
  { id: "mix", label: "Product mix", icon: <ShoppingBag className="h-3.5 w-3.5" /> },
  { id: "payroll", label: "ФОТ", icon: <Receipt className="h-3.5 w-3.5" /> },
  { id: "capex", label: "CAPEX", icon: <Coins className="h-3.5 w-3.5" /> },
  { id: "pnl", label: "5Y P&L", icon: <Repeat className="h-3.5 w-3.5" /> },
  { id: "assumptions", label: "Допущения", icon: <Sparkles className="h-3.5 w-3.5" /> },
];

export function FinancialModel() {
  const [tab, setTab] = useState<Tab>("cohort");

  return (
    <Section
      id="model"
      eyebrow="Слой 2 · Финансовая модель"
      title="Механики, адаптированные под СПб"
      intro="6 механик из профессионального grocery template (US, 26 листов) калиброваны под российский рынок: когортная воронка, mix-weighted GM, ФОТ по ролям, OPEX-разбивка, ramp-up Y1, breakeven."
    >
      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              tab === t.id
                ? "border-neon-green/30 bg-neon-green/10 text-neon-green shadow-glow"
                : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "cohort" && <CohortPanel />}
          {tab === "mix" && <MixPanel />}
          {tab === "payroll" && <PayrollPanel />}
          {tab === "capex" && <CapexPanel />}
          {tab === "pnl" && <PnlPanel />}
          {tab === "assumptions" && <AssumptionsPanel />}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}

/* -------- Cohort funnel -------- */
function CohortPanel() {
  const max = Math.max(...COHORT_FUNNEL.map((c) => c.value));

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="card lg:col-span-7">
        <h3 className="font-display text-lg font-semibold text-white">
          Когортная воронка · 1 магазин
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Visitor → Buyer → Repeat → Orders. Lifetime repeat-клиента 36 мес. → steady-state 7 500 active repeats.
        </p>

        <div className="mt-6 space-y-3">
          {COHORT_FUNNEL.map((stage, i) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="mb-1 flex items-baseline justify-between text-sm">
                <span className="text-slate-300">{stage.stage}</span>
                <span className="num font-display text-lg font-semibold text-white">
                  <AnimatedNumber value={stage.value} />
                </span>
              </div>
              <div className="h-8 w-full overflow-hidden rounded-lg bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(stage.value / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 }}
                  className="h-full bg-gradient-to-r from-neon-green via-neon-cyan to-neon-violet"
                />
              </div>
              <div className="mt-1 text-[11px] text-slate-500">{stage.note}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="card lg:col-span-5">
        <h3 className="font-display text-lg font-semibold text-white">Перевод в выручку</h3>
        <p className="mt-1 text-sm text-slate-400">
          182 500 заказов × средний чек 540 ₽ × ramp-up 93,75% = Y1 revenue на магазин.
        </p>
        <div className="mt-6 space-y-4">
          <CalcRow label="Заказов / год" value="182 500" />
          <CalcRow label="Средний чек" value="540 ₽" />
          <CalcRow label="Ramp-up Y1" value="93,75%" />
          <div className="divider" />
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-slate-300">Y1 revenue / магазин</span>
            <span className="num font-display text-2xl font-bold text-neon-green">
              <AnimatedNumber value={92.4} decimals={1} suffix=" млн ₽" />
            </span>
          </div>
          <div className="rounded-xl border border-neon-green/20 bg-neon-green/[0.06] p-3">
            <div className="text-[10px] uppercase tracking-wider text-neon-green">10 магазинов</div>
            <div className="num mt-1 font-display text-3xl font-bold text-white">
              <AnimatedNumber value={924} suffix=" млн ₽" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalcRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="num text-white">{value}</span>
    </div>
  );
}

/* -------- Product mix -------- */
function MixPanel() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="card lg:col-span-5">
        <h3 className="font-display text-lg font-semibold text-white">Mix-weighted gross margin</h3>
        <p className="mt-1 text-sm text-slate-400">
          6 категорий → blended GM <span className="text-neon-green num">27,0%</span>.
          Структурная премия +5 п.п. к Ленте за счёт Fresh и СТМ.
        </p>

        <div className="relative mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={PRODUCT_MIX}
                dataKey="share"
                nameKey="category"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                onMouseEnter={(_, i) => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                isAnimationActive
                animationDuration={900}
              >
                {PRODUCT_MIX.map((entry, i) => (
                  <Cell
                    key={entry.category}
                    fill={entry.color}
                    stroke="#0a0e1a"
                    strokeWidth={2}
                    style={{
                      filter: activeIdx === i ? "brightness(1.2)" : "brightness(1)",
                      opacity: activeIdx === null || activeIdx === i ? 1 : 0.4,
                      transition: "all 0.2s",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "rgba(10,14,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                formatter={(v: number) => [`${v}%`, "Доля в обороте"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Blended GM</div>
            <div className="num font-display text-4xl font-bold text-gradient">
              {BLENDED_GM.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      <div className="card lg:col-span-7">
        <h3 className="font-display text-lg font-semibold text-white">Категории</h3>
        <div className="mt-4 space-y-2.5">
          {PRODUCT_MIX.map((cat, i) => (
            <div
              key={cat.category}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              className={`rounded-xl border p-3 transition-all ${
                activeIdx === i ? "border-white/20 bg-white/[0.05]" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 shrink-0 rounded-sm"
                  style={{ background: cat.color }}
                />
                <div className="min-w-0 flex-1 text-sm font-medium text-white">
                  {cat.category}
                </div>
                <div className="text-right">
                  <div className="num text-sm font-semibold text-white">
                    {cat.share}% · GM {cat.gm}%
                  </div>
                  <div className="num text-[11px] text-neon-green">
                    вклад {cat.contribution.toFixed(1)} п.п.
                  </div>
                </div>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(cat.contribution / 11) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08 }}
                  className="h-full"
                  style={{ background: cat.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------- Payroll -------- */
function PayrollPanel() {
  const max = Math.max(...PAYROLL.map((p) => p.cost));

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="card lg:col-span-8">
        <h3 className="font-display text-lg font-semibold text-white">ФОТ по 5 ролям</h3>
        <p className="mt-1 text-sm text-slate-400">
          8 FTE на магазин · Loading 1,40 (НДФЛ 13% + страховые ~30%) ·{" "}
          <span className="num text-white">{PAYROLL_TOTAL.toFixed(2)} млн ₽/магазин/год</span>
        </p>

        <div className="mt-6 space-y-2">
          {PAYROLL.map((p, i) => (
            <motion.div
              key={p.role}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-3 hover:bg-white/[0.05]"
            >
              <div className="grid grid-cols-12 items-center gap-3">
                <div className="col-span-12 sm:col-span-5">
                  <div className="text-sm font-medium text-white">{p.role}</div>
                  <div className="num mt-0.5 text-[11px] text-slate-500">
                    FTE {p.fte} · net+bonus {p.netBonus} тыс. ₽/мес · loading {p.loading}
                  </div>
                </div>
                <div className="col-span-9 sm:col-span-5">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(p.cost / max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.08 }}
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-violet"
                    />
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2 text-right">
                  <span className="num font-semibold text-white">{p.cost.toFixed(2)}</span>
                  <span className="text-xs text-slate-500"> млн ₽</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="card lg:col-span-4">
        <div className="text-[10px] uppercase tracking-wider text-slate-400">Сводка ФОТ</div>
        <div className="num mt-2 font-display text-5xl font-bold text-gradient">
          <AnimatedNumber value={PAYROLL_TOTAL} decimals={2} />
        </div>
        <div className="text-sm text-slate-400">млн ₽ / магазин / год</div>

        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Всего FTE</span>
            <span className="num text-white">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Loading</span>
            <span className="num text-white">1,40</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Индексация ФОТ</span>
            <span className="num text-white">7% / год</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Барьер go/no-go</span>
            <span className="num text-neon-amber">≤ 9,0 млн ₽</span>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-neon-amber/30 bg-neon-amber/[0.06] p-3 text-xs text-slate-300">
          Рынок СПб: зарплаты ритейла +24-42% г/г (Dream Job / Авито Работа).
        </div>
      </div>
    </div>
  );
}

/* -------- CAPEX -------- */
function CapexPanel() {
  const total = CAPEX_BREAKDOWN.reduce((s, x) => s + x.value, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="card lg:col-span-7">
        <h3 className="font-display text-lg font-semibold text-white">
          CAPEX на 1 магазин · 17,8 млн ₽
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Без логистики (есть существующие мощности). Включает NWC (стартовый товарный запас) и резерв 7%.
        </p>

        <div className="mt-6 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CAPEX_BREAKDOWN} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="item"
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
                width={210}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,14,26,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                }}
                formatter={(v: number) => [`${v.toFixed(1)} млн ₽`, "CAPEX"]}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} isAnimationActive animationDuration={1200}>
                {CAPEX_BREAKDOWN.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card lg:col-span-5">
        <div className="text-[10px] uppercase tracking-wider text-slate-400">CAPEX пилота</div>
        <div className="num mt-2 font-display text-5xl font-bold text-white">
          <AnimatedNumber value={178} suffix=" млн ₽" />
        </div>
        <div className="text-sm text-slate-400">10 магазинов × 17,8 млн ₽</div>

        <div className="my-5 divider" />

        <h4 className="text-sm font-semibold text-white">Структура (млн ₽)</h4>
        <ul className="mt-3 space-y-1.5">
          {CAPEX_BREAKDOWN.map((c) => (
            <li key={c.item} className="flex items-center gap-3 text-sm">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.color }} />
              <span className="flex-1 text-slate-300">{c.item}</span>
              <span className="num text-white">{c.value.toFixed(1)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <span className="text-sm text-slate-400">Барьер go/no-go</span>
          <span className="num text-sm font-semibold text-neon-amber">
            ≤ 20 млн ₽ / магазин
          </span>
        </div>

        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <span className="num text-xs text-slate-500">
            Из них NWC: 4,2 млн ₽ ({((4.2 / total) * 100).toFixed(0)}% от CAPEX)
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------- 5Y P&L -------- */
function PnlPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="card lg:col-span-8">
        <h3 className="font-display text-lg font-semibold text-white">
          5-летний P&L пилота · 10 магазинов
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Рост Y2–Y5: 8 / 7 / 6 / 5%. EBITDA margin Y1 → Y5: 7,1% → 8,1% (= Лента Q4'24).
        </p>

        <div className="mt-6 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={FIVE_YEAR_PNL}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5eead4" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.85} />
                </linearGradient>
                <linearGradient id="ebi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.85} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="year" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <YAxis
                yAxisId="left"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                label={{ value: "млн ₽", angle: -90, position: "insideLeft", fill: "#64748b", fontSize: 11 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                domain={[6, 9]}
                label={{ value: "EBITDA %", angle: 90, position: "insideRight", fill: "#64748b", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,14,26,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: "#cbd5e1" }} />
              <Bar yAxisId="left" dataKey="revenue" name="Выручка" fill="url(#rev)" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={1200} />
              <Bar yAxisId="left" dataKey="ebitda" name="EBITDA" fill="url(#ebi)" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={1200} />
              <Line yAxisId="right" type="monotone" dataKey="margin" name="EBITDA margin %" stroke="#fbbf24" strokeWidth={2.5} dot={{ r: 4, fill: "#fbbf24" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card lg:col-span-4">
        <h3 className="font-display text-lg font-semibold text-white">FCF и инвест-метрики</h3>
        <p className="mt-1 text-sm text-slate-400">
          ΔNWC = 2% от прироста выручки; maintenance CAPEX = 1% выручки с Y2; налог 25%.
        </p>

        <div className="mt-5 space-y-2.5">
          {FIVE_YEAR_PNL.map((y, i) => (
            <motion.div
              key={y.year}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-sm"
            >
              <span className="font-display font-semibold text-white">{y.year}</span>
              <div className="text-right">
                <div className="num text-xs text-slate-400">
                  Rev {y.revenue} · EBITDA {y.ebitda.toFixed(1)}
                </div>
                <div className={`num text-xs ${y.fcf < 0 ? "text-neon-rose" : "text-neon-green"}`}>
                  FCF {y.fcf > 0 ? "+" : ""}
                  {y.fcf.toFixed(1)} млн ₽
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-neon-green/30 bg-neon-green/[0.06] p-3">
            <div className="text-[10px] uppercase tracking-wider text-neon-green">NPV</div>
            <div className="num mt-1 font-display text-lg font-bold text-white">+8,5</div>
          </div>
          <div className="rounded-xl border border-neon-cyan/30 bg-neon-cyan/[0.06] p-3">
            <div className="text-[10px] uppercase tracking-wider text-neon-cyan">IRR</div>
            <div className="num mt-1 font-display text-lg font-bold text-white">22,1%</div>
          </div>
          <div className="rounded-xl border border-neon-violet/30 bg-neon-violet/[0.06] p-3">
            <div className="text-[10px] uppercase tracking-wider text-neon-violet">DPP</div>
            <div className="num mt-1 font-display text-lg font-bold text-white">4,7</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- Assumptions -------- */
function AssumptionsPanel() {
  return (
    <div className="card">
      <h3 className="font-display text-lg font-semibold text-white">
        Все ключевые допущения модели
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        20+ допущений с источниками - на листе <span className="num text-white">Assumptions</span> Excel-модели.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ASSUMPTIONS.map((a, i) => (
          <motion.div
            key={a.key}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-3 hover:bg-white/[0.04]"
          >
            <div className="text-[10px] uppercase tracking-wider text-slate-500">{a.key}</div>
            <div className="num mt-1 text-sm font-semibold text-white">{a.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
