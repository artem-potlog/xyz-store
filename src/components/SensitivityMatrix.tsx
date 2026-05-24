import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./Section";
import {
  SENSITIVITY_NPV,
  SENSITIVITY_GM_AXIS,
  SENSITIVITY_REVENUE_AXIS,
} from "../data/caseData";

// Map an NPV value (mln ₽) → background color via piecewise gradient.
function npvColor(v: number, min: number, max: number) {
  if (v >= 0) {
    const t = Math.min(1, v / Math.max(max, 1));
    // teal-cyan range
    const start = [16, 47, 56];  // dark teal
    const end = [94, 234, 212];  // neon-green
    return mix(start, end, t);
  } else {
    const t = Math.min(1, -v / Math.max(-min, 1));
    const start = [42, 16, 32];  // dark rose
    const end = [251, 113, 133]; // neon-rose
    return mix(start, end, t);
  }
}

function mix(a: number[], b: number[], t: number) {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

export function SensitivityMatrix() {
  const [hover, setHover] = useState<{ row: number; col: number } | null>(null);

  const flat = SENSITIVITY_NPV.flat();
  const min = Math.min(...flat);
  const max = Math.max(...flat);

  const hoveredValue = hover ? SENSITIVITY_NPV[hover.row][hover.col] : null;
  const hoveredGm = hover ? SENSITIVITY_GM_AXIS[hover.row] : null;
  const hoveredRev = hover ? SENSITIVITY_REVENUE_AXIS[hover.col] : null;

  return (
    <Section
      id="sensitivity"
      eyebrow="2-факторная чувствительность"
      title="Матрица NPV: выручка × валовая маржа"
      intro="Двумерная стресс-карта 7×7. Колонки - мультипликатор выручки ×0,85 ÷ ×1,15. Строки - сдвиг GM в п.п. от базы 27,0%. Кликни/наведи на ячейку, чтобы прочитать сочетание."
    >
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-separate border-spacing-1.5">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    GM \ Выручка
                  </th>
                  {SENSITIVITY_REVENUE_AXIS.map((r, i) => (
                    <th
                      key={r}
                      className={`text-center text-xs font-medium ${
                        hover?.col === i ? "text-white" : "text-slate-400"
                      } transition-colors`}
                    >
                      ×{r.toFixed(2)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SENSITIVITY_NPV.map((row, i) => (
                  <tr key={i}>
                    <th
                      className={`text-right text-xs font-medium ${
                        hover?.row === i ? "text-white" : "text-slate-400"
                      } transition-colors`}
                    >
                      GM {SENSITIVITY_GM_AXIS[i] >= 0 ? "+" : ""}
                      {SENSITIVITY_GM_AXIS[i].toFixed(1)} п.п.
                    </th>
                    {row.map((v, j) => {
                      const bg = npvColor(v, min, max);
                      const isHover = hover?.row === i && hover?.col === j;
                      const opacity =
                        hover && !isHover && (hover.row === i || hover.col === j)
                          ? 0.85
                          : hover && !isHover
                          ? 0.4
                          : 1;
                      return (
                        <td key={j}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.35,
                              delay: (i + j) * 0.04,
                              ease: "easeOut",
                            }}
                            onMouseEnter={() => setHover({ row: i, col: j })}
                            onMouseLeave={() => setHover(null)}
                            className={`relative flex h-14 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                              isHover
                                ? "ring-2 ring-white shadow-glow scale-110 z-10"
                                : ""
                            }`}
                            style={{
                              background: bg,
                              color: v >= 0 ? "#031312" : "#3f0a14",
                              opacity,
                            }}
                          >
                            <span className="num">
                              {v > 0 ? "+" : ""}
                              {v}
                            </span>
                          </motion.div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
              <span className="text-slate-400">Шкала NPV, млн ₽:</span>
              <span className="inline-block h-3 w-32 rounded bg-gradient-to-r from-neon-rose via-slate-500/40 to-neon-green" />
              <span className="num text-neon-rose">{min}</span>
              <span className="num text-slate-400">0</span>
              <span className="num text-neon-green">+{max}</span>
            </div>
          </div>

          <div className="w-full shrink-0 lg:w-72">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">
                {hover ? "Сочетание шоков" : "База"}
              </div>
              {hover && hoveredValue !== null ? (
                <>
                  <div className="num mt-2 font-display text-xs text-slate-300">
                    Выручка × {hoveredRev?.toFixed(2)} · GM {hoveredGm! >= 0 ? "+" : ""}
                    {hoveredGm?.toFixed(1)} п.п.
                  </div>
                  <div
                    className={`num mt-2 font-display text-4xl font-bold ${
                      hoveredValue >= 0 ? "text-neon-green" : "text-neon-rose"
                    }`}
                  >
                    {hoveredValue > 0 ? "+" : ""}
                    {hoveredValue}
                    <span className="text-base text-slate-400"> млн ₽</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="num mt-2 font-display text-xs text-slate-300">
                    Выручка × 1,00 · GM +0,0 п.п.
                  </div>
                  <div className="num mt-2 font-display text-4xl font-bold text-neon-green">
                    +26,4<span className="text-base text-slate-400"> млн ₽</span>
                  </div>
                </>
              )}

              <div className="my-4 divider" />

              <div className="text-xs text-slate-400">
                <strong className="text-white">Наблюдение:</strong> пилот выдерживает{" "}
                <span className="text-neon-green">одиночный</span> умеренный шок (−5%
                выручки <em>или</em> −0,5 п.п. GM), но не выдерживает{" "}
                <span className="text-neon-rose">двойного</span> (−10% × −1,5 п.п.).
                Отсюда жёсткие go/no-go пороги.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
