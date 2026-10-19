import React from "react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative py-20 lg:py-28 bg-gradient-to-r from-saffron-dark via-saffron to-saffron-300 text-white overflow-hidden shadow-inner"
    >
      {/* Decorative ambient background rings & circles */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-forest-dark/15 blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 15px 15px, white 2px, transparent 0)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container-wide section-padding relative z-10 text-center max-w-4xl mx-auto space-y-6">
        {/* Subtle accent badge */}
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/30">
          <span>Be the Catalyst for Change</span>
        </div>

        {/* Main Heading */}
        <h2
          id="cta-heading"
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
        >
          Together, We Can Make a Difference
        </h2>

        {/* Gujarati Subtitle */}
        <p className="font-gujarati text-xl sm:text-2xl md:text-3xl text-white/95 font-medium tracking-wide">
          સાથે મળીને, આપણે ફરક લાવી શકીએ છીએ
        </p>

        {/* Supporting description */}
        <p className="font-body text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
          Whether you contribute your time, partner with our grassroots programs,
          or make a life-changing donation, your support directly empowers children,
          women, and rural families across Gujarat.
        </p>

        {/* Two CTAs */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5">
          <Link
            href="/donate"
            className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full text-base font-bold text-saffron-dark bg-white hover:bg-cream shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Donate Now</span>
            <svg
              className="w-5 h-5 ml-2 fill-current"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full text-base font-bold text-white bg-forest hover:bg-forest-dark border-2 border-forest-light/50 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-light"
          >
            <span>Get Involved</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        {/* Small reassurance line */}
        <div className="pt-6 flex items-center justify-center space-x-6 text-xs text-white/80">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1.5 fill-current"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Registered Non-Profit NGO
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1.5 fill-current"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Transparent Operations
          </span>
        </div>
      </div>
    </section>
  );
}
