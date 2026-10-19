import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function NotFound() {
  return (
    <main id="main-content" className="flex-1 bg-cream flex items-center justify-center py-20 px-4">
      <div className="max-w-xl mx-auto text-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest/10 space-y-6">
        <div className="inline-flex items-center space-x-2 bg-saffron-50 border border-saffron-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-saffron-dark">
          <span>Error 404 • Page Not Found</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-forest-dark tracking-tight">
          Page Not Found
        </h1>

        <p className="font-gujarati text-base text-forest">
          માફ કરશો, તમે શોધતા હોવ તે પેજ ઉપલબ્ધ નથી.
        </p>

        <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
          The page you are looking for may have been moved, renamed, or is temporarily unavailable. Please explore one of our main sections below:
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2 text-left">
          <Link
            href="/"
            className="p-3.5 rounded-xl bg-cream-dark/60 hover:bg-forest hover:text-white border border-forest/10 transition-colors text-sm font-semibold text-forest-dark block"
          >
            Homepage
          </Link>
          <Link
            href="/about"
            className="p-3.5 rounded-xl bg-cream-dark/60 hover:bg-forest hover:text-white border border-forest/10 transition-colors text-sm font-semibold text-forest-dark block"
          >
            About Us
          </Link>
          <Link
            href="/programs"
            className="p-3.5 rounded-xl bg-cream-dark/60 hover:bg-forest hover:text-white border border-forest/10 transition-colors text-sm font-semibold text-forest-dark block"
          >
            Our Work &amp; Programs
          </Link>
          <Link
            href="/impact"
            className="p-3.5 rounded-xl bg-cream-dark/60 hover:bg-forest hover:text-white border border-forest/10 transition-colors text-sm font-semibold text-forest-dark block"
          >
            Impact &amp; Reports
          </Link>
          <Link
            href="/gallery"
            className="p-3.5 rounded-xl bg-cream-dark/60 hover:bg-forest hover:text-white border border-forest/10 transition-colors text-sm font-semibold text-forest-dark block"
          >
            Photo Gallery
          </Link>
          <Link
            href="/contact"
            className="p-3.5 rounded-xl bg-cream-dark/60 hover:bg-forest hover:text-white border border-forest/10 transition-colors text-sm font-semibold text-forest-dark block"
          >
            Contact Information
          </Link>
        </div>

        <div className="pt-4 border-t border-forest/10">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-white bg-forest hover:bg-forest-light transition-colors shadow-md"
          >
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
