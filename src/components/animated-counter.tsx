"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  targetValue: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
};

export function AnimatedCounter({
  targetValue,
  duration = 2000,
  className,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = targetValue;
          if (start === end) return;

          const incrementTime = (duration / end) * 1;
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
          }, incrementTime);
            
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [targetValue, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{Math.ceil(count).toLocaleString()}{suffix}
    </span>
  );
}
