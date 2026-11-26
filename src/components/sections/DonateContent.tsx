"use client";

import React, { useState } from "react";
import Link from "next/link";
import GetInvolvedSubNav from "@/components/ui/GetInvolvedSubNav";
import {
  ReceiptTextIcon,
  LandmarkIcon,
  MailIcon,
  PhoneCallIcon,
  CheckCircleIcon,
  HeartIcon,
  MapPinIcon,
} from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function DonateContent() {
  const { isGujarati } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Post-Donation UTR Form State
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
            ("Thank you! Your donation details have been submitted successfully. Your 80G certificate will be emailed after bank verification.")
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
    <main id="main-content" className="flex-1 bg-cream min-h-screen">
      {/* Sub Navigation Bar */}
      <GetInvolvedSubNav activeTab="donation" />

      {/* Hero Banner — Exact Original Content */}
      <section
        aria-labelledby="donate-hero-heading"
        className="relative py-16 sm:py-20 bg-gradient-to-br from-[#0B3025] via-[#174B38] to-[#205943] text-cream overflow-hidden"
      >
        <div className="container-wide section-padding relative z-10 max-w-4xl mx-auto space-y-4 text-center">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-saffron border border-white/15">
            DONATE TO THE CAUSE
          </span>

          <h1
            id="donate-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            Donation
          </h1>

          <p className="font-body text-cream/90 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed pt-2">
            Swadeep is a non-profit organization and hence, any donation given to organization is liable for tax exemption.
          </p>

          <p className="font-body text-cream/80 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            You may either transfer donation directly to organization bank account or send cheque/draft in favour of Swadeep Shikshan Vikas Sanstha at 21, Abhinandan Park Society, Opp. Vastrapur Railway Station, Butbhavani Railway Crossing, Vejalpur – Ahmedabad -380051. Contact: kalyan Dangar 09428309408.
          </p>
        </div>
      </section>

      {/* Financial Details: Bank Transfer Section */}
      <section className="py-12 sm:py-16">
        <div className="container-wide max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          
          {/* Section Header */}
          <div className="border-b border-forest/10 pb-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
              Financial Details:
            </h2>
            <div className="mt-2 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-forest/15 shadow-sm text-sm sm:text-base font-bold text-[#0B3025]">
              <span>Permanent Account Number (PAN):</span>
              <span className="font-mono text-[#F47B2A] font-extrabold">AAKTS6375E</span>
              <button
                type="button"
                onClick={() => handleCopy("AAKTS6375E", "pan")}
                className="ml-2 text-xs px-2.5 py-1 bg-cream-dark hover:bg-forest/10 text-forest-dark rounded font-semibold transition-colors"
                title="Copy PAN"
              >
                {copiedKey === "pan" ? "✓ Copied" : "COPY"}
              </button>
            </div>
          </div>

          {/* Bank Accounts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 1. NON FCRA Bank A/C Details (For Local Donations – INDIA) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-forest/20 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="border-b border-forest/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#174B38] block">
                    NON FCRA Bank A/C Details (For Local Donations – INDIA)
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#0B3025] mt-1">
                    Bank of India
                  </h3>
                </div>

                <div className="space-y-3 font-body text-charcoal/90 text-sm sm:text-base">
                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-charcoal/70">Bank Account Name:</span>
                    <span className="font-bold text-[#0B3025] sm:text-right">SWADEEP SHIKSHAN VIKAS SANSTHA</span>
                  </div>

                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-charcoal/70">Bank Name:</span>
                    <span className="font-semibold text-[#0B3025] sm:text-right">Bank of India</span>
                  </div>

                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-charcoal/70">Branch:</span>
                    <span className="font-semibold text-[#0B3025] sm:text-right">SIHOR</span>
                  </div>

                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-charcoal/70">Account:</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-[#174B38] text-lg">320810110005282.</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("320810110005282", "domesticAcc")}
                        className="text-xs px-2.5 py-1 bg-[#174B38] hover:bg-[#0B3025] text-white rounded font-bold transition-colors"
                        title="Copy account number"
                      >
                        {copiedKey === "domesticAcc" ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>

                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-charcoal/70">IFSC:</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-[#F47B2A] text-base">BKID0003208</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("BKID0003208", "domesticIfsc")}
                        className="text-xs px-2.5 py-1 bg-[#F47B2A] hover:bg-[#E06A1B] text-white rounded font-bold transition-colors"
                        title="Copy IFSC code"
                      >
                        {copiedKey === "domesticIfsc" ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>

                  <div className="py-2 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-charcoal/70">Address:</span>
                    <span className="font-medium text-[#0B3025] sm:text-right text-xs sm:text-sm">
                      184/A Anand Hall station road- SIHOR, District Bhavnagar
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-forest/10">
                <span className="text-xs text-charcoal/70 block">
                  Eligible for 50% tax deduction under Section 80G for Indian taxpayers.
                </span>
              </div>
            </div>

            {/* 2. FCRA Bank A/C Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-forest/20 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="border-b border-forest/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A] block">
                    FCRA Bank A/C Details
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#0B3025] mt-1">
                    State Bank of India.
                  </h3>
                </div>

                <div className="space-y-3 font-body text-charcoal/90 text-sm sm:text-base">
                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-charcoal/70">FCRA Registration Number:</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-bold text-[#0B3025]">041980081</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("041980081", "fcraReg")}
                        className="text-xs px-2 py-1 bg-cream-dark hover:bg-forest/10 text-forest-dark rounded font-semibold transition-colors"
                      >
                        {copiedKey === "fcraReg" ? "✓ Copied" : "COPY"}
                      </button>
                    </div>
                  </div>

                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-charcoal/70">Name of Bank:</span>
                    <span className="font-semibold text-[#0B3025] sm:text-right">State Bank of India.</span>
                  </div>

                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-charcoal/70">BRANCH Name and CODE:</span>
                    <span className="font-semibold text-[#0B3025] sm:text-right">SBI New Delhi Main Branch, (00691)</span>
                  </div>

                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-charcoal/70">Account No.:</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-[#174B38] text-lg">40102583793</span>
                      <span className="text-xs text-charcoal/60">(FCRA Savings Account)</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("40102583793", "fcraAcc")}
                        className="text-xs px-2.5 py-1 bg-[#174B38] hover:bg-[#0B3025] text-white rounded font-bold transition-colors"
                        title="Copy account number"
                      >
                        {copiedKey === "fcraAcc" ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>

                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-charcoal/70">IFSC:</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-black text-[#F47B2A] text-base">SBIN0000691</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("SBIN0000691", "fcraIfsc")}
                        className="text-xs px-2.5 py-1 bg-[#F47B2A] hover:bg-[#E06A1B] text-white rounded font-bold transition-colors"
                        title="Copy IFSC code"
                      >
                        {copiedKey === "fcraIfsc" ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>

                  <div className="py-2 border-b border-forest/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-charcoal/70">SWIFT:</span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="font-mono font-bold text-[#0B3025]">SBININBB104</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("SBININBB104", "fcraSwift")}
                        className="text-xs px-2 py-1 bg-cream-dark hover:bg-forest/10 text-forest-dark rounded font-semibold transition-colors"
                      >
                        {copiedKey === "fcraSwift" ? "✓ Copied" : "COPY"}
                      </button>
                    </div>
                  </div>

                  <div className="py-2 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-charcoal/70">ADDRESS:</span>
                    <span className="font-medium text-[#0B3025] sm:text-right text-xs sm:text-sm">
                      SBI New Delhi Main Branch, FCRA. Foreign Exchange Division, 11, Parliament Street, New Delhi- 110001.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-forest/10">
                <span className="text-xs text-charcoal/70 block">
                  Foreign Contribution Regulation Act (FCRA) registered under Ministry of Home Affairs, Government of India.
                </span>
              </div>
            </div>

          </div>

          {/* Feedback Section — Verbatim Text */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-forest/15 shadow-sm text-center space-y-3">
            <p className="font-body text-charcoal/80 text-sm sm:text-base">
              For any feedback on our fundraising efforts, please contact{" "}
              <a
                href="mailto:donation@swadeep.org"
                className="font-bold text-[#F47B2A] hover:underline"
              >
                donation@swadeep.org
              </a>
            </p>
          </div>

          {/* UTR Submission Form to receive 80G Receipt */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-forest/15 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
                {"AFTER DONATION"}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-forest-dark">
                {"Submit UTR / Donation Details for 80G Receipt"}
              </h3>
              <p className="font-body text-charcoal/75 text-sm sm:text-base max-w-xl mx-auto">
                {"After transferring funds, submit your transaction UTR reference and PAN details to receive your official Section 80G tax exemption certificate."}
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest-50 text-forest mx-auto flex items-center justify-center">
                  <CheckCircleIcon size={36} />
                </div>
                <h4 className="font-heading text-2xl font-bold text-forest-dark">
                  {"Details Submitted Successfully!"}
                </h4>
                <p className="font-body text-charcoal/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  {statusMessage}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="px-6 py-2.5 rounded-full text-sm font-bold text-forest border border-forest/30 hover:bg-forest/5 transition-colors"
                  >
                    {"Submit Another Contribution"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <div className="space-y-1.5">
                    <label htmlFor="donor-name" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {"Donor Full Name *"}
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

                  <div className="space-y-1.5">
                    <label htmlFor="donor-email" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {"Email Address (for 80G receipt) *"}
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

                  <div className="space-y-1.5">
                    <label htmlFor="donor-phone" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {"Mobile Phone Number *"}
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

                  <div className="space-y-1.5">
                    <label htmlFor="donor-pan" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {"PAN Number (Mandatory for 80G) *"}
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

                  <div className="space-y-1.5">
                    <label htmlFor="donor-amount" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {"Donated Amount (INR ₹) *"}
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

                  <div className="space-y-1.5">
                    <label htmlFor="donor-utr" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {"UTR / Transaction Reference No. *"}
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

                  <div className="space-y-1.5">
                    <label htmlFor="donor-mode" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {"Payment / Transfer Mode"}
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

                  <div className="space-y-1.5">
                    <label htmlFor="donor-date" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      {"Date of Transfer *"}
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

                <div className="space-y-1.5">
                  <label htmlFor="donor-notes" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                    {"Program Preference or Note (Optional)"}
                  </label>
                  <textarea
                    id="donor-notes"
                    rows={2}
                    placeholder={
                      "e.g., Preference for child education, dental health, or disaster relief..."
                    }
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 rounded-xl text-base font-extrabold text-white bg-[#174B38] hover:bg-[#0B3025] disabled:opacity-60 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {formStatus === "submitting" ? (
                      <span>{"Submitting Details..."}</span>
                    ) : (
                      <>
                        <CheckCircleIcon size={18} />
                        <span>{"SUBMIT DETAILS"}</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-charcoal/60 mt-2">
                    {"Your information is secure. Our team verifies the transaction with the bank and emails your 80G certificate within 2-3 business days."}
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
