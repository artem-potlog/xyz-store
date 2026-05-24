import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
} from "recharts";
import { Section } from "./Section";
import { PEERS } from "../data/caseData";

type PeerDatum = {
  name: string;
  short: string;
  area: number;
  density: number;
  gm: number | null;
  ebitda: number | null;
  ebitdaSize: number;
  group: "pilot" | "benchmark" | "peer";
};

function PeerTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: PeerDatum }> }) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/10 bg-ink-800/95 px-3 py-2 text-xs backdrop-blur">
      <div className="font-semibold text-white">{d.name}</div>
      <div className="num mt-1 text-slate-300">
        {d.area} м² · {d.density} тыс. ₽/м²
      </div>
      {d.ebitda !== null && (
        <div className="num text-slate-400">EBITDA {d.ebitda}%</div>
      )}
      {d.gm !== null && <div className="num text-slate-400">GM {d.gm}%</div>}
    </div>
  );
}

const COLOR = {
  pilot: "#5eead4",
  benchmark: "#a78bfa",
  peer: "#475569",
};

// Plot only entries with a known density value.
// Bubble size encodes EBITDA margin; null EBITDA defaults to 6 (mid-range).
const PLOTTABLE: PeerDatum[] = PEERS.filter((p) => p.density !== null).map(
  (p) => ({
    ...(p as Omit<PeerDatum, "ebitdaSize">),
    ebitdaSize: p.ebitda ?? 6,
  })
);

// Custom shape: draws the bubble + a short label above it.
function PeerBubble(props: any) {
  const { cx, cy, payload } = props as { cx: number; cy: number; payload: PeerDatum };
  if (cx == null || cy == null) return null;
  const r = Math.max(6, Math.min(24, payload.ebitdaSize * 2.4));
  const fill = COLOR[payload.group];
  const isPilot = payload.group === "pilot";
  const isBench = payload.group === "benchmark";
  const labelColor = isPilot ? "#5eead4" : isBench ? "#a78bfa" : "#cbd5e1";
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        fillOpacity={isPilot ? 0.85 : 0.65}
        stroke={isPilot ? "#fff" : isBench ? "#a78bfa" : "transparent"}
        strokeWidth={isPilot ? 1.5 : isBench ? 1 : 0}
      />
      <text
        x={cx}
        y={cy - r - 6}
        textAnchor="middle"
        fontSize={11}
        fontWeight={isPilot ? 700 : isBench ? 600 : 500}
        fill={labelColor}
        style={{ paintOrder: "stroke", stroke: "rgba(5,7,13,0.9)", strokeWidth: 3, strokeLinejoin: "round" }}
      >
        {payload.short}
      </text>
    </g>
  );
}

export function Peers() {
  return (
    <Section
      id="peers"
      eyebrow="Peer benchmark"
      title="Пилот vs публичные ритейлеры"
      intro="Лента - контрольный бенчмарк для Company XYZ. EBITDA margin Y5 пилота (8,1%) совпадает с Лентой Q4'24; плотность продаж - выше группы и Монетки за счёт компактного формата и доли готовой еды."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="card lg:col-span-7">
          <h3 className="font-display text-lg font-semibold text-white">
            Плотность продаж × Площадь магазина
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Bubble size = EBITDA margin. Пилот <span className="text-neon-green">●</span>, бенчмарк (Лента) <span className="text-neon-violet">●</span>, прочие <span className="text-slate-400">●</span>.
          </p>

          <div className="mt-6 h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 30, right: 30, bottom: 30, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  type="number"
                  dataKey="area"
                  name="Площадь"
                  unit=" м²"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  label={{ value: "Площадь, м²", position: "insideBottom", offset: -10, fill: "#64748b", fontSize: 11 }}
                  scale="log"
                  domain={[100, 8000]}
                />
                <YAxis
                  type="number"
                  dataKey="density"
                  name="Плотность"
                  unit=" тыс. ₽/м²"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  label={{ value: "Плотность, тыс. ₽/м²/год", angle: -90, position: "insideLeft", fill: "#64748b", fontSize: 11 }}
                  domain={[200, 800]}
                />
                <ZAxis dataKey="ebitdaSize" range={[100, 600]} name="EBITDA" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.15)" }}
                  content={<PeerTooltip />}
                />
                <Scatter
                  data={PLOTTABLE}
                  shape={<PeerBubble />}
                  isAnimationActive
                  animationDuration={1200}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card lg:col-span-5">
          <h3 className="font-display text-lg font-semibold text-white">Таблица сравнения</h3>
          <p className="mt-1 text-sm text-slate-400">
            EBITDA margin, GM и плотность ключевых форматов.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-xs">
              <thead className="bg-white/[0.03]">
                <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500">
                  <th className="px-3 py-2.5">Игрок</th>
                  <th className="px-3 py-2.5 text-right">Площ.</th>
                  <th className="px-3 py-2.5 text-right">GM</th>
                  <th className="px-3 py-2.5 text-right">EBITDA</th>
                </tr>
              </thead>
              <tbody>
                {PEERS.map((p, i) => {
                  const isPilot = p.group === "pilot";
                  const isBenchmark = p.group === "benchmark";
                  return (
                    <motion.tr
                      key={p.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className={`border-t border-white/5 ${
                        isPilot
                          ? "bg-neon-green/[0.08]"
                          : isBenchmark
                          ? "bg-neon-violet/[0.06]"
                          : ""
                      }`}
                    >
                      <td className="px-3 py-2.5">
                        <div
                          className={`text-xs ${
                            isPilot
                              ? "font-semibold text-neon-green"
                              : isBenchmark
                              ? "font-semibold text-neon-violet"
                              : "text-slate-300"
                          }`}
                        >
                          {p.name}
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-right num text-slate-300">{p.area}</td>
                      <td className="px-3 py-2.5 text-right num text-slate-300">
                        {p.gm !== null ? `${p.gm}%` : "-"}
                      </td>
                      <td className="px-3 py-2.5 text-right num text-slate-300">
                        {p.ebitda !== null ? `${p.ebitda}%` : "-"}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-2 text-xs">
            <div className="rounded-xl border border-neon-green/30 bg-neon-green/[0.06] p-3">
              <strong className="text-neon-green">Вывод 1:</strong> EBITDA Y5 пилота = Ленте Q4'24 (8,1%) - peer-parity.
            </div>
            <div className="rounded-xl border border-neon-cyan/30 bg-neon-cyan/[0.06] p-3">
              <strong className="text-neon-cyan">Вывод 2:</strong> Плотность 513–705 тыс. ₽/м² &gt; Ленты-группы и Монетки.
            </div>
            <div className="rounded-xl border border-neon-violet/30 bg-neon-violet/[0.06] p-3">
              <strong className="text-neon-violet">Вывод 3:</strong> GM +5 п.п. к Ленте - премия за Fresh + СТМ.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
