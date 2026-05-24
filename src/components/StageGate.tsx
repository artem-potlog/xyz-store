import { motion } from "framer-motion";
import { Users, Percent, Building2, Hammer, Wallet } from "lucide-react";
import { Section } from "./Section";
import { GO_NO_GO } from "../data/caseData";

const ICONS: Record<string, React.ReactNode> = {
  Users: <Users className="h-5 w-5" />,
  Percent: <Percent className="h-5 w-5" />,
  Building2: <Building2 className="h-5 w-5" />,
  Hammer: <Hammer className="h-5 w-5" />,
  Wallet: <Wallet className="h-5 w-5" />,
};

const TONE = {
  cyan: { text: "text-neon-cyan", bg: "bg-neon-cyan/[0.06]", border: "border-neon-cyan/30" },
  green: { text: "text-neon-green", bg: "bg-neon-green/[0.06]", border: "border-neon-green/30" },
  amber: { text: "text-neon-amber", bg: "bg-neon-amber/[0.06]", border: "border-neon-amber/30" },
  violet: { text: "text-neon-violet", bg: "bg-neon-violet/[0.06]", border: "border-neon-violet/30" },
  rose: { text: "text-neon-rose", bg: "bg-neon-rose/[0.06]", border: "border-neon-rose/30" },
};

export function StageGate() {
  return (
    <Section
      id="stage-gate"
      eyebrow="Stage-gate · 6 месяцев"
      title="5 порогов go / no-go"
      intro="Каждый порог откалиброван под расчётную чувствительность NPV. Масштабирование на 30+ магазинов только если все 5 порогов пройдены."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GO_NO_GO.map((g, i) => {
          const t = TONE[g.tone];
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-2xl border ${t.border} ${t.bg} p-5 transition-all`}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-2xl"
                style={{ background: "currentColor" }}
              />
              <div className={`relative ${t.text}`}>
                <div className={`inline-flex items-center justify-center rounded-xl border ${t.border} bg-ink-800/60 p-2.5`}>
                  {ICONS[g.icon]}
                </div>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {g.title}
              </h3>
              <div className={`num mt-2 font-display text-2xl font-bold ${t.text}`}>
                {g.threshold}
              </div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-500">
                {g.horizon}
              </div>
              <div className="my-4 h-px bg-white/10" />
              <p className="text-sm text-slate-400">
                <strong className="text-white">Если нарушено:</strong> {g.why.replace(/^Ниже → |^Выше → /, "")}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6"
      >
        <div className="text-[10px] uppercase tracking-wider text-slate-400">
          Цена ошибки
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold text-white">
          Двойной шок ломает экономику пилота
        </h3>
        <p className="mt-2 max-w-3xl text-sm text-slate-400">
          Пилот выдерживает одиночный умеренный шок (выручка −5% или GM −0,5 п.п.) -
          NPV остаётся положительным. Но при двойном шоке (−10% выручки × −1,5 п.п.
          GM) NPV падает до −73 млн ₽. Поэтому пороги - это не «контрольные точки»,
          а условие масштабирования.
        </p>
      </motion.div>
    </Section>
  );
}
