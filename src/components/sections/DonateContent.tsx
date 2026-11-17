"use client";

import Image from "next/image";

import React, { useState } from "react";
import Link from "next/link";
import { BANKING_DETAILS, SITE_CONFIG, OFFICE_LOCATIONS } from "@/lib/constants";
import {
  ReceiptTextIcon,
  LandmarkIcon,
  MailIcon,
  PhoneCallIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function DonateContent() {
  const { isGujarati } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="donate-hero-heading"
        className="relative py-20 lg:py-28 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden"
      >
        {/* Enhanced Background Image */}
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
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-saffron-light border border-white/15">
            <span>{isGujarati ? SITE_CONFIG.nameGujarati : SITE_CONFIG.name}</span>
          </div>

          <h1
            id="donate-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            {isGujarati ? "સહયોગ અને દાન" : "DONATE TO THE CAUSE"}
          </h1>

          <p className="font-gujarati text-xl sm:text-2xl text-cream/90 font-medium">
            {isGujarati
              ? "આપનું દાન વંચિત બાળકોના શિક્ષણ અને સમુદાયના ઉત્થાનમાં મદદરૂપ થશે"
              : "દાન કરો — જરૂરિયાતમંદ લોકોના ઉત્થાન માટે સહયોગ"}
          </p>

          <p className="font-body text-cream/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            {isGujarati
              ? "સ્વદીપ એક નોંધાયેલ બિન-નફાકારક સામાજિક સંસ્થા છે. સંસ્થાને આપવામાં આવતું તમામ દાન આવકવેરા કાયદાની કલમ 80G હેઠળ કર મુક્તિ માટે પાત્ર છે."
              : "Swadeep is a non-profit organization and hence, any donation given to organization is liable for tax exemption under Section 80G of the Income Tax Act."}
          </p>
        </div>
      </section>

      {/* 2. Tax Exemption & Statutory Transparency Bar */}
      <section className="bg-white border-b border-forest/10 py-6" aria-label="Statutory compliance and registrations">
        <div className="container-wide max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-charcoal/85">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-forest" />
              <span>{isGujarati ? "કલમ 80G કર મુક્તિ માન્ય" : "Section 80G Tax Exemption"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-forest" />
              <span>PAN: <strong className="font-mono text-forest-dark">{BANKING_DETAILS.pan}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-forest" />
              <span>FCRA: <strong className="font-mono text-forest-dark">{BANKING_DETAILS.fcraNumber}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-forest" />
              <span>Trust Reg: <strong className="font-mono text-forest-dark">{BANKING_DETAILS.trustRegistrationNo}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Donation Content */}
      <section className="section-padding py-16 lg:py-24">
        <div className="container-wide max-w-5xl mx-auto space-y-12">
          {/* Step-by-Step 80G Receipt Guide */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-6">
            <div className="border-b border-cream-dark pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron block">
                {isGujarati ? "દાન પ્રક્રિયા અને 80G રસીદ" : "DONATION PROCESS & 80G TAX CERTIFICATE"}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-forest-dark mt-1">
                {isGujarati ? "દાન આપવાની સરળ પદ્ધતિ અને ટેક્સ રસીદ" : "How Your Donation & Tax Receipt Works"}
              </h2>
              <p className="font-body text-charcoal/80 text-sm sm:text-base mt-2">
                {isGujarati
                  ? "તમામ દાન કલમ 80G હેઠળ કર કપાત માટે પાત્ર છે. દાન આપી સત્તાવાર ટેક્સ પ્રમાણપત્ર મેળવવા માટે આ સરળ પગલાં અનુસરો:"
                  : "All donations are eligible for tax deduction under Section 80G. Follow these three simple steps to complete your contribution and receive your tax certificate:"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {BANKING_DETAILS.receiptSteps.map((stepItem) => (
                <div
                  key={stepItem.step}
                  className="p-6 rounded-2xl bg-cream-dark/50 border border-forest/10 space-y-3 relative flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="font-heading font-black text-2xl text-saffron block">
                      {stepItem.step}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-forest-dark">
                      {isGujarati ? stepItem.titleGu : stepItem.title}
                    </h3>
                    <p className="font-body text-charcoal/80 text-sm leading-relaxed">
                      {isGujarati ? stepItem.descriptionGu : stepItem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Bank Accounts Grid */}
          <div id="banking-details" className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-28">
            {/* Non-FCRA Local Donations (Domestic India) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-forest/20 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-5">
                <div className="border-b border-cream-dark pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-forest block">
                      {isGujarati ? "સ્થાનિક ભારતીય દાન માટે" : "FOR LOCAL DONATIONS (INDIA)"}
                    </span>
                    <span className="text-xs font-bold bg-forest-50 text-forest px-2.5 py-1 rounded-full border border-forest-200">
                      INR • NEFT / RTGS / IMPS
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-forest-dark mt-1">
                    {isGujarati ? "સ્થાનિક બેંક ખાતાની વિગત" : "Domestic Bank Account Details"}
                  </h3>
                </div>

                <div className="space-y-3 font-body text-charcoal/90 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">{isGujarati ? "ખાતાનું નામ:" : "Account Name:"}</span>
                    <span className="font-bold text-forest-dark sm:text-right">{BANKING_DETAILS.domestic.accountName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">{isGujarati ? "બેંકનું નામ:" : "Bank Name:"}</span>
                    <span className="font-semibold text-forest-dark sm:text-right">{BANKING_DETAILS.domestic.bankName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">{isGujarati ? "શાખા:" : "Branch:"}</span>
                    <span className="font-semibold text-forest-dark sm:text-right">{BANKING_DETAILS.domestic.branch}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">{isGujarati ? "ખાતા નંબર:" : "Account Number:"}</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-forest text-lg">{BANKING_DETAILS.domestic.accountNumber}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BANKING_DETAILS.domestic.accountNumber, "domesticAcc")}
                        className="text-xs px-2 py-1 bg-cream-dark hover:bg-forest/10 text-forest-dark rounded font-semibold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-forest"
                        title="Copy account number"
                      >
                        {copiedKey === "domesticAcc" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">{isGujarati ? "IFSC કોડ:" : "IFSC Code:"}</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-saffron-dark text-base">{BANKING_DETAILS.domestic.ifsc}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BANKING_DETAILS.domestic.ifsc, "domesticIfsc")}
                        className="text-xs px-2 py-1 bg-cream-dark hover:bg-saffron/10 text-saffron-dark rounded font-semibold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-saffron"
                        title="Copy IFSC code"
                      >
                        {copiedKey === "domesticIfsc" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">MICR Code:</span>
                    <span className="font-mono font-medium text-charcoal/80 sm:text-right">{BANKING_DETAILS.domestic.micr}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                    <span className="text-charcoal/70">{isGujarati ? "શાખા સરનામું:" : "Branch Address:"}</span>
                    <span className="font-medium text-forest-dark sm:text-right text-xs sm:text-sm">{BANKING_DETAILS.domestic.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-dark">
                <span className="text-xs text-charcoal/70 block">
                  {isGujarati
                    ? "ભારતીય કરદાતાઓ માટે કલમ 80G હેઠળ ૫૦% આવકવેરા મુક્તિ લાયક."
                    : "Eligible for 50% tax deduction under Section 80G for Indian tax payers."}
                </span>
              </div>
            </div>

            {/* FCRA Foreign Donations (International Remittance) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-forest/20 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-5">
                <div className="border-b border-cream-dark pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-saffron block">
                      {isGujarati ? "વિદેશી અનુદાન (FCRA)" : "FOREIGN DONATIONS / REMITTANCE"}
                    </span>
                    <span className="text-xs font-bold bg-amber-50 text-amber-900 px-2.5 py-1 rounded-full border border-amber-200">
                      FCRA Authorized • Wire Transfer
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-forest-dark mt-1">
                    {isGujarati ? "FCRA બેંક ખાતાની વિગત" : "FCRA Bank Account Details"}
                  </h3>
                </div>

                <div className="space-y-3 font-body text-charcoal/90 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">{isGujarati ? "FCRA રજિ. નંબર:" : "FCRA Reg. Number:"}</span>
                    <span className="font-mono font-black text-forest-dark sm:text-right">{BANKING_DETAILS.fcra.registrationNumber}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">{isGujarati ? "બેંકનું નામ:" : "Bank Name:"}</span>
                    <span className="font-semibold text-forest-dark sm:text-right">{BANKING_DETAILS.fcra.bankName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">{isGujarati ? "શાખા:" : "Branch:"}</span>
                    <span className="font-semibold text-forest-dark sm:text-right">{BANKING_DETAILS.fcra.branch}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">{isGujarati ? "ખાતા નંબર:" : "Account Number:"}</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-forest text-lg">{BANKING_DETAILS.fcra.accountNumber}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BANKING_DETAILS.fcra.accountNumber, "fcraAcc")}
                        className="text-xs px-2 py-1 bg-cream-dark hover:bg-forest/10 text-forest-dark rounded font-semibold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-forest"
                        title="Copy FCRA account number"
                      >
                        {copiedKey === "fcraAcc" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">SWIFT Code:</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-saffron-dark text-base">{BANKING_DETAILS.fcra.swift}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BANKING_DETAILS.fcra.swift, "fcraSwift")}
                        className="text-xs px-2 py-1 bg-cream-dark hover:bg-saffron/10 text-saffron-dark rounded font-semibold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-saffron"
                        title="Copy SWIFT code"
                      >
                        {copiedKey === "fcraSwift" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">{isGujarati ? "IFSC કોડ:" : "IFSC Code:"}</span>
                    <span className="font-mono font-medium text-charcoal/80 sm:text-right">{BANKING_DETAILS.fcra.ifsc}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                    <span className="text-charcoal/70">{isGujarati ? "શાખા સરનામું:" : "Branch Address:"}</span>
                    <span className="font-medium text-forest-dark sm:text-right text-xs sm:text-sm">{BANKING_DETAILS.fcra.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-dark">
                <span className="text-xs text-charcoal/70 block">
                  {isGujarati
                    ? "વિદેશી ચલણ (USD, GBP, EUR વગેરે) માં દાન સ્વીકારવા માટે ભારત સરકાર દ્વારા અધિકૃત ખાતું."
                    : "Authorized designated bank account for foreign inward remittances in international currencies."}
                </span>
              </div>
            </div>
          </div>

          {/* Cheque / Demand Draft Notice */}
          <div className="bg-forest-50/60 rounded-3xl p-6 sm:p-8 border border-forest/20 space-y-3">
            <h3 className="font-heading font-bold text-lg text-forest-dark flex items-center gap-2">
              <ReceiptTextIcon className="w-5 h-5 text-forest" />
              <span>{isGujarati ? "ચેક અથવા ડિમાન્ડ ડ્રાફ્ટ (DD) દ્વારા દાન" : "Donation via Cheque or Demand Draft"}</span>
            </h3>
            <p className="font-body text-charcoal/85 text-sm sm:text-base leading-relaxed">
              {isGujarati
                ? "આપ 'Swadeep Shikshan Vikas Sanstha' ના નામે અમદાવાદ ખાતે ચૂકવવાપાત્ર ચેક અથવા ડીડી અમારા મુખ્ય કાર્યાલયના સરનામે મોકલી શકો છો: ૨૧, અભિનંદન પાર્ક સોસાયટી, પ્રેરણાતીર્થ દેરાસર રોડ, પ્રહલાદ નગર, અમદાવાદ, ગુજરાત ૩૮૦૦૧૫. સંપર્ક: કલ્યાણ ડાંગર (૦૯૪૨૮૩૦૯૪૦૮)."
                : BANKING_DETAILS.chequeDetails}
            </p>
          </div>

          {/* Donor Support Contact */}
          <div className="text-center pt-4">
            <p className="text-charcoal/70 text-sm">
              {isGujarati ? "દાન સંબંધિત કોઈ પ્રશ્ન છે? અમારો સંપર્ક કરો: " : "Have questions about donating or need assistance? Reach out to us at: "}
              <a href={`mailto:${BANKING_DETAILS.feedbackEmail}`} className="font-bold text-forest hover:underline">
                {BANKING_DETAILS.feedbackEmail}
              </a>
              {" "}{isGujarati ? "અથવા ફોન: " : "or call "}{" "}
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="font-bold text-forest hover:underline">
                {BANKING_DETAILS.donorHelpline}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
