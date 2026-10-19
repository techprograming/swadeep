"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type AnimationType =
  | "fade-in"
  | "slide-up"
  | "slide-left"
  | "slide-right"
  | "zoom-in";

export interface AnimatedSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Type of entrance animation */
  animation?: AnimationType;
  /** Staggering delay in milliseconds */
  delay?: number;
  /** Duration of transition in milliseconds (defaults to 650ms) */
  duration?: number;
  /** Intersection threshold from 0 to 1 (defaults to 0.15) */
  threshold?: number;
  /** Intersection rootMargin (defaults to '0px 0px -50px 0px') */
  rootMargin?: string;
  /** Whether the animation triggers only once or every time it enters view */
  triggerOnce?: boolean;
  /** Semantic HTML wrapper element (section, div, article, etc.) */
  as?: React.ElementType;
  /** Content to animate */
  children: React.ReactNode;
}

/**
 * AnimatedSection: Scroll-triggered animation wrapper using IntersectionObserver.
 * Supports fade-in, slide-up, slide-left, slide-right, and zoom-in with custom delay and threshold.
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  animation = "slide-up",
  delay = 0,
  duration = 650,
  threshold = 0.15,
  rootMargin = "0px 0px -50px 0px",
  triggerOnce = true,
  as: Component = "section",
  className,
  style,
  children,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Initial hidden state styles per animation type
  const getInitialTransformClass = () => {
    switch (animation) {
      case "slide-up":
        return "translate-y-8";
      case "slide-left":
        return "-translate-x-8";
      case "slide-right":
        return "translate-x-8";
      case "zoom-in":
        return "scale-95";
      case "fade-in":
      default:
        return "translate-y-0";
    }
  };

  const hiddenState = !isVisible;

  return (
    <Component
      ref={elementRef}
      className={cn(
        "transition-all ease-out will-change-[opacity,transform]",
        hiddenState
          ? cn("opacity-0 pointer-events-none", getInitialTransformClass())
          : "opacity-100 translate-y-0 translate-x-0 scale-100 pointer-events-auto",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default AnimatedSection;
