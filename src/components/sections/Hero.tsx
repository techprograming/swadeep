import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import {
  BookOpenIcon,
  HeartPulseIcon,
  UsersGroupIcon,
  AwardMedalIcon,
} from "@/components/ui/Icons";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden pt-28 pb-16 lg:py-20"
    >
      {/* Decorative subtle pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-screen"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Decorative ambient gradients */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 bg-forest-light/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-saffron/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wide section-padding relative z-10 w-full py-8 lg:py-16 rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-forest-900/90 backdrop-blur-md">
        {/* Background Image across container */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/projects-hero.jpg"
            alt="Swadeep Field Work & Community Projects"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 opacity-40 mix-blend-luminosity"
          />
          {/* Full green gradient overlay ensuring lush green branding and sharp text */}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/95 via-forest/90 to-forest-light/80" />
          <div className="absolute inset-0 bg-radial-at-t from-forest-light/20 via-transparent to-forest-dark/80" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading, Subtitle, Description, CTAs */}
            <div className="lg:col-span-7 text-left space-y-6">
              {/* Subtle top badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-medium text-cream/90 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
                <span>{SITE_CONFIG.subtitle}</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-1">
                <span className="block font-heading text-xl sm:text-2xl text-saffron-light font-bold uppercase tracking-wider">
                  Welcome to the
                </span>
                <h1
                  id="hero-heading"
                  className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-white"
                >
                  Swadeep Shikshan Vikas Sanstha
                </h1>
              </div>

              {/* Gujarati Title */}
              <p className="font-gujarati text-lg sm:text-xl md:text-2xl text-cream/80 font-normal tracking-wide">
                {SITE_CONFIG.nameGujarati}
              </p>

              {/* Mission Description directly copied from old site */}
              <p className="font-body text-cream/90 text-base sm:text-lg max-w-2xl leading-relaxed">
                {SITE_CONFIG.description}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white bg-saffron hover:bg-saffron-dark shadow-lg shadow-saffron/20 hover:shadow-saffron/40 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                >
                  <span>Explore Our Work</span>
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

                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-cream hover:text-forest-dark bg-transparent hover:bg-cream border-2 border-cream/80 hover:border-cream shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
                >
                  <span>Support Our Mission</span>
                </Link>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base text-cream/90 font-medium">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-saffron" />
                  <span>Tax Exemption Liable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-saffron" />
                  <span>FCRA Reg: 041980081</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-saffron" />
                  <span>PAN: AAKTS6375E</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase Card featuring Community & Field Photography */}
            <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative mx-auto max-w-md w-full">
              <div className="rounded-3xl bg-forest-800/80 backdrop-blur-xl border border-white/20 p-6 shadow-2xl space-y-5">
                <div className="h-60 rounded-2xl relative overflow-hidden flex flex-col justify-end p-5 border border-white/10 group">
                  <Image
                    src="/images/community.jpg"
                    alt="Swadeep Community & Anganwadi Field Work"
                    fill
                    priority
                    sizes="400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/40 to-transparent" />
                  <div className="relative z-10 text-white space-y-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-saffron bg-forest-dark/90 px-3 py-1 rounded-full inline-block">
                      Founded in 2005
                    </span>
                    <h2 className="text-xl font-bold font-heading">
                      Swadeep Shikshan Vikas Sanstha
                    </h2>
                    <p className="text-xs sm:text-sm text-cream/90">
                      Ahmedabad, Gujarat
                    </p>
                  </div>
                </div>

                {/* Quick snapshot list from old site */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <BookOpenIcon className="w-4 h-4 text-saffron" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Education</div>
                        <div className="text-xs text-cream/80">60,000 Children • 200 Villages</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <HeartPulseIcon className="w-4 h-4 text-saffron" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Health</div>
                        <div className="text-xs text-cream/80">13,000 Dental • 100 Villages</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <UsersGroupIcon className="w-4 h-4 text-saffron" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Livelihood &amp; Infrastructure</div>
                        <div className="text-xs text-cream/80">500 Fishermen • 1050 Solar Lights</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge: CSR Conclave */}
              <div
                className="absolute -bottom-5 -right-5 bg-white text-forest-dark px-4 py-2.5 rounded-2xl shadow-xl border border-forest/10 flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <AwardMedalIcon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-amber-900 tracking-wider">Award</div>
                  <div className="text-sm font-black font-heading text-forest-dark leading-tight">
                    CSR Conclave 2019
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
