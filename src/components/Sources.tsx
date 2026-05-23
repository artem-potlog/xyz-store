import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, ChevronDown, History, Bot } from "lucide-react";
import { Section } from "./Section";
import { SOURCES, ITERATIONS } from "../data/caseData";

export function Sources() {
  const [filter, setFilter] = useState<"all" | "PDF" | "Open">("all");
  const filtered = SOURCES.filter((s) => filter === "all" || s.type.startsWith(filter));
  const [openIter, setOpenIter] = useState<number | null>(null);

  return (
    <Section
      id="sources"
      eyebrow="Источники и метаинформация"
      title="13 источников · 8 итераций · ИИ"
      intro="5 отраслевых PDF (включая OCR Альфа-Банка через RapidOCR) + 8 открытых источников. Все ключевые цифры независимо проверены через автономную Excel-модель."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Sources */}
        <div className="lg:col-span-7">
          <div className="card">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-white">Источники</h3>
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

            <div className="mt-4 space-y-2">
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
                        <span className="text-sm font-medium text-white">{s.name}</span>
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
        </div>

        {/* AI disclosure + iterations */}
        <div className="space-y-6 lg:col-span-5">
          <div className="card">
            <div className="flex items-center gap-2 text-neon-violet">
              <Bot className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Применение ИИ
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-white">
              Claude (Anthropic) через Cursor IDE
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li className="flex gap-2">
                <span className="text-neon-green">✓</span>
                Извлечение и синтез текста из 5 PDF + 8 открытых источников
              </li>
              <li className="flex gap-2">
                <span className="text-neon-green">✓</span>
                OCR Альфа-Банка (RapidOCR ONNX, поддержка русского)
              </li>
              <li className="flex gap-2">
                <span className="text-neon-green">✓</span>
                Адаптация механик из grocery template, калибровка под РФ
              </li>
              <li className="flex gap-2">
                <span className="text-neon-green">✓</span>
                Кодирование 5Y модели: NPV, IRR, DPP, чувствительность, сценарии
              </li>
              <li className="flex gap-2 pt-2">
                <span className="text-neon-rose">✗</span>
                <span className="text-slate-500">Не подтверждал авторизованные данные</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neon-rose">✗</span>
                <span className="text-slate-500">Не делал интервью с участниками рынка</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 text-neon-amber">
              <History className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                История работы · 8 итераций
              </span>
            </div>

            <div className="mt-3 space-y-1.5">
              {ITERATIONS.map((it) => (
                <button
                  key={it.n}
                  onClick={() => setOpenIter(openIter === it.n ? null : it.n)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left transition-colors hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-3">
                    <span className="num inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-ink-800 text-xs font-semibold text-neon-amber">
                      {it.n}
                    </span>
                    <span className="flex-1 text-sm font-medium text-white">
                      {it.title}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition-transform ${
                        openIter === it.n ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {openIter === it.n && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pl-10 text-xs text-slate-400">{it.note}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
