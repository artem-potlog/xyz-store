import { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Section } from "./Section";
import { SOURCES } from "../data/caseData";

export function Sources() {
  const [filter, setFilter] = useState<"all" | "PDF" | "Open">("all");
  const filtered = SOURCES.filter(
    (s) => filter === "all" || s.type.startsWith(filter)
  );

  return (
    <Section
      id="sources"
      eyebrow="Источники и метаинформация"
      title="13 источников"
      intro="5 отраслевых PDF (включая OCR Альфа-Банка через RapidOCR) + 8 открытых источников. Все ключевые цифры независимо проверены через автономную Excel-модель."
    >
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-white">
            Источники
          </h3>
          <div className="flex gap-1.5">
            {(["all", "PDF", "Open"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {f === "all" ? "Все" : f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {filtered.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-all hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-sm font-medium text-white">
                      {s.name}
                    </span>
                    <span
                      className={`chip ${
                        s.type.startsWith("PDF")
                          ? "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan"
                          : "border-white/15 bg-white/[0.04] text-slate-400"
                      }`}
                    >
                      {s.type}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{s.use}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
