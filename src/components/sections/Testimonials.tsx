"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const total = TESTIMONIALS.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      goToNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
    touchStartXRef.current = null;
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      className="section-padding py-20 lg:py-24 bg-cream-dark/50 relative overflow-hidden border-b border-forest/10"
      aria-label="What They Say About Us"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container-wide relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-saffron-100 text-saffron-dark px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>SWADEEP SHIKSHAN VIKAS SANSTHA</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark tracking-tight">
            What They Say About Us
          </h2>

          <p className="font-gujarati text-lg text-forest font-medium">
            અમારા ભાગીદારો અને સાથી કાર્યકરોના પ્રત્યક્ષ અનુભવો
          </p>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase font-bold tracking-wider px-3.5 py-1 rounded-full bg-forest-50 text-forest border border-forest/10">
              {currentTestimonial.category}
            </span>
            <div className="flex gap-1.5 text-xs text-charcoal/60">
              {currentIndex + 1} / {total}
            </div>
          </div>

          {/* Quote Text */}
          <blockquote className="space-y-4">
            <p className="font-body text-charcoal/90 text-base sm:text-lg lg:text-xl italic leading-relaxed">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </p>

            <footer className="pt-6 border-t border-cream-dark flex items-center justify-between">
              <div>
                <cite className="not-italic font-heading font-extrabold text-xl text-forest-dark block">
                  {currentTestimonial.name}
                </cite>
                <span className="font-body text-sm text-charcoal/70 block mt-0.5">
                  {currentTestimonial.role}
                </span>
              </div>
            </footer>
          </blockquote>

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-8 bg-saffron" : "w-2.5 bg-charcoal/20 hover:bg-charcoal/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={goToPrev}
                className="w-10 h-10 rounded-full bg-cream hover:bg-forest text-forest-dark hover:text-white border border-forest/15 flex items-center justify-center transition-colors"
                aria-label="Previous quote"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="w-10 h-10 rounded-full bg-cream hover:bg-forest text-forest-dark hover:text-white border border-forest/15 flex items-center justify-center transition-colors"
                aria-label="Next quote"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
