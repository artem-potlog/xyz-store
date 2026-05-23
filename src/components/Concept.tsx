import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  MapPin,
  Coffee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Section } from "./Section";

type Shot = {
  src: string;
  short: string;
  title: string;
  caption: string;
  chips: { icon: React.ReactNode; label: string }[];
};

const SHOTS: Shot[] = [
  {
    src: "concept/exterior-day.png",
    short: "День",
    title: "Витрина · день",
    caption:
      "180 м² встройка в плотном жилом квартале. Большая стеклянная фасадная линия и узкая теневая зона входа — формат \u00abу дома\u00bb, а не дискаунтер.",
    chips: [
      { icon: <MapPin className="h-3 w-3" />, label: "СПб · жилая улица" },
      { icon: <Camera className="h-3 w-3" />, label: "Дневной свет" },
    ],
  },
  {
    src: "concept/exterior-night.png",
    short: "Ночь",
    title: "Витрина · ночь / зима",
    caption:
      "Тёплый свет изнутри работает как маяк в плотной застройке. Длинная стеклянная линия — фронтальная демонстрация фреша и кулинарии прохожим.",
    chips: [
      { icon: <MapPin className="h-3 w-3" />, label: "Плотный жилой район" },
      { icon: <Camera className="h-3 w-3" />, label: "Blue hour" },
    ],
  },
  {
    src: "concept/interior-cafe.png",
    short: "Кафе",
    title: "Зона кулинарии и кофе",
    caption:
      "Сердце концепции: горячая витрина, пельмени-блины-пирожки, барная стойка у окна. Категория \u00abFresh + готовая еда\u00bb даёт 33% оборота и GM 32% — главная премия модели.",
    chips: [
      { icon: <Coffee className="h-3 w-3" />, label: "Готовая еда · Кофе" },
      { icon: <Camera className="h-3 w-3" />, label: "Тёплый интерьер" },
    ],
  },
];

export function Concept() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (i: number) => {
    if (i === active) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };
  const next = () => goTo((active + 1) % SHOTS.length);
  const prev = () => goTo((active - 1 + SHOTS.length) % SHOTS.length);

  return (
    <Section
      id="concept"
      eyebrow="Концепция формата · визуализации"
      title="Как выглядит магазин"
      intro="Компактный 180 м², акцент на стеклянный фасад и витрину фреша / кулинарии. Кликни миниатюры или стрелки — кадр сменится с плавным crossfade."
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-5xl"
      >
        {/* ambient glow behind the frame */}
        <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-neon-green/[0.04] blur-3xl" />

        <div className="relative aspect-[16/10] max-h-[64vh] overflow-hidden rounded-3xl border border-white/10 bg-ink-800 shadow-card">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={SHOTS[active].src}
              src={SHOTS[active].src}
              alt={SHOTS[active].title}
              initial={{ opacity: 0, scale: 1.08, x: direction * 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.02, x: direction * -40 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>

          {/* legibility gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-900/95 via-ink-900/40 to-transparent" />

          {/* counter */}
          <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-900/60 px-3 py-1 text-xs text-white backdrop-blur">
            <span className="num font-display tabular-nums text-white">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="text-slate-500">/</span>
            <span className="num tabular-nums text-slate-400">
              {String(SHOTS.length).padStart(2, "0")}
            </span>
          </div>

          {/* nav arrows */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="group absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink-900/40 text-white opacity-70 backdrop-blur transition hover:bg-ink-900/70 hover:opacity-100 md:left-4 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="group absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink-900/40 text-white opacity-70 backdrop-blur transition hover:bg-ink-900/70 hover:opacity-100 md:right-4 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* in-image caption */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex flex-wrap gap-1.5">
                  {SHOTS[active].chips.map((c) => (
                    <span
                      key={c.label}
                      className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-ink-900/60 px-2 py-0.5 text-[10px] font-medium text-slate-200 backdrop-blur"
                    >
                      {c.icon}
                      {c.label}
                    </span>
                  ))}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-white drop-shadow md:text-3xl">
                  {SHOTS[active].title}
                </h3>
                <p className="mt-1 hidden max-w-2xl text-sm text-slate-300/95 md:block md:text-[15px]">
                  {SHOTS[active].caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 md:mt-6 md:gap-3">
          {SHOTS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.src}
                onClick={() => goTo(i)}
                className={`group relative h-14 w-24 overflow-hidden rounded-xl border transition-all duration-300 md:h-16 md:w-28 ${
                  isActive
                    ? "border-neon-green/60 ring-2 ring-neon-green/40 ring-offset-2 ring-offset-ink-900 scale-105 shadow-glow"
                    : "border-white/10 opacity-55 hover:opacity-100 hover:border-white/30 hover:scale-[1.03]"
                }`}
              >
                <img
                  src={s.src}
                  alt={s.short}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/30 to-transparent" />
                <div
                  className={`absolute bottom-1 left-1.5 right-1.5 text-left text-[9px] font-semibold uppercase tracking-[0.12em] ${
                    isActive ? "text-neon-green" : "text-white/90"
                  }`}
                >
                  0{i + 1} · {s.short}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}
