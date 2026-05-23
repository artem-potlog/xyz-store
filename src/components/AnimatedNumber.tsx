import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  value: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

// Easing-based counter that animates only when the element comes into view.
export function AnimatedNumber({
  value,
  decimals = 0,
  duration = 1400,
  prefix = "",
  suffix = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const from = 0;
    const to = value;
    let raf = 0;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(from + (to - from) * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const formatted = Math.abs(display).toLocaleString("ru-RU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const sign = display < 0 ? "−" : "";

  return (
    <span ref={ref} className={className}>
      {sign}
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
