import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  tone?: "default" | "warm";
};

export function Section({ id, eyebrow, title, intro, children, tone = "default" }: Props) {
  return (
    <section id={id} className="relative scroll-mt-24 py-10 md:py-14">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 max-w-3xl"
        >
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-glow" />
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
            {typeof title === "string" ? (
              <span className={tone === "warm" ? "text-gradient-warm" : "text-gradient"}>{title}</span>
            ) : (
              title
            )}
          </h2>
          {intro && (
            <p className="mt-5 text-base leading-relaxed text-slate-400 md:text-lg">{intro}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
