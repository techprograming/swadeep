"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import GetInvolvedSubNav from "@/components/ui/GetInvolvedSubNav";
import {
  HeartIcon,
  UsersGroupIcon,
  HandshakeIcon,
  BriefcaseIcon,
} from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function GetInvolvedPage() {
  const { isGujarati } = useLanguage();

  return (
    <main id="main-content" className="flex-1 bg-cream min-h-screen">
      {/* Sub Navigation */}
      <GetInvolvedSubNav activeTab="overview" />

      {/* Hero Banner */}
      <section
        aria-labelledby="get-involved-heading"
        className="relative py-16 sm:py-20 bg-gradient-to-br from-[#0B3025] via-[#174B38] to-[#205943] text-cream overflow-hidden"
      >
        <div className="container-wide section-padding relative z-10 max-w-4xl mx-auto space-y-4 text-center">
          <p className="text-xs uppercase tracking-widest text-cream/70 font-semibold">
            Swadeep Shikshan Vikas Sanstha
          </p>

          <h1
            id="get-involved-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            Get Involved
          </h1>

          <p className="font-body text-cream/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            Support grassroots transformation in Gujarat through donation, volunteering, partnership, or career opportunities with Swadeep Shikshan Vikas Sanstha.
          </p>
        </div>
      </section>

      {/* The 4 Core Sections Grid — 100% Original Verbatim Headings & Descriptions */}
      <section className="py-12 sm:py-16">
        <div className="container-wide max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. Donation Card */}
            <div className="bg-white rounded-3xl p-8 border border-forest/15 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <HeartIcon size={24} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F47B2A] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    DONATE TO THE CAUSE
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
                  Donation
                </h2>

                <p className="font-body text-sm sm:text-base text-charcoal/80 leading-relaxed">
                  Swadeep is a non-profit organization and hence, any donation given to organization is liable for tax exemption.
                </p>

                <p className="font-body text-xs sm:text-sm text-charcoal/70 leading-relaxed border-t border-forest/5 pt-3">
                  Direct transfer to domestic Bank of India or foreign FCRA State Bank of India account, or cheque/draft in favour of Swadeep Shikshan Vikas Sanstha.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/donation"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#0B3025] hover:bg-[#174B38] transition-colors shadow-sm"
                >
                  <span>View Donation Details →</span>
                </Link>
              </div>
            </div>

            {/* 2. Become A Volunteer Card */}
            <div className="bg-white rounded-3xl p-8 border border-forest/15 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-forest-50 text-[#174B38] flex items-center justify-center">
                    <UsersGroupIcon size={24} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#174B38] bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
                    Help Us Help Them
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
                  Become A Volunteer
                </h2>

                <p className="font-body text-sm sm:text-base text-charcoal/80 leading-relaxed">
                  We are a cause-driven NGO deeply engaged at grassroots through life-transforming programs. Join our hands in reaching out to communities through your zeal and compassion!
                </p>

                <p className="font-body text-xs sm:text-sm text-charcoal/70 leading-relaxed border-t border-forest/5 pt-3">
                  Opportunities in foundational education, Anganwadi capacity building, pediatric health check-ups, and rural community empowerment.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/become-a-volunteer"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#174B38] hover:bg-[#0B3025] transition-colors shadow-sm"
                >
                  <span>Volunteer With Us →</span>
                </Link>
              </div>
            </div>

            {/* 3. Partner With Us Card */}
            <div className="bg-white rounded-3xl p-8 border border-forest/15 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F47B2A] flex items-center justify-center">
                    <HandshakeIcon size={24} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F47B2A] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    COLLABORATION
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
                  Partner With Us
                </h2>

                <p className="font-body text-sm sm:text-base text-charcoal/80 leading-relaxed">
                  Swadeep is always open for collaboration with individuals and organisations having similar vision.  We have been funded by corporate, government, NGOs, social groups and individuals to carryout impactful work.
                </p>

                <p className="font-body text-xs sm:text-sm text-charcoal/70 leading-relaxed border-t border-forest/5 pt-3">
                  Partner with audited grassroots delivery across Education, Health, Coastal Livelihoods, Rural Infrastructure, and Disaster Relief.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/partner-with-us"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] transition-colors shadow-sm"
                >
                  <span>Partner With Swadeep →</span>
                </Link>
              </div>
            </div>

            {/* 4. Career Card */}
            <div className="bg-white rounded-3xl p-8 border border-forest/15 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <BriefcaseIcon size={24} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    JOIN THE TEAM
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
                  Discover New Career
                </h2>

                <p className="font-body text-sm sm:text-base text-charcoal/80 leading-relaxed">
                  Come, be a part of team Swadeep! Together, let’s spread smile across the world!
                </p>

                <p className="font-body text-xs sm:text-sm text-charcoal/70 leading-relaxed border-t border-forest/5 pt-3">
                  Current openings for Project Co-ordinators (Education, Fisheries) and Teachers based in Gujarat.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/career"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#174B38] hover:bg-[#0B3025] transition-colors shadow-sm"
                >
                  <span>Explore Openings &amp; Apply →</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
