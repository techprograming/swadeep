"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface StatsCounterProps {
  /** Target numeric value to count up to */
  value: number;
  /** Primary label displayed below or beside the counter */
  label: string;
  /** Optional Gujarati translated label */
  labelGu?: string;
  /** Suffix symbol like "+", "%", "k" */
  suffix?: string;
  /** Prefix symbol like "₹", "$" */
  prefix?: string;
  /** Duration of counting animation in milliseconds (defaults to 2000ms) */
  duration?: number;
  /** Optional icon shown above or alongside the number */
  icon?: React.ReactNode;
  /** Orientation / layout format */
  layout?: "vertical" | "horizontal";
  /** Custom extra styling classes for container */
  className?: string;
  /** Custom styling classes for the number */
  numberClassName?: string;
  /** Custom styling classes for the label */
  labelClassName?: string;
}

/**
 * Easing function: easeOutExpo for natural, decelerating count-up motion
 */
function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

/**
 * StatsCounter: Smooth counting animation triggered on viewport intersection.
 */
export const StatsCounter: React.FC<StatsCounterProps> = ({
  value,
  label,
  labelGu,
  suffix = "+",
  prefix = "",
  duration = 2000,
  icon,
  layout = "vertical",
  className,
  numberClassName,
  labelClassName,
}) => {
  const [count, setCount] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const currentVal = Math.round(easedProgress * value);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasStarted, value, duration]);

  // Format count with Indian locale grouping (e.g. 15,000)
  const formattedCount = count.toLocaleString("en-IN");
  const fullAccessibleLabel = `${prefix}${value}${suffix} ${label}${labelGu ? ` (${labelGu})` : ""}`;

  return (
    <div
      ref={elementRef}
      className={cn(
        "group flex transition-all duration-300",
        layout === "vertical"
          ? "flex-col items-center text-center p-6 rounded-2xl bg-cream-dark/60 border border-forest/5 shadow-sm hover:shadow-md hover:bg-cream-dark"
          : "flex-row items-center gap-4 text-left p-4 rounded-xl",
        className
      )}
      role="status"
      aria-label={fullAccessibleLabel}
    >
      {/* Optional Icon */}
      {icon && (
        <div
          className={cn(
            "text-saffron shrink-0 inline-flex items-center justify-center rounded-xl bg-saffron-50 text-2xl p-3 border border-saffron-100/50 mb-3 group-hover:scale-110 transition-transform duration-300",
            layout === "horizontal" && "mb-0"
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {/* Numerical Counter */}
      <div className="flex flex-col">
        <div
          className={cn(
            "font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-forest tracking-tight flex items-center justify-center gap-0.5",
            layout === "horizontal" && "justify-start",
            numberClassName
          )}
        >
          {prefix && <span className="text-saffron font-bold text-2xl sm:text-3xl mr-0.5">{prefix}</span>}
          <span>{formattedCount}</span>
          {suffix && (
            <span className="text-saffron font-bold text-2xl sm:text-3xl ml-0.5" aria-hidden="true">
              {suffix}
            </span>
          )}
        </div>

        {/* Labels (English + Gujarati) */}
        <div className="mt-2.5 space-y-1">
          <p
            className={cn(
              "font-heading font-bold text-charcoal/95 text-base sm:text-lg",
              labelClassName
            )}
          >
            {label}
          </p>
          {labelGu && (
            <p className="font-gujarati text-forest/90 text-sm sm:text-base font-semibold">
              {labelGu}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
