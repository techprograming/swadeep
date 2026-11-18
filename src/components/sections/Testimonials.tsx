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

  // Review Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("Community Member");
  const [quote, setQuote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Fetch reviews on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
            if (isMounted) {
              // Combine user reviews at the beginning with initial static testimonials
              const loadedReviews: ReviewItem[] = data.reviews
                .filter((r: any) => r.category !== 'Swadeep Staff' && !String(r.category || '').toLowerCase().includes('staff'))
                .map((r: any) => ({
                id: r.id,
                name: r.name,
                role: r.role || "Community Supporter",
                category: r.category || "Community Review",
                quote: r.quote,
                rating: r.rating || 5,
                image: r.image,
                created_at: r.created_at,
              }));

              // Deduplicate if already present
              const existingQuotes = new Set(loadedReviews.map((u) => u.quote));
              const remainingSeed = TESTIMONIALS.filter((t) => !existingQuotes.has(t.quote));
              setReviewsList([...loadedReviews, ...remainingSeed]);
            }
          }
        }
      } catch (err) {
        console.warn("[Testimonials] Could not fetch remote reviews, using local seed:", err);
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
    if (isPaused || isModalOpen) return;
    const timer = setInterval(() => {
      goToNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, isModalOpen, goToNext]);

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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) {
      setSubmitFeedback({
        type: "error",
        message: isGujarati ? "કૃપા કરીને તમારું નામ અને સમીક્ષા લખો." : "Please fill in your name and review.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitFeedback(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          role: role.trim() || (isGujarati ? "શુભેચ્છક" : "Well Wisher"),
          rating,
          category,
          quote: quote.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const newReviewItem: ReviewItem = data.review || {
          id: `rev-${Date.now()}`,
          name: name.trim(),
          role: role.trim() || "Well Wisher",
          rating,
          category,
          quote: quote.trim(),
          created_at: new Date().toISOString(),
        };

        // Immediately update list and show the new review on screen
        setReviewsList((prev) => [newReviewItem, ...prev]);
        setCurrentIndex(0);

        setSubmitFeedback({
          type: "success",
          message: isGujarati
            ? "આભાર! તમારી સમીક્ષા વેબસાઇટ પર સફળતાપૂર્વક ઉમેરાઈ ગઈ છે અને એડમિન પેનલ (swadeepsvs@gmail.com) ને મોકલાઈ છે."
            : "Thank you! Your review has been submitted, notified to swadeepsvs@gmail.com, and is now live on the website.",
        });

        // Reset form
        setName("");
        setEmail("");
        setRole("");
        setQuote("");
        setRating(5);

        // Auto close after 2 seconds
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitFeedback(null);
        }, 2000);
      } else {
        setSubmitFeedback({
          type: "error",
          message: data.error || (isGujarati ? "સમીક્ષા ઉમેરવામાં સમસ્યા આવી." : "Failed to submit review."),
        });
      }
    } catch (err) {
      setSubmitFeedback({
        type: "error",
        message: isGujarati
          ? "સર્વર સાથે જોડાણ થઈ શક્યું નથી. કૃપા કરીને ફરી પ્રયાસ કરો."
          : "Network error. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            {isGujarati ? "અમારા વિશે સમીક્ષાઓ અને અનુભવો" : "What They Say About Us"}
          </h2>

          <p className="font-gujarati text-sm sm:text-lg text-forest font-medium max-w-xl mx-auto">
            {isGujarati
              ? "અમારા ભાગીદારો, સ્વયંસેવકો અને સાથી કાર્યકરોના પ્રત્યક્ષ અનુભવો"
              : "Direct experiences from our partners, community members, and volunteers"}
          </p>

          {/* Action Button: Write a Review */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] shadow-md shadow-[#F47B2A]/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>{isGujarati ? "તમારો અભિપ્રાય આપો (Add Review)" : "Write a Review"}</span>
            </button>
          </div>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-forest/10 transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-3.5 py-1 rounded-full bg-forest-50 text-forest border border-forest/10">
                {currentTestimonial.category || "Community Review"}
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
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-6 sm:w-8 bg-[#F47B2A]" : "w-2 sm:w-2.5 bg-charcoal/20 hover:bg-charcoal/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              {reviewsList.length > 10 && (
                <span className="text-[10px] text-charcoal/50">+{reviewsList.length - 10}</span>
              )}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={goToPrev}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream hover:bg-forest text-forest-dark hover:text-white border border-forest/15 flex items-center justify-center transition-colors"
                aria-label="Previous quote"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream hover:bg-forest text-forest-dark hover:text-white border border-forest/15 flex items-center justify-center transition-colors"
                aria-label="Next quote"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Submission Modal Dialog */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-review-title"
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-forest/15 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 id="modal-review-title" className="font-heading font-extrabold text-xl text-forest-dark">
                  {isGujarati ? "તમારી સમીક્ષા ઉમેરો" : "Share Your Experience"}
                </h3>
                <p className="text-xs text-charcoal/70 mt-0.5">
                  {isGujarati
                    ? "સ્વદીપ સંસ્થા વિશે તમારો પ્રામાણિક પ્રતિસાદ આપો"
                    : "Your review will appear publicly on the website."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Notification alert */}
            {submitFeedback && (
              <div
                className={`mt-4 p-3 rounded-xl text-xs font-semibold ${
                  submitFeedback.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitFeedback.message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
              {/* Star Rating Selection */}
              <div>
                <label className="block text-xs font-bold text-charcoal/85 mb-1.5">
                  {isGujarati ? "રેટિંગ (Star Rating)" : "Rating"}
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                      aria-label={`${star} star rating`}
                    >
                      <svg
                        className={`w-6 h-6 ${
                          star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-charcoal/70 ml-2">
                    {rating} / 5
                  </span>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="review-name" className="block text-xs font-bold text-charcoal/85 mb-1">
                  {isGujarati ? "તમારું પૂરું નામ *" : "Your Full Name *"}
                </label>
                <input
                  id="review-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anand Sharma"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                  maxLength={100}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="review-email" className="block text-xs font-bold text-charcoal/85 mb-1">
                  {isGujarati ? "તમારું ઇમેઇલ સરનામું (Email)" : "Your Email Address (Optional)"}
                </label>
                <input
                  id="review-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. anand@example.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                  maxLength={120}
                />
                <span className="text-[10.5px] text-charcoal/50 block mt-1">
                  {isGujarati
                    ? "સમીક્ષા સીધી એડમિન પેનલ પર દેખાશે અને swadeepsvs@gmail.com પર સૂચના મોકલાશે."
                    : "Submitted reviews appear on the Admin Panel & are dispatched to swadeepsvs@gmail.com."}
                </span>
              </div>

              {/* Role / City Field */}
              <div>
                <label htmlFor="review-role" className="block text-xs font-bold text-charcoal/85 mb-1">
                  {isGujarati ? "હોદ્દો / શહેર / સંસ્થા" : "Your Role / Organization / City (Optional)"}
                </label>
                <input
                  id="review-role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Volunteer, Ahmedabad / Donor"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                  maxLength={100}
                />
              </div>

              {/* Category Pill Selection */}
              <div>
                <label className="block text-xs font-bold text-charcoal/85 mb-1.5">
                  {isGujarati ? "કેટેગરી" : "Category"}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Community Member",
                    "Volunteer",
                    "Donor / Partner",
                    "Beneficiary",
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1 text-xs rounded-full font-semibold transition-all ${
                        category === cat
                          ? "bg-forest text-white"
                          : "bg-gray-100 text-charcoal/80 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Message Textarea */}
              <div>
                <label htmlFor="review-quote" className="block text-xs font-bold text-charcoal/85 mb-1">
                  {isGujarati ? "તમારો પ્રતિસાદ / અનુભવ *" : "Your Review / Feedback *"}
                </label>
                <textarea
                  id="review-quote"
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder={
                    isGujarati
                      ? "સ્વદીપ સંસ્થાના કાર્યો વિશે તમારો અનુભવ શેર કરો..."
                      : "Share your experience with Swadeep's community initiatives..."
                  }
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all resize-none"
                  minLength={5}
                  maxLength={1500}
                />
                <span className="text-[10px] text-charcoal/50 block text-right">
                  {quote.length} / 1500
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-charcoal/70 hover:bg-gray-100 transition-colors"
                >
                  {isGujarati ? "રદ કરો" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] shadow-md shadow-[#F47B2A]/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{isGujarati ? "મોકલાઈ રહ્યું છે..." : "Submitting..."}</span>
                  ) : (
                    <span>{isGujarati ? "સમીક્ષા પ્રકાશિત કરો" : "Submit Review"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
