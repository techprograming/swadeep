"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

interface ReviewItem {
  id?: string;
  name: string;
  role: string;
  category?: string;
  quote: string;
  rating?: number;
  image?: string;
  created_at?: string;
}

export default function Testimonials() {
  const { isGujarati } = useLanguage();
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([...TESTIMONIALS]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Fetch verified reviews on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
            if (isMounted) {
              const loadedReviews: ReviewItem[] = data.reviews
                .filter((r: any) => r.category !== "Swadeep Staff" && !String(r.category || "").toLowerCase().includes("staff"))
                .map((r: any) => ({
                  id: r.id,
                  name: r.name,
                  role: r.role || "Institutional Partner",
                  category: r.category || "Partner Feedback",
                  quote: r.quote,
                  rating: r.rating || 5,
                  image: r.image,
                  created_at: r.created_at,
                }));

              const existingQuotes = new Set(loadedReviews.map((u) => u.quote));
              const remainingSeed = TESTIMONIALS.filter((t) => !existingQuotes.has(t.quote));
              setReviewsList([...loadedReviews, ...remainingSeed]);
            }
          }
        }
      } catch (err) {
        console.warn("[Testimonials] Using static seed:", err);
      }
    }

    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const total = reviewsList.length;

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

  const currentTestimonial = reviewsList[currentIndex] || reviewsList[0] || TESTIMONIALS[0];

  return (
    <section
      className="section-padding py-16 sm:py-20 lg:py-24 bg-cream-dark/50 relative overflow-hidden border-b border-forest/10"
      aria-label="What They Say About Us"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container-wide relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-saffron-100 text-saffron-dark px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>SWADEEP SHIKSHAN VIKAS SANSTHA</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark tracking-tight leading-tight">
            {"Partner & Institutional Testimonials"}
          </h2>

          
        </div>

        {/* Carousel Card */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-forest/10 transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-3.5 py-1 rounded-full bg-forest-50 text-forest border border-forest/10">
                {currentTestimonial.category || "Partner Feedback"}
              </span>

              {/* Star Rating Display */}
              <div className="flex items-center text-amber-400 text-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= (currentTestimonial.rating || 5)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300 fill-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="flex gap-1.5 text-xs text-charcoal/60 font-semibold">
              {currentIndex + 1} / {total}
            </div>
          </div>

          {/* Quote Text */}
          <blockquote className="space-y-4">
            <p className="font-body text-charcoal/90 text-sm sm:text-base lg:text-lg italic leading-relaxed">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </p>

            <footer className="pt-6 border-t border-cream-dark flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4">
                {currentTestimonial.image && (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-forest/5 border-2 border-[#F47B2A]/40 shrink-0 relative shadow-sm">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                )}
                <div>
                  <cite className="not-italic font-heading font-extrabold text-base sm:text-xl text-forest-dark block">
                    {currentTestimonial.name}
                  </cite>
                  <span className="font-body text-xs sm:text-sm text-charcoal/70 block mt-0.5">
                    {currentTestimonial.role}
                  </span>
                </div>
              </div>
            </footer>
          </blockquote>

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto max-w-[60%] py-1">
              {reviewsList.slice(0, 10).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F47B2A] ${
                    idx === currentIndex
                      ? "w-8 bg-[#F47B2A]"
                      : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-current={idx === currentIndex ? "true" : undefined}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={goToPrev}
                className="p-2 sm:p-2.5 rounded-full border border-forest/15 hover:border-forest hover:bg-forest hover:text-white transition-all text-forest-dark focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="p-2 sm:p-2.5 rounded-full border border-forest/15 hover:border-forest hover:bg-forest hover:text-white transition-all text-forest-dark focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
