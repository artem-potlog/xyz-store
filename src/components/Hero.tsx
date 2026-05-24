import { motion } from "framer-motion";
import { ArrowDown, Sparkles, TrendingUp, Target, Clock } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";
import { HEADLINE } from "../data/caseData";

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* animated background grid + glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute -top-32 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-neon-green/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-neon-violet/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-neon-cyan/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-5 pb-20 pt-32 md:px-8 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-neon-green/30 bg-neon-green/10 px-4 py-1.5 text-xs font-medium text-neon-green backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Company XYZ · Кейс 2026 · Аналитика для Совета директоров
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[5.5rem]"
        >
          Пилот <span className="text-gradient">продуктового ритейла</span>
          <br />в Санкт-Петербурге
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl"
        >
          10 магазинов формата <span className="text-white">soft discounter</span> /
          магазин у дома, 180 м², с акцентом на готовую еду и СТМ - в плотных жилых
          районах СПб. Перед вами - интерактивная версия аналитической записки и
          приложения с расчётами.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-4"
        >
          <HeroStat
            icon={<TrendingUp className="h-4 w-4" />}
            label="NPV @ 20%"
            value={HEADLINE.npvMln}
            decimals={1}
            suffix=" млн ₽"
            tone="green"
            accent="+"
          />
          <HeroStat
            icon={<Target className="h-4 w-4" />}
            label="IRR"
            value={HEADLINE.irrPct}
            decimals={1}
            suffix="%"
            tone="cyan"
          />
          <HeroStat
            icon={<Clock className="h-4 w-4" />}
            label="DPP"
            value={HEADLINE.dppYears}
            decimals={1}
            suffix=" года"
            tone="violet"
          />
          <HeroStat
            icon={<Sparkles className="h-4 w-4" />}
            label="CAPEX пилота"
            value={HEADLINE.capexTotalMln}
            suffix=" млн ₽"
            tone="amber"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
          Прокрутите для исследования
        </motion.div>
      </div>
    </header>
  );
}

function HeroStat({
  icon,
  label,
  value,
  decimals = 0,
  suffix = "",
  accent = "",
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  accent?: string;
  tone: "green" | "cyan" | "violet" | "amber";
}) {
  const toneMap = {
    green: { text: "text-neon-green", ring: "ring-neon-green/30", glow: "shadow-glow", bg: "bg-neon-green/5" },
    cyan: { text: "text-neon-cyan", ring: "ring-neon-cyan/30", glow: "shadow-[0_0_30px_-5px_rgba(34,211,238,0.35)]", bg: "bg-neon-cyan/5" },
    violet: { text: "text-neon-violet", ring: "ring-neon-violet/30", glow: "shadow-glow-violet", bg: "bg-neon-violet/5" },
    amber: { text: "text-neon-amber", ring: "ring-neon-amber/30", glow: "shadow-glow-amber", bg: "bg-neon-amber/5" },
  };
  const t = toneMap[tone];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 ${t.bg} p-5 backdrop-blur-md transition-shadow hover:${t.glow}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className={`mb-3 inline-flex items-center gap-1.5 text-xs font-medium ${t.text}`}>
        {icon}
        <span className="uppercase tracking-wider">{label}</span>
      </div>
      <div className={`font-display text-3xl font-bold leading-none text-white md:text-4xl`}>
        <span className={t.text}>{accent}</span>
        <AnimatedNumber value={value} decimals={decimals} suffix={suffix} />
      </div>
    </motion.div>
  );
}
