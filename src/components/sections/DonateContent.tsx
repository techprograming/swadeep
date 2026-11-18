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
  HeartIcon,
} from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function DonateContent() {
  const { isGujarati } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);


  // Post-Donation Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
    amount: "",
    utr: "",
    transferMode: "NEFT / RTGS / IMPS",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    website: "", // honeypot
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleScrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setStatusMessage("");

    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount) || 0,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus("success");
        setStatusMessage(
          data.message ||
            (isGujarati
              ? "આભાર! આપની દાન વિગતો સફળતાપૂર્વક નોંધાઈ છે. 80G રસીદ આપના ઈમેલ પર મોકલવામાં આવશે."
              : "Thank you! Your donation details have been submitted successfully. Your 80G certificate will be emailed after bank verification.")
        );
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          pan: "",
          amount: "",
          utr: "",
          transferMode: "NEFT / RTGS / IMPS",
          date: new Date().toISOString().split("T")[0],
          notes: "",
          website: "",
        });
      } else {
        setFormStatus("error");
        setStatusMessage(data.error || "Submission failed. Please check your details and try again.");
      }
    } catch {
      setFormStatus("error");
      setStatusMessage("Network error. Please try again later or contact us directly.");
    }
  };

  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="donate-hero-heading"
        className="relative py-20 lg:py-28 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden"
      >
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <Image
            src="/images/community.jpg"
            alt="Swadeep Community Development"
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
            {isGujarati ? "સહયોગ અને દાન" : "SUPPORT SWADEEP"}
          </h1>

          <p className="font-gujarati text-xl sm:text-2xl text-cream/90 font-medium">
            {isGujarati
              ? "આપનું યોગદાન શિક્ષણ, આરોગ્ય અને ટકાઉ વિકાસ દ્વારા સમુદાયોને સશક્ત બનાવવામાં મદદ કરશે"
              : "Your contribution can help strengthen communities through education, health and sustainable development."}
          </p>

          <p className="font-body text-cream/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            {isGujarati
              ? "સ્વદીપ એક નોંધાયેલ બિન-નફાકારક સંસ્થા છે. તમામ દાન આવકવેરા કાયદાની કલમ 80G હેઠળ કર મુક્તિ માટે પાત્ર છે."
              : "Swadeep Shikshan Vikas Sanstha is a registered non-profit organization. All donations are 100% transparent and eligible for tax exemption under Section 80G."}
          </p>
        </div>
      </section>

      {/* 2. Statutory Compliance Bar */}
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

      {/* 4. Bank Accounts Section (Bank Transfer & FCRA) */}
      <section id="bank-transfer-section" className="section-padding py-12 scroll-mt-24">
        <div className="container-wide max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest bg-forest-50 px-3.5 py-1.5 rounded-full border border-forest-200">
              {isGujarati ? "સત્તાવાર બેંકિંગ ખાતાની વિગતો" : "OFFICIAL BANK TRANSFER DETAILS"}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-forest-dark">
              {isGujarati ? "ડાયરેક્ટ બેંક ટ્રાન્સફર (NEFT / RTGS / IMPS / Wire)" : "Direct Bank Transfer"}
            </h2>
            <p className="font-body text-charcoal/75 text-sm sm:text-base">
              {isGujarati
                ? "આપના બેંક એકાઉન્ટ અથવા નેટબેંકિંગ દ્વારા સીધા સ્વદીપના સત્તાવાર ખાતામાં રકમ ટ્રાન્સફર કરો."
                : "Transfer funds directly from your net banking or banking app into Swadeep Shikshan Vikas Sanstha's audited account."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* DOMESTIC BANK TRANSFER */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-forest/20 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-5">
                <div className="border-b border-cream-dark pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-forest block">
                      {isGujarati ? "સ્થાનિક ભારતીય દાન" : "BANK TRANSFER (DOMESTIC)"}
                    </span>
                    <span className="text-xs font-bold bg-forest-50 text-forest px-2.5 py-1 rounded-full border border-forest-200">
                      INR • NEFT / RTGS / IMPS
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-forest-dark mt-1">
                    {isGujarati ? "સ્થાનિક બેંક ખાતાની વિગત" : "Domestic Bank Account"}
                  </h3>
                </div>

                <div className="space-y-3 font-body text-charcoal/90 text-sm sm:text-base">
                  {/* Account Name */}
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">{isGujarati ? "ખાતાનું નામ:" : "Account Name:"}</span>
                    <span className="font-bold text-forest-dark sm:text-right">{BANKING_DETAILS.domestic.accountName}</span>
                  </div>

                  {/* Bank Name */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">{isGujarati ? "બેંકનું નામ:" : "Bank:"}</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-semibold text-forest-dark sm:text-right">{BANKING_DETAILS.domestic.bankName}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BANKING_DETAILS.domestic.bankName, "bankName")}
                        className="text-xs px-2 py-1 bg-cream-dark hover:bg-forest/10 text-forest-dark rounded font-semibold transition-colors"
                        title="Copy bank name"
                      >
                        {copiedKey === "bankName" ? "✓ Copied" : "COPY"}
                      </button>
                    </div>
                  </div>

                  {/* Branch */}
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">{isGujarati ? "શાખા:" : "Branch:"}</span>
                    <span className="font-semibold text-forest-dark sm:text-right">{BANKING_DETAILS.domestic.branch}</span>
                  </div>

                  {/* Account Number */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">{isGujarati ? "ખાતા નંબર:" : "Account Number:"}</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-forest text-lg">{BANKING_DETAILS.domestic.accountNumber}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BANKING_DETAILS.domestic.accountNumber, "domesticAcc")}
                        className="text-xs px-2.5 py-1 bg-[#174B38] hover:bg-[#0B3025] text-white rounded font-bold transition-colors"
                        title="Copy account number"
                      >
                        {copiedKey === "domesticAcc" ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>

                  {/* IFSC */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">{isGujarati ? "IFSC કોડ:" : "IFSC:"}</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-saffron-dark text-base">{BANKING_DETAILS.domestic.ifsc}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BANKING_DETAILS.domestic.ifsc, "domesticIfsc")}
                        className="text-xs px-2.5 py-1 bg-[#F47B2A] hover:bg-[#E06A1B] text-white rounded font-bold transition-colors"
                        title="Copy IFSC code"
                      >
                        {copiedKey === "domesticIfsc" ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>

                  {/* MICR */}
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">MICR Code:</span>
                    <span className="font-mono font-medium text-charcoal/80 sm:text-right">{BANKING_DETAILS.domestic.micr}</span>
                  </div>

                  {/* Branch Address */}
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

            {/* FCRA / FOREIGN DONATIONS */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-forest/20 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-5">
                <div className="border-b border-cream-dark pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-saffron block">
                      {isGujarati ? "વિદેશી અનુદાન (FCRA)" : "FCRA / FOREIGN DONATION"}
                    </span>
                    <span className="text-xs font-bold bg-amber-50 text-amber-900 px-2.5 py-1 rounded-full border border-amber-200">
                      FCRA Authorized • Wire Transfer
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-forest-dark mt-1">
                    {isGujarati ? "FCRA બેંક ખાતાની વિગત" : "Official FCRA Information"}
                  </h3>
                </div>

                <div className="space-y-3 font-body text-charcoal/90 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">{isGujarati ? "FCRA રજિ. નંબર:" : "FCRA Reg. Number:"}</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-forest-dark sm:text-right">{BANKING_DETAILS.fcra.registrationNumber}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BANKING_DETAILS.fcra.registrationNumber, "fcraReg")}
                        className="text-xs px-2 py-1 bg-cream-dark hover:bg-forest/10 text-forest-dark rounded font-semibold transition-colors"
                      >
                        {copiedKey === "fcraReg" ? "✓ Copied" : "COPY"}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">{isGujarati ? "બેંકનું નામ:" : "Bank:"}</span>
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
                        className="text-xs px-2.5 py-1 bg-[#174B38] hover:bg-[#0B3025] text-white rounded font-bold transition-colors"
                      >
                        {copiedKey === "fcraAcc" ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">{isGujarati ? "IFSC કોડ:" : "IFSC:"}</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-saffron-dark text-base">{BANKING_DETAILS.fcra.ifsc}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BANKING_DETAILS.fcra.ifsc, "fcraIfsc")}
                        className="text-xs px-2.5 py-1 bg-[#F47B2A] hover:bg-[#E06A1B] text-white rounded font-bold transition-colors"
                      >
                        {copiedKey === "fcraIfsc" ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-forest/5 gap-2">
                    <span className="text-charcoal/70">SWIFT / BIC Code:</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-bold text-forest-dark sm:text-right">{BANKING_DETAILS.fcra.swift}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BANKING_DETAILS.fcra.swift, "fcraSwift")}
                        className="text-xs px-2 py-1 bg-cream-dark hover:bg-forest/10 text-forest-dark rounded font-semibold transition-colors"
                      >
                        {copiedKey === "fcraSwift" ? "✓ Copied" : "COPY"}
                      </button>
                    </div>
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
                    ? "વિદેશી મુદ્રા નિયમન અધિનિયમ (FCRA) હેઠળ ભારત સરકારના ગૃહ મંત્રાલય દ્વારા અધિકૃત."
                    : "Authorized by Ministry of Home Affairs, Government of India under FCRA Act."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AFTER DONATION: SUBMIT UTR / DONATION DETAILS FORM (Prompt Step 12 Specification) */}
      <section id="after-donation-form" className="section-padding py-16 bg-cream-dark/40 border-t border-forest/10 scroll-mt-24">
        <div className="container-wide max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
              {isGujarati ? "દાન કર્યા પછી" : "AFTER DONATION"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-forest-dark">
              {isGujarati ? "દાનની વિગત અને UTR નંબર સબમિટ કરો" : "Submit UTR / Donation Details"}
            </h2>
            <p className="font-body text-charcoal/75 text-sm sm:text-base max-w-xl mx-auto">
              {isGujarati
                ? "દાન પૂર્ણ કર્યા પછી આપનો UTR / સંદર્ભ નંબર અને પાન કાર્ડ વિગતો સબમિટ કરો જેથી અમે આપની 80G ટેક્સ રસીદ જારી કરી શકીએ."
                : "After transferring funds, submit your transaction UTR reference and PAN details to receive your official Section 80G tax exemption certificate."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-forest/15">
            {formStatus === "success" ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest-50 text-forest mx-auto flex items-center justify-center">
                  <CheckCircleIcon size={36} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-forest-dark">
                  {isGujarati ? "વિગતો સફળતાપૂર્વક સબમિટ થઈ!" : "Details Submitted Successfully!"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  {statusMessage}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="px-6 py-2.5 rounded-full text-sm font-bold text-forest border border-forest/30 hover:bg-forest/5 transition-colors"
                  >
                    {isGujarati ? "બીજું ટ્રાન્ઝેક્શન નોંધો" : "Submit Another Contribution"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="hidden"
                  aria-hidden="true"
                />

                {formStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
                    {statusMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="donor-name" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {isGujarati ? "દાતાનું પૂરું નામ *" : "Donor Full Name *"}
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="donor-email" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {isGujarati ? "ઈમેલ સરનામું (80G રસીદ માટે) *" : "Email Address (for 80G receipt) *"}
                    </label>
                    <input
                      id="donor-email"
                      type="email"
                      required
                      placeholder="donor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>

                  {/* Mobile Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="donor-phone" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {isGujarati ? "મોબાઈલ નંબર *" : "Mobile Phone Number *"}
                    </label>
                    <input
                      id="donor-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>

                  {/* PAN Card */}
                  <div className="space-y-1.5">
                    <label htmlFor="donor-pan" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {isGujarati ? "પાન કાર્ડ નંબર (80G મુક્તિ માટે ફરજિયાત) *" : "PAN Number (Mandatory for 80G) *"}
                    </label>
                    <input
                      id="donor-pan"
                      type="text"
                      required
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none font-mono uppercase text-sm font-bold transition-colors"
                    />
                  </div>

                  {/* Amount */}
                  <div className="space-y-1.5">
                    <label htmlFor="donor-amount" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {isGujarati ? "ટ્રાન્સફર કરેલી રકમ (₹) *" : "Donated Amount (INR ₹) *"}
                    </label>
                    <input
                      id="donor-amount"
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 5000"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-bold text-forest-dark transition-colors"
                    />
                  </div>

                  {/* UTR / Transaction Reference */}
                  <div className="space-y-1.5">
                    <label htmlFor="donor-utr" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {isGujarati ? "UTR / સંદર્ભ નંબર *" : "UTR / Transaction Reference No. *"}
                    </label>
                    <input
                      id="donor-utr"
                      type="text"
                      required
                      placeholder="e.g. 331456789012"
                      value={formData.utr}
                      onChange={(e) => setFormData({ ...formData, utr: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none font-mono text-sm font-bold transition-colors"
                    />
                  </div>

                  {/* Transfer Mode */}
                  <div className="space-y-1.5">
                    <label htmlFor="donor-mode" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {isGujarati ? "ટ્રાન્સફર મોડ" : "Payment / Transfer Mode"}
                    </label>
                    <select
                      id="donor-mode"
                      value={formData.transferMode}
                      onChange={(e) => setFormData({ ...formData, transferMode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium bg-white transition-colors"
                    >
                      <option value="NEFT / RTGS / IMPS">NEFT / RTGS / IMPS</option>
                      <option value="UPI / Net Banking">UPI / Net Banking</option>
                      <option value="FCRA Wire Transfer">International Wire Transfer (FCRA)</option>
                      <option value="Cheque / DD">Bank Cheque / DD</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <label htmlFor="donor-date" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {isGujarati ? "ટ્રાન્સફર તારીખ *" : "Date of Transfer *"}
                    </label>
                    <input
                      id="donor-date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>
                </div>

                {/* Notes / Special Instructions */}
                <div className="space-y-1.5">
                  <label htmlFor="donor-notes" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                    {isGujarati ? "કાર્યક્રમ પસંદગી અથવા વિશેષ નોંધ (વૈકલ્પિક)" : "Program Preference or Note (Optional)"}
                  </label>
                  <textarea
                    id="donor-notes"
                    rows={2}
                    placeholder={
                      isGujarati
                        ? "ઉદાહરણ: બાળ શિક્ષણ, આરોગ્ય શિબિર અથવા આંગણવાડી વિકાસ માટે..."
                        : "e.g., Preference for child education, dental health, or disaster relief..."
                    }
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm transition-colors"
                  />
                </div>

                {/* Submit Details Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 rounded-xl text-base font-extrabold text-white bg-[#174B38] hover:bg-[#0B3025] disabled:opacity-60 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {formStatus === "submitting" ? (
                      <span>{isGujarati ? "સબમિટ થઈ રહ્યું છે..." : "Submitting Details..."}</span>
                    ) : (
                      <>
                        <CheckCircleIcon size={18} />
                        <span>{isGujarati ? "દાનની વિગતો સબમિટ કરો" : "SUBMIT DETAILS"}</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-charcoal/60 mt-2">
                    {isGujarati
                      ? "સબમિટ કર્યા પછી અમારી ફાયનાન્સ ટીમ બેંક સાથે વેરિફાઈ કરી આપને ઈમેલ દ્વારા 80G સર્ટિફિકેટ મોકલશે."
                      : "Your information is secure. Our team verifies the transaction with the bank and emails your 80G certificate within 2-3 business days."}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 6. Contact for Queries */}
      <section className="py-12 bg-white border-t border-forest/10">
        <div className="container-wide max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="font-heading font-extrabold text-xl text-forest-dark">
            {isGujarati ? "દાન અંગે કોઈ પ્રશ્ન છે?" : "Have Questions About Donating?"}
          </h3>
          <p className="font-body text-charcoal/75 text-sm sm:text-base max-w-xl mx-auto">
            {isGujarati
              ? "દાન પદ્ધતિ, 80G રસીદ અથવા સીએસઆર ભાગીદારી માટે અમારી સાથે સીધો સંપર્ક કરો:"
              : "For inquiries regarding receipts, 80G tax exemptions, or CSR grants, please reach out directly:"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm font-semibold">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 text-forest-dark hover:text-forest transition-colors"
            >
              <PhoneCallIcon size={16} className="text-forest" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.donationEmail}`}
              className="inline-flex items-center gap-2 text-forest-dark hover:text-forest transition-colors"
            >
              <MailIcon size={16} className="text-saffron" />
              <span>{SITE_CONFIG.donationEmail}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
