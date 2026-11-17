"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/lib/constants";
import {
  HandshakeIcon,
  UsersGroupIcon,
  HeartIcon,
  CheckCircleIcon,
} from "@/components/ui/Icons";

export default function GetInvolvedPage() {
  const { isGujarati, t } = useLanguage();

  return (
    <main id="main-content" className="pt-24 sm:pt-28 pb-20 bg-cream min-h-screen">
      {/* 1. Hero Banner */}
      <section className="bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#205943] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="container-wide section-padding relative z-10 max-w-6xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-[#F47B2A]">
            {isGujarati ? "સહભાગી બનો" : "GET INVOLVED"}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {isGujarati ? "સમાજ ઉત્થાનમાં આપનું યોગદાન આપો" : "Join Us in Grassroots Transformation"}
          </h1>
          <p className="font-body text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
            {isGujarati
              ? "શિક્ષણ, આરોગ્ય, આજીવિકા અને સમુદાય વિકાસમાં સ્વયંસેવા, CSR ભાગીદારી અથવા સહયોગ દ્વારા બદલાવ લાવો."
              : "Discover meaningful ways to collaborate with Swadeep through corporate CSR partnerships, skilled volunteering, or direct mission support."}
          </p>
        </div>
      </section>

      <div className="container-wide section-padding max-w-6xl mx-auto py-12 sm:py-16 space-y-16">
        {/* 2. Three Pillars of Getting Involved */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Volunteer Pillar */}
          <div
            id="volunteer"
            className="bg-white p-8 rounded-3xl border border-forest/10 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-50 text-[#174B38] flex items-center justify-center">
                <UsersGroupIcon size={24} />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0B3025]">
                {isGujarati ? "સ્વયંસેવક બનો" : "Volunteer with Us"}
              </h2>
              <p className="font-body text-sm text-charcoal/75 leading-relaxed">
                {isGujarati
                  ? "ગ્રામીણ શાળાઓમાં શિક્ષણ, આંગણવાડી બાળકો સાથે પ્રવૃત્તિઓ અથવા મેડિકલ કેમ્પમાં સમય અને કૌશલ્યનું યોગદાન આપો."
                  : "Share your passion, knowledge, or professional skills. Mentor rural youth, assist in Anganwadi activities, or support healthcare drives."}
              </p>
              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-charcoal/80">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                  <span>{isGujarati ? "શિક્ષણ અને કોચિંગ સહાય" : "Foundational teaching & remedial coaching"}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                  <span>{isGujarati ? "આરોગ્ય અને દાંત કેમ્પ સંકલન" : "Community health camp assistance"}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                  <span>{isGujarati ? "ડિજિટલ અને ક્ષેત્રીય દસ્તાવેજીકરણ" : "Digital literacy & documentation support"}</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact?subject=Volunteering#contact-form"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#174B38] hover:bg-[#0B3025] transition-colors"
            >
              <span>{t("volunteerNow")}</span>
            </Link>
          </div>

          {/* CSR Partnerships Pillar */}
          <div
            id="partnerships"
            className="bg-white p-8 rounded-3xl border border-forest/10 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F47B2A] flex items-center justify-center">
                <HandshakeIcon size={24} />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0B3025]">
                {isGujarati ? "કોર્પોરેટ CSR ભાગીદારી" : "Corporate CSR Partnerships"}
              </h2>
              <p className="font-body text-sm text-charcoal/75 leading-relaxed">
                {isGujarati
                  ? "ટાટા પાવર, APM ટર્મિનલ્સ અને AIF જેવા પ્રતિષ્ઠિત ભાગીદારો સાથે મળીને પારદર્શક અને ટકાઉ સામાજિક પરિવર્તન લાવો."
                  : "Collaborate with Swadeep under Section 135 CSR mandates. We deliver audited field execution, baseline surveys, and tangible social outcomes."}
              </p>
              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-charcoal/80">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                  <span>{isGujarati ? "સંપૂર્ણ 80G અને FCRA અનુપાલન" : "Audited 80G and FCRA compliance"}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                  <span>{isGujarati ? "નિયમિત ત્રિમાસિક પ્રોગ્રેસ રિપોર્ટ્સ" : "Transparent quarterly impact reports"}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                  <span>{isGujarati ? "ક્ષેત્રીય મુલાકાતો અને ફોટો દસ્તાવેજીકરણ" : "Field monitoring & direct verification"}</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact?subject=CSR+Partnership#contact-form"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] transition-colors"
            >
              <span>{t("partnerWithUs")}</span>
            </Link>
          </div>

          {/* Direct Support Pillar */}
          <div
            id="support"
            className="bg-white p-8 rounded-3xl border border-forest/10 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <HeartIcon size={24} />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0B3025]">
                {isGujarati ? "ધ્યેયને સમર્થન આપો" : "Support Our Mission"}
              </h2>
              <p className="font-body text-sm text-charcoal/75 leading-relaxed">
                {isGujarati
                  ? "આપનું નાનું યોગદાન પણ એક બાળકના શિક્ષણ, દાંતની સારવાર અથવા માછીમાર પરિવારની સુરક્ષામાં મોટો બદલાવ લાવી શકે છે."
                  : "Direct contributions support school learning materials, hygiene kits, solar street lights, and emergency relief provisions."}
              </p>
              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-charcoal/80">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                  <span>{isGujarati ? "આવકવેરા મુક્તિ (કલમ 80G)" : "Tax deduction under Section 80G"}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                  <span>{isGujarati ? "સીધા બેંક ટ્રાન્સફર (NEFT/RTGS)" : "Direct domestic & FCRA bank transfer"}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                  <span>{isGujarati ? "સત્તાવાર સ્ટેમ્પવાળી રસીદ" : "Official stamped donation certificate"}</span>
                </li>
              </ul>
            </div>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#0B3025] hover:bg-[#174B38] transition-colors"
            >
              <span>{t("donateNow")}</span>
            </Link>
          </div>
        </div>

        {/* 3. Dedicated CSR Partnership Section (Prompt Step 13 Specification) */}
        <section id="csr-partnerships" className="bg-gradient-to-br from-[#0B3025] to-[#174B38] text-white p-8 sm:p-12 md:p-14 rounded-3xl shadow-xl space-y-10 border border-white/10 scroll-mt-24">
          <div className="max-w-3xl space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-saffron border border-white/15">
              {isGujarati ? "કોર્પોરેટ સામાજિક જવાબદારી" : "CORPORATE SOCIAL RESPONSIBILITY"}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {isGujarati ? "સ્વદીપ સાથે CSR ભાગીદારી કરો" : "PARTNER WITH SWADEEP THROUGH CSR"}
            </h2>
            <p className="font-body text-cream/90 text-sm sm:text-base leading-relaxed">
              {isGujarati
                ? "ભારતીય કંપની અધિનિયમની કલમ ૧૩૫ હેઠળ માન્ય CSR પ્રકલ્પો માટે સ્વદીપ એક વિશ્વસનીય અને પરિણામલક્ષી સંસ્થા છે. અમે પારદર્શક ઓડિટિંગ, પાયાના સ્તરે સતત નિરીક્ષણ અને વાસ્તવિક સામાજિક પરિણામો સુનિશ્ચિત કરીએ છીએ."
                : "Swadeep Shikshan Vikas Sanstha is an experienced and audited grassroots partner for Section 135 CSR mandates. We offer turnkey program design, baseline surveys, measurable field implementation, and statutory reporting across our five focus areas:"}
            </p>
          </div>

          {/* Five Thematic CSR Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/15 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-saffron uppercase">01 • Education</span>
                <h3 className="font-heading font-bold text-lg text-white mt-1">
                  {isGujarati ? "શિક્ષણ" : "Education"}
                </h3>
                <p className="text-xs text-cream/80 leading-relaxed mt-1">
                  {isGujarati
                    ? "આંગણવાડી BaLA રૂપાંતરણ, ડિજિટલ સ્માર્ટ ક્લાસ અને લર્નિંગ રિસોર્સ સેન્ટર (LRC)."
                    : "BaLA anganwadi classrooms, school libraries, learning resource centres, and remedial coaching."}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/15 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-saffron uppercase">02 • Health</span>
                <h3 className="font-heading font-bold text-lg text-white mt-1">
                  {isGujarati ? "આરોગ્ય" : "Health"}
                </h3>
                <p className="text-xs text-cream/80 leading-relaxed mt-1">
                  {isGujarati
                    ? "દંત સ્વચ્છતા (Project Arogya), બાળકોનું પોષણ અને ગ્રામીણ તબીબી શિબિરો."
                    : "Preventive dental hygiene camps, pediatric health checks, malnutrition alleviation, and sanitation."}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/15 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-saffron uppercase">03 • Livelihood</span>
                <h3 className="font-heading font-bold text-lg text-white mt-1">
                  {isGujarati ? "આજીવિકા" : "Livelihood"}
                </h3>
                <p className="text-xs text-cream/80 leading-relaxed mt-1">
                  {isGujarati
                    ? "દરિયાકાંઠાના માછીમારો માટે સુરક્ષા કિટ્સ, સાગરશાળા અને મહિલા સ્વસહાય જૂથો (SHGs)."
                    : "Coastal fisheries modern equipment, Sagar Shala education, and women micro-enterprise SHGs."}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/15 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-saffron uppercase">04 • Infrastructure</span>
                <h3 className="font-heading font-bold text-lg text-white mt-1">
                  {isGujarati ? "ગ્રામીણ માળખાગત સુવિધાઓ" : "Rural Development"}
                </h3>
                <p className="text-xs text-cream/80 leading-relaxed mt-1">
                  {isGujarati
                    ? "સોલાર સ્ટ્રીટ લાઇટ્સ (૧,૦૫૦+ સ્થાપિત), પીવાનું શુદ્ધ પાણી અને શાળા સમારકામ."
                    : "Solar street lighting for village security, clean drinking water filtration, and school civil upgrades."}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/15 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-saffron uppercase">05 • Disaster Response</span>
                <h3 className="font-heading font-bold text-lg text-white mt-1">
                  {isGujarati ? "આપત્તિ વ્યવસ્થાપન" : "Disaster Response"}
                </h3>
                <p className="text-xs text-cream/80 leading-relaxed mt-1">
                  {isGujarati
                    ? "હોનારત, વાવાઝોડા અને મહામારી દરમિયાન તાત્કાલિક રાહત સામગ્રી અને પુનર્વસન."
                    : "Emergency relief mobilization, cyclone rehabilitation kits, community rescue training, and medical aid."}
                </p>
              </div>
            </div>
          </div>

          {/* CSR Compliance Badges and CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/15">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cream/80">
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon size={14} className="text-saffron" />
                <span>MCA CSR-1 Registered</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon size={14} className="text-saffron" />
                <span>Section 80G Certified</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon size={14} className="text-saffron" />
                <span>FCRA Approved</span>
              </span>
            </div>

            <Link
              href="/contact?subject=CSR+Partnership#contact-form"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#F47B2A] to-[#E06A1B] hover:from-[#E06A1B] hover:to-[#C8590F] shadow-lg shadow-[#F47B2A]/30 transition-all duration-200"
            >
              <span>{isGujarati ? "CSR ભાગીદારી અંગે ચર્ચા કરો →" : "Explore CSR Partnership →"}</span>
            </Link>
          </div>
        </section>

        {/* 4. Inquiry Contact Box */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-forest/10 shadow-sm text-center space-y-4">
          <h3 className="font-heading text-2xl font-bold text-[#0B3025]">
            {isGujarati ? "વિગતવાર ચર્ચા માટે સીધો સંપર્ક કરો" : "Have Questions About Collaborating?"}
          </h3>
          <p className="font-body text-sm sm:text-base text-charcoal/75 max-w-xl mx-auto">
            {isGujarati
              ? "અમારી ટીમ આપની સાથે વ્યક્તિગત રીતે વાતચીત કરી યોગ્ય સહયોગ પદ્ધતિ નક્કી કરવામાં મદદ કરશે."
              : "Our leadership team is available to discuss custom CSR programs, field visits, and community initiatives."}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
            <span className="text-charcoal/80">
              <span className="font-bold text-[#174B38]">{isGujarati ? "ફોન:" : "Phone:"}</span> {SITE_CONFIG.phone}
            </span>
            <span className="text-charcoal/40">•</span>
            <span className="text-charcoal/80">
              <span className="font-bold text-[#174B38]">{isGujarati ? "ઈમેલ:" : "Email:"}</span> {SITE_CONFIG.email}
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
