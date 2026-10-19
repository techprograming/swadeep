import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS, FOCUS_AREAS } from "@/lib/constants";
import { HeartIcon, DynamicIcon } from "@/components/ui/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-cream border-t border-forest-800" role="contentinfo">
      {/* Main Footer Content */}
      <div className="container-wide section-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Organization Branding & About (span 4 on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
              aria-label={`${SITE_CONFIG.name} Home`}
            >
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md border border-white/20 bg-white p-1 shrink-0">
                <Image
                  src="/images/favicon.png"
                  alt="Swadeep Emblem"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-extrabold tracking-tight text-white leading-none">
                  <span className="text-saffron">S</span>wadeep
                </span>
                <span className="font-gujarati text-xs sm:text-sm text-cream/90 font-medium mt-1 leading-none">
                  {SITE_CONFIG.nameGujarati}
                </span>
              </div>
            </Link>

            <p className="font-body text-cream/90 text-sm sm:text-base leading-relaxed max-w-sm pt-2">
              {SITE_CONFIG.description}
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-cream/60 mb-3">
                Connect With Us
              </span>
              <div className="flex items-center space-x-3">
                {/* Facebook SVG */}
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-forest-800/80 hover:bg-saffron text-cream hover:text-white flex items-center justify-center transition-all duration-200 border border-forest-700 hover:border-saffron focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                  aria-label="Visit Swadeep Shikshan Vikas Sanstha on Facebook"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Twitter / X SVG */}
                <a
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-forest-800/80 hover:bg-saffron text-cream hover:text-white flex items-center justify-center transition-all duration-200 border border-forest-700 hover:border-saffron focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                  aria-label="Visit Swadeep on Twitter"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram SVG */}
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-forest-800/80 hover:bg-saffron text-cream hover:text-white flex items-center justify-center transition-all duration-200 border border-forest-700 hover:border-saffron focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                  aria-label="Visit Swadeep on Instagram"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* YouTube SVG */}
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-forest-800/80 hover:bg-saffron text-cream hover:text-white flex items-center justify-center transition-all duration-200 border border-forest-700 hover:border-saffron focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                  aria-label="Visit Swadeep on YouTube"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (span 2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-base font-bold text-white tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/80 hover:text-saffron transition-colors inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron/60 group-hover:bg-saffron mr-2 transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Focus Areas (span 3 on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-base font-bold text-white tracking-wide uppercase">
              Our Focus Areas
            </h3>
            <ul className="space-y-2.5 text-sm" role="list">
              {FOCUS_AREAS.map((area) => (
                <li key={area.id}>
                  <Link
                    href={`/programs#${area.id}`}
                    className="text-cream/80 hover:text-saffron transition-colors flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                  >
                    <span className="flex items-center">
                      <DynamicIcon name={area.icon} size={14} className="mr-2 text-saffron shrink-0" />
                      <span>{area.title}</span>
                    </span>
                    <span className="font-gujarati text-xs sm:text-sm text-cream/70 group-hover:text-cream/90 transition-colors">
                      {area.titleGu}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (span 3 on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-base font-bold text-white tracking-wide uppercase">
              Contact Us
            </h3>
            <address className="not-italic space-y-3.5 text-sm text-cream/80">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-saffron mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="leading-relaxed">{SITE_CONFIG.address}</span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-saffron mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-saffron transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-saffron mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-saffron transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Made with Love */}
      <div className="border-t border-forest-800 bg-forest-900/60 py-6">
        <div className="container-wide section-padding flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-cream/80 space-y-3 sm:space-y-0">
          <p>
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="flex items-center space-x-1">
            <span>Made with</span>
            <HeartIcon className="w-4 h-4 text-saffron fill-current inline-block mx-1" aria-hidden="true" />
            <span>for India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
