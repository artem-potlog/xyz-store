export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/[0.06] bg-ink-900/60 py-10 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="font-display text-sm font-semibold text-white">
              Severgroup XYZ · Пилот продуктового ритейла в Санкт-Петербурге
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Интерактивная версия аналитической записки и приложения.
              Все ключевые цифры — в Excel-модели (15 листов) и Приложении 1
              (11 глав).
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="chip border-white/10 bg-white/[0.03] text-slate-400">
              WACC 20%
            </span>
            <span className="chip border-white/10 bg-white/[0.03] text-slate-400">
              Налог 25%
            </span>
            <span className="chip border-white/10 bg-white/[0.03] text-slate-400">
              5-летний горизонт
            </span>
            <span className="chip border-neon-green/30 bg-neon-green/[0.06] text-neon-green">
              NPV +8,5 млн ₽
            </span>
          </div>
        </div>
        <div className="mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-slate-600">
          Built with React · Vite · Tailwind · Framer Motion · Recharts
        </div>
      </div>
    </footer>
  );
}
