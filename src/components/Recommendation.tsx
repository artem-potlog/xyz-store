import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { Section } from "./Section";
import { AnimatedNumber } from "./AnimatedNumber";
import { HEADLINE } from "../data/caseData";

const HIGHLIGHTS = [
  {
    label: "EBITDA margin Y1",
    value: HEADLINE.ebitdaMarginY1,
    suffix: "%",
    decimals: 1,
    sub: "→ Y5 8,1% = Лента Q4'24",
  },
  {
    label: "Выручка Y1",
    value: HEADLINE.revenueY1Mln,
    suffix: " млн ₽",
    sub: "10 магазинов × 92,4 млн",
  },
  {
    label: "Breakeven Y1",
    value: HEADLINE.breakevenY1Mln,
    suffix: " млн ₽/год",
    sub: `Запас прочности +${HEADLINE.safetyMarginPct}%`,
  },
  {
    label: "CAPEX / магазин",
    value: HEADLINE.capexPerStoreMln,
    decimals: 1,
    suffix: " млн ₽",
    sub: `${HEADLINE.storesCount} магазинов × 180 м²`,
  },
];

export function Recommendation() {
  return (
    <Section
      id="recommendation"
      eyebrow="Headline · Рекомендация совету директоров"
      title="Запустить пилот, но открывать stage-gate"
      intro="Базовый сценарий проходит барьер WACC 20% с положительным NPV, но запас тонкий - масштабирование только после 6 месяцев работы первых точек по пяти жёстким порогам."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="card card-hover relative h-full overflow-hidden">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-neon-green/10 blur-3xl" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-3 py-1 text-xs font-medium text-neon-green">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Базовый сценарий проходит барьер WACC 20%
              </div>
              <h3 className="font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
                Soft discounter / магазин у дома{" "}
                <span className="text-gradient">с готовой едой</span>
              </h3>
              <p className="mt-4 text-slate-300">
                10 магазинов × 180 м² в плотных жилых районах. Mix-weighted GM 27,0%;
                ФОТ 8,15 млн ₽/магазин/год; ramp-up Y1 = 93,75%; индексация аренды 5%
                и ФОТ 7% в год.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
                {HIGHLIGHTS.map((h) => (
                  <div
                    key={h.label}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">
                      {h.label}
                    </div>
                    <div className="num mt-2 font-display text-xl font-bold text-white md:text-2xl">
                      <AnimatedNumber
                        value={h.value}
                        decimals={h.decimals ?? 0}
                        suffix={h.suffix}
                      />
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500">{h.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="card card-hover h-full">
            <div className="flex items-center gap-2 text-neon-amber">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Сигналы риска
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold text-white">
              Тонкий запас по NPV
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Пилот выдерживает одиночный умеренный шок (выручка −5% или GM −0,5
              п.п.), но не выдерживает двойного шока (−10% × −1,5 п.п.).
            </p>

            <div className="my-5 divider" />

            <div className="flex items-center gap-2 text-neon-green">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Защитный механизм
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold text-white">
              Stage-gate через 6 мес.
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              5 порогов: трафик, маржа, аренда, CAPEX, ФОТ. Каждый - калибровка под
              расчётную чувствительность NPV.
            </p>

            <a
              href="#stage-gate"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neon-cyan transition-colors hover:text-neon-green"
            >
              Смотреть пороги →
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
