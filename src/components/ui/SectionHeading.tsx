"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  /** Main heading title */
  title: React.ReactNode;
  /** Subtitle or supporting description */
  subtitle?: React.ReactNode;
  /** Optional Gujarati text (title or contextual phrase) */
  gujaratiText?: string;
  /** Optional pill or category badge placed above heading */
  badge?: string;
  /** Text and element alignment */
  align?: "left" | "center";
  /** Whether to show the decorative saffron accent line */
  showAccent?: boolean;
  /** HTML heading level tag to render */
  as?: "h1" | "h2" | "h3" | "h4";
  /** Whether to trigger entrance scroll animation */
  animate?: boolean;
  /** Container wrapper extra classes */
  className?: string;
  /** Main heading extra classes */
  titleClassName?: string;
  /** Subtitle extra classes */
  subtitleClassName?: string;
  /** Gujarati text extra classes */
  gujaratiClassName?: string;
  /** Accent line extra classes */
  accentClassName?: string;
}

/**
 * Reusable SectionHeading component with Gujarati support, alignment options,
 * decorative saffron accent line, and scroll-triggered entrance animation.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  gujaratiText,
  badge,
  align = "center",
  showAccent = true,
  as: Component = "h2",
  animate = true,
  className,
  titleClassName,
  subtitleClassName,
  gujaratiClassName,
  accentClassName,
}) => {
  const [isVisible, setIsVisible] = useState(!animate);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;

    const currentRef = headingRef.current;
    if (!currentRef) return;

    // Use Intersection Observer for smooth entrance animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [animate]);

  const isCenter = align === "center";

  return (
    <div
      ref={headingRef}
      className={cn(
        "w-full transition-all duration-700 ease-out",
        animate && !isVisible
          ? "opacity-0 translate-y-6"
          : "opacity-100 translate-y-0",
        isCenter ? "text-center items-center flex flex-col" : "text-left items-start flex flex-col",
        className
      )}
    >
      {/* Optional Badge */}
      {badge && (
        <span className="inline-flex items-center px-3.5 py-1 mb-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-forest-50 text-forest border border-forest-100 shadow-sm">
          {badge}
        </span>
      )}

      {/* Optional Gujarati Sub-heading */}
      {gujaratiText && (
        <span
          className={cn(
            "font-gujarati text-saffron text-sm sm:text-base font-semibold tracking-wide mb-1.5 block",
            gujaratiClassName
          )}
        >
          {gujaratiText}
        </span>
      )}

      {/* Main Heading */}
      <Component
        className={cn(
          "font-heading font-bold text-forest tracking-tight",
          Component === "h1" && "text-3xl sm:text-5xl lg:text-6xl leading-[1.15]",
          Component === "h2" && "text-2xl sm:text-4xl lg:text-5xl leading-tight",
          Component === "h3" && "text-xl sm:text-3xl lg:text-4xl leading-snug",
          Component === "h4" && "text-lg sm:text-2xl lg:text-3xl leading-snug",
          titleClassName
        )}
      >
        {title}
      </Component>

      {/* Decorative Saffron Accent Line */}
      {showAccent && (
        <div
          className={cn(
            "flex items-center gap-1.5 my-3.5",
            isCenter ? "justify-center" : "justify-start",
            accentClassName
          )}
          aria-hidden="true"
        >
          {isCenter && <div className="h-1 w-2 rounded-full bg-saffron-300" />}
          <div className="h-1 w-16 sm:w-20 rounded-full bg-saffron" />
          <div className="h-1 w-2 rounded-full bg-saffron-300" />
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            "font-body text-charcoal/80 text-base sm:text-lg leading-relaxed mt-1",
            isCenter ? "max-w-2xl mx-auto" : "max-w-2xl",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
