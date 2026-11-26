"use client";

import React from "react";
import Image from "next/image";
import { SITE_CONFIG, ACHIEVEMENTS, TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import OurTrustees from "@/components/sections/OurTrustees";
import Partners from "@/components/sections/Partners";
import { EyeIcon, TargetIcon, AwardMedalIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutContent() {

  const { isGujarati, t } = useLanguage();

  const fundingPartnersTestimonials = TESTIMONIALS.filter(
    (item) => item.category === "Funding Partners"
  );

  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative py-20 lg:py-28 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden"
      >
        {/* Enhanced Grassroots Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <Image
            src="/images/community.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover filter contrast-[1.08] saturate-[1.15]"
          />
        </div>
        <div
          className="absolute inset-0 opacity-15 pointer-events-none bg-gradient-to-t from-forest-dark via-transparent to-forest-dark/80"
          aria-hidden="true"
        />

        <div className="container-wide section-padding relative z-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-bold tracking-wider text-cream/90 uppercase">
            <span>{SITE_CONFIG.name}</span>
          </div>

          <h1
            id="about-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            {"Who Are We?"}
          </h1>

          

          <p className="font-body text-cream/90 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto pt-2">
            {"Non-profit organization in Ahmedabad, Gujarat founded in 2005."}
          </p>
        </div>
      </section>

      {/* 2. Who Are We? Content Section */}
      <section id="history" className="section-padding py-20 lg:py-24 scroll-mt-24">
        <div className="container-wide max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
                {"SWADEEP SHIKSHAN VIKAS SANSTHA"}
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-forest-dark tracking-tight">
                {"Who Are We?"}
              </h2>

              <div className="space-y-4 font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                <p>{SITE_CONFIG.whoAreWe1}</p>
                <p>{SITE_CONFIG.whoAreWe2}</p>
              </div>

              {/* Award Callout */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <AwardMedalIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-amber-900 tracking-wider">
                    {"Recognition"}
                  </div>
                  <div className="font-heading font-extrabold text-amber-950 text-base sm:text-lg">
                    {"CSR Conclave 2019 Award"}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Media Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/projects-hero.jpg"
                  alt="Swadeep Field Work"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-saffron bg-forest-dark/90 px-3 py-1 rounded-full inline-block">
                    {"Grassroots Leadership"}
                  </span>
                  <h3 className="font-heading font-bold text-xl">
                    {SITE_CONFIG.name}
                  </h3>
                  <p className="text-sm text-cream/95">
                    {"Ahmedabad, Gujarat – Serving Communities Since 2005"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section id="vision-mission" className="section-padding py-20 bg-cream-dark/50 border-y border-forest/10 scroll-mt-24" aria-label="Vision and Mission">
        <div className="container-wide max-w-5xl mx-auto">
          <SectionHeading
            badge={"OUR PURPOSE"}
            
            title={"Our Vision & Mission"}
            subtitle={
              "The foundational purpose guiding team Swadeep since 2005."
            }
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border-2 border-forest/10 flex flex-col justify-between hover:border-forest/30 transition-colors">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest flex items-center justify-center border border-forest-100">
                  <EyeIcon className="w-7 h-7 text-forest" />
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-forest-dark">
                  {"Our Vision"}
                </h3>
                <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                  {SITE_CONFIG.vision}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border-2 border-saffron/20 flex flex-col justify-between hover:border-saffron/40 transition-colors">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-saffron-50 text-saffron-dark flex items-center justify-center border border-saffron-100">
                  <TargetIcon className="w-7 h-7 text-saffron-dark" />
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-forest-dark">
                  {"Our Mission"}
                </h3>
                <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                  {SITE_CONFIG.mission}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Journey Visual Timeline (Prompt Step 7 Specification) */}
      <section id="our-journey" className="section-padding py-20 lg:py-24 bg-white scroll-mt-24" aria-label="Our Journey">
        <div className="container-wide max-w-5xl mx-auto space-y-12">
          <SectionHeading
            badge={"HISTORICAL TIMELINE"}
            
            title={"Our Journey: 2005 to Present"}
            subtitle={
              "A verified chronological milestone record of Swadeep's grassroots transformation across Gujarat."
            }
            align="center"
          />

          <div className="relative border-l-2 border-[#174B38]/20 ml-4 sm:ml-32 md:ml-40 space-y-10 py-4">
            {/* 2005 Foundation */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                2005
              </div>
              <div className="bg-cream/40 p-5 sm:p-6 rounded-2xl border border-forest/10 hover:border-forest/30 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  2005
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {"FOUNDATION"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {"Establishment in Ahmedabad, Gujarat"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {"Founded in Ahmedabad with the clear urge and smart strategies to empower vulnerable communities through education and social service."}
                </p>
              </div>
            </div>

            {/* 2008 Early Education */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                2008
              </div>
              <div className="bg-cream/40 p-5 sm:p-6 rounded-2xl border border-forest/10 hover:border-forest/30 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  2008
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {"EARLY EDUCATION INITIATIVES"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {"Anganwadi Interventions & BaLA Learning"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {"Pioneered Building as Learning Aid (BaLA) in 277 ICDS Anganwadi centres, joyful rhyme literature, and caregiver capacity workshops."}
                </p>
              </div>
            </div>

            {/* 2012 Community Dev */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                2012
              </div>
              <div className="bg-cream/40 p-5 sm:p-6 rounded-2xl border border-forest/10 hover:border-forest/30 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  2012
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {"COMMUNITY DEVELOPMENT & EXPANSION"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {"Scaling Primary Education & Resource Centres"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {"Expanded educational footprint across 200+ villages, establishing Learning Resource Centres (LRCs) and supporting over 60,000 children."}
                </p>
              </div>
            </div>

            {/* 2015 Health & Livelihood */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                2015
              </div>
              <div className="bg-cream/40 p-5 sm:p-6 rounded-2xl border border-forest/10 hover:border-forest/30 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  2015
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {"HEALTH & LIVELIHOOD"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {"Project Arogya & Coastal Sagar Shala"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {"Launched Project Arogya dental hygiene programs reaching 13,000 beneficiaries and established coastal fisheries livelihood support for 500 fishermen."}
                </p>
              </div>
            </div>

            {/* 2019 CSR Conclave */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#F47B2A] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#F47B2A]">
                2019
              </div>
              <div className="bg-amber-50/70 p-5 sm:p-6 rounded-2xl border border-amber-200 hover:border-amber-400 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#F47B2A] px-2.5 py-0.5 rounded-full mb-1">
                  2019
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {"INSTITUTIONAL RECOGNITION"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-amber-950">
                  {"CSR Conclave 2019 Award"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {"Honored with the CSR Conclave 2019 Award for high-impact corporate social responsibility collaboration with Tata Power, CGPL, APM Terminals, and AIF."}
                </p>
              </div>
            </div>

            {/* 2020 Disaster Response */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                2020-21
              </div>
              <div className="bg-cream/40 p-5 sm:p-6 rounded-2xl border border-forest/10 hover:border-forest/30 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  2020-21
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {"DISASTER RESPONSE"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {"Emergency COVID-19 & Cyclone Tauktae Relief"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {"Mobilized frontline disaster response distributing 100,000 safety masks, essential food kits, and emergency rehab for 1,000+ cyclone-affected families."}
                </p>
              </div>
            </div>

            {/* Present Day */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm ring-4 ring-[#174B38]/20" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                Present
              </div>
              <div className="bg-forest-50/60 p-5 sm:p-6 rounded-2xl border border-forest/20 hover:border-forest/40 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  Present Day
                </span>
                <div className="text-xs font-bold text-[#174B38] uppercase tracking-wider">
                  {"PRESENT DAY"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {"Integrated Rural Development & Solar Security"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {"Operating 1,050 solar streetlights across 40 villages, continuing active schooling partnerships, and empowering self-reliant communities."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Board of Trustees */}
      <OurTrustees />

      {/* 5. Our Achievements Section */}
      <section className="section-padding py-20 lg:py-24 bg-white border-y border-forest/10" aria-label="Our Achievements">
        <div className="container-wide max-w-5xl mx-auto space-y-12">
          <SectionHeading
            badge={"MEASURABLE WORK"}
            
            title={"Our Achievements"}
            subtitle={
              "Authentic programmatic milestones across our thematic areas of development."
            }
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Education */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {ACHIEVEMENTS.education.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.education.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Health */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {ACHIEVEMENTS.health.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.health.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Livelihood */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {ACHIEVEMENTS.livelihood.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.livelihood.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rural Infrastructure Development */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {ACHIEVEMENTS.infrastructure.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.infrastructure.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disaster Management */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4 md:col-span-2 lg:col-span-2">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {ACHIEVEMENTS.disaster.title}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ACHIEVEMENTS.disaster.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between font-body text-charcoal/85 text-base p-2 bg-white rounded-xl border border-forest/5">
                    <span>{item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Partners */}
      <Partners />

      {/* 7. What They Say About Us */}
      <section className="section-padding py-20 lg:py-24 bg-cream" aria-label="What They Say About Us">
        <div className="container-wide max-w-5xl mx-auto space-y-14">
          <SectionHeading
            badge={"SWADEEP SHIKSHAN VIKAS SANSTHA"}
            
            title={"What They Say About Us"}
            subtitle={
              "Words of trust and collaboration from our esteemed partners and dedicated staff members."
            }
            align="center"
          />

          {/* Funding Partners Quotes */}
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-forest-dark border-l-4 border-saffron pl-4">
              {"Funding Partners"}
            </h3>
            <div className="space-y-6">
              {fundingPartnersTestimonials.map((tItem, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-4">
                  <p className="font-body text-charcoal/85 text-base sm:text-lg italic leading-relaxed">
                    &ldquo;{tItem.quote}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-cream-dark flex items-center justify-between">
                    <div>
                      <div className="font-heading font-bold text-lg text-forest-dark">{tItem.name}</div>
                      <div className="text-sm text-charcoal/70">{tItem.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>
    </main>
  );
}
