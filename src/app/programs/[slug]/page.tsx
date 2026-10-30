"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { PROGRAMS_DATA } from "@/lib/programsData";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG, YOUTUBE_VIDEOS } from "@/lib/constants";
import { CheckCircleIcon, ExternalLinkIcon, YoutubeIcon } from "@/components/ui/Icons";

export default function ProgramDetailPage() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || "";
  const { isGujarati, t } = useLanguage();

  // Normalize slug and handle aliases
  const slug = rawSlug.toLowerCase();
  const normalizedSlug =
    slug === "rural-infrastructure"
      ? "infrastructure"
      : slug === "disaster-management"
      ? "disaster"
      : slug;

  const program = PROGRAMS_DATA[normalizedSlug];

  if (!program) {
    notFound();
  }

  // Filter verified videos for this program
  const programVideos = YOUTUBE_VIDEOS.filter((v) =>
    program.relatedVideoIds.includes(v.id)
  );

  return (
    <main id="main-content" className="pt-24 sm:pt-28 pb-20 bg-cream min-h-screen">
      {/* 1. Header & Hero Banner */}
      <section className="bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#205943] text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Subtle photo background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
          <Image
            src={program.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="container-wide section-padding relative z-10 max-w-6xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs sm:text-sm text-white/75">
            <Link href="/" className="hover:text-white transition-colors">
              {t("navHome")}
            </Link>
            <span>/</span>
            <Link href="/programs" className="hover:text-white transition-colors">
              {t("navWhatWeDo")}
            </Link>
            <span>/</span>
            <span className="text-[#F47B2A] font-semibold">
              {isGujarati ? program.titleGu : program.title}
            </span>
          </nav>

          <div className="space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-[#F47B2A]">
              {isGujarati ? program.eyebrowGu : program.eyebrow}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {isGujarati ? program.titleGu : program.title}
            </h1>
            <p className="font-gujarati text-lg sm:text-xl text-white/90">
              {program.titleGu}
            </p>
          </div>

          <p className="font-body text-base sm:text-lg text-white/90 max-w-3xl leading-relaxed">
            {isGujarati ? program.summaryGu : program.summary}
          </p>

          {/* Key Metric Snapshot Chips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/15">
            {program.statsBanner.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                <div className="text-xl sm:text-2xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/80 font-medium mt-0.5">
                  {isGujarati ? stat.labelGu : stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="container-wide section-padding max-w-6xl mx-auto py-12 sm:py-16 space-y-16">
        {/* Section A: Community Need & Problem Addressed */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {isGujarati ? "વાસ્તવિક જરૂરિયાત" : "COMMUNITY NEED"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
              {isGujarati ? program.communityNeed.titleGu : program.communityNeed.title}
            </h2>
            <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
              {isGujarati ? program.communityNeed.descriptionGu : program.communityNeed.description}
            </p>

            <ul className="space-y-3 pt-2">
              {program.communityNeed.points.map((pt, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#174B38]/10 text-[#174B38] flex items-center justify-center shrink-0 mt-1">
                    <CheckCircleIcon size={16} />
                  </div>
                  <span className="font-body text-sm sm:text-base text-charcoal/80">
                    {isGujarati ? pt.gu : pt.en}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src={program.image}
                alt={program.title}
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section B: Activities & Strategic Approach */}
        <section className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-forest/10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A]">
              {isGujarati ? "પદ્ધતિ અને અમલીકરણ" : "APPROACH & ACTIVITIES"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
              {isGujarati ? program.approachAndActivities.titleGu : program.approachAndActivities.title}
            </h2>
            <p className="font-body text-charcoal/80 text-sm sm:text-base">
              {isGujarati ? program.approachAndActivities.descriptionGu : program.approachAndActivities.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {program.approachAndActivities.activities.map((act, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-cream/60 border border-forest/10 space-y-3 hover:bg-forest-50/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-[#174B38] text-white flex items-center justify-center font-bold text-sm">
                  0{i + 1}
                </div>
                <h3 className="font-heading font-bold text-base text-[#0B3025]">
                  {isGujarati ? act.titleGu : act.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                  {isGujarati ? act.descGu : act.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section C: Target Groups & Geographical Scope */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Target Groups */}
          <div className="p-6 sm:p-8 rounded-3xl bg-forest-50/70 border border-forest/15 space-y-4">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0B3025]">
              {isGujarati ? "લક્ષિત જૂથો" : "Target Beneficiary Groups"}
            </h3>
            <ul className="space-y-2.5">
              {program.targetGroupsAndScope.targetGroups.map((grp, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm text-charcoal/85">
                  <span className="w-2 h-2 rounded-full bg-[#F47B2A] shrink-0" />
                  <span>{isGujarati ? grp.gu : grp.en}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="p-6 sm:p-8 rounded-3xl bg-forest-50/70 border border-forest/15 space-y-4">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0B3025]">
              {isGujarati ? "કાર્યક્ષેત્ર અને જિલ્લાઓ" : "Geographic Scope"}
            </h3>
            <ul className="space-y-2.5">
              {program.targetGroupsAndScope.locations.map((loc, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm text-charcoal/85">
                  <span className="w-2 h-2 rounded-full bg-[#174B38] shrink-0" />
                  <span>{isGujarati ? loc.gu : loc.en}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-xs text-charcoal/70">
              <span className="font-semibold text-[#0B3025]">
                {isGujarati ? "અહેવાલ સમયગાળો:" : "Reporting Period:"}
              </span>{" "}
              {program.targetGroupsAndScope.reportingPeriod}
            </div>
          </div>
        </section>

        {/* Section D: Verified Outcomes */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A]">
              {isGujarati ? "પરિણામો" : "VERIFIED FIELD IMPACT"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
              {isGujarati ? "પ્રમાણિત સિદ્ધિઓ" : "Verified Outcomes & Milestones"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.verifiedOutcomes.map((out, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-forest/10 shadow-sm space-y-2 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-black text-[#F47B2A]">
                  {out.value}
                </div>
                <h4 className="font-heading font-bold text-base text-[#0B3025]">
                  {isGujarati ? out.metricGu : out.metric}
                </h4>
                <p className="font-body text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                  {isGujarati ? out.detailsGu : out.details}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section E: Related Videos from Official YouTube Channel */}
        {programVideos.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-forest/15">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A]">
                  {isGujarati ? "વીડિયો દસ્તાવેજીકરણ" : "FIELD DOCUMENTATION"}
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0B3025]">
                  {isGujarati ? "સંબંધિત યુટ્યુબ વીડિયો" : "Official Field Videos"}
                </h2>
              </div>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-1.5 rounded-full transition-colors"
              >
                <YoutubeIcon className="w-4 h-4 mr-1.5" />
                <span>@swadeepindia2543</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl overflow-hidden border border-forest/10 shadow-sm hover:shadow-md transition-all group flex flex-col"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <Image
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[11px] font-semibold text-white">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#0B3025] line-clamp-2">
                        {isGujarati ? video.titleGu : video.title}
                      </h4>
                      <p className="font-body text-xs text-charcoal/70 line-clamp-2 mt-1">
                        {video.description}
                      </p>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-[#F47B2A] hover:text-[#E06A1B] pt-1"
                    >
                      <span>{t("watchVideo")}</span>
                      <ExternalLinkIcon size={13} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section F: Action & Collaboration Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-[#0B3025] to-[#174B38] text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="font-heading text-2xl sm:text-3xl font-black">
              {isGujarati
                ? "આ પ્રકલ્પમાં સહભાગી બનો અથવા CSR સહયોગ કરો"
                : "Collaborate or Support This Initiative"}
            </h3>
            <p className="font-body text-sm sm:text-base text-white/85">
              {isGujarati
                ? "અમે કોર્પોરેટ CSR, સંસ્થાઓ અને સ્વયંસેવકોને વંચિત સમુદાયોના સશક્તિકરણમાં સાથે જોડાવા આવકારીએ છીએ."
                : "Partner with Swadeep through CSR programs, field volunteering, or direct contributions to scale this impact."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact#contact-form"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] shadow-lg shadow-[#F47B2A]/30 transition-all hover:-translate-y-0.5"
            >
              <span>{t("contactUs")}</span>
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-bold text-white bg-transparent border-2 border-white/70 hover:border-white hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              <span>{t("donateNow")}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
