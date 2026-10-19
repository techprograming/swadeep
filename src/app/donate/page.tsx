import type { Metadata } from "next";
import Link from "next/link";
import { BANKING_DETAILS, SITE_CONFIG, OFFICE_LOCATIONS } from "@/lib/constants";
import {
  ReceiptTextIcon,
  LandmarkIcon,
  MailIcon,
  PhoneCallIcon,
  MapPinIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Donation | Tax Exemption Under Section 80G | Swadeep Shikshan Vikas Sanstha",
  description:
    "Swadeep is a registered non-profit organization. Donations are eligible for tax exemption under Section 80G. View domestic Bank of India and foreign FCRA SBI account details.",
};

export default function DonatePage() {
  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="donate-hero-heading"
        className="relative py-20 lg:py-28 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container-wide section-padding relative z-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-saffron-light border border-white/15">
            <span>Swadeep Shikshan Vikas Sanstha</span>
          </div>

          <h1
            id="donate-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            DONATE TO THE CAUSE
          </h1>

          <p className="font-gujarati text-xl sm:text-2xl text-cream/90 font-medium">
            દાન કરો — જરૂરિયાતમંદ લોકોના ઉત્થાન માટે સહયોગ
          </p>

          <p className="font-body text-cream/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            Swadeep is a non-profit organization and hence, any donation given to organization is liable for tax exemption under Section 80G of the Income Tax Act.
          </p>
        </div>
      </section>

      {/* 2. Tax Exemption & Statutory Transparency Bar */}
      <section className="bg-white border-b border-forest/10 py-6" aria-label="Statutory compliance and registrations">
        <div className="container-wide max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-charcoal/85">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-forest" />
              <span>Section 80G Tax Exemption</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-forest" />
              <span>PAN: <strong className="font-mono text-forest-dark">{BANKING_DETAILS.pan}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-forest" />
              <span>FCRA Reg No: <strong className="font-mono text-forest-dark">{BANKING_DETAILS.fcraNumber}</strong></span>
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
                DONATION PROCESS &amp; 80G TAX CERTIFICATE
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-forest-dark mt-1">
                How Your Donation &amp; Tax Receipt Works
              </h2>
              <p className="font-body text-charcoal/80 text-sm sm:text-base mt-2">
                All donations are eligible for tax deduction under Section 80G. Follow these three simple steps to complete your contribution and receive your tax certificate:
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
                      {stepItem.title}
                    </h3>
                    <p className="font-body text-charcoal/80 text-sm leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Bank Accounts Grid */}
          <div id="bank-details" className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-28">
            {/* Non-FCRA Local Donations (Domestic India) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-forest/20 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-5">
                <div className="border-b border-cream-dark pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-forest block">
                      FOR LOCAL DONATIONS (INDIA)
                    </span>
                    <span className="text-xs font-bold bg-forest-50 text-forest px-2.5 py-1 rounded-full border border-forest-200">
                      INR • NEFT / RTGS / IMPS
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-forest-dark mt-1">
                    Domestic Bank Account Details
                  </h3>
                </div>

                <div className="space-y-3 font-body text-charcoal/90 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">Account Name:</span>
                    <span className="font-bold text-forest-dark sm:text-right">{BANKING_DETAILS.domestic.accountName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">Bank Name:</span>
                    <span className="font-semibold text-forest-dark sm:text-right">{BANKING_DETAILS.domestic.bankName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">Branch:</span>
                    <span className="font-semibold text-forest-dark sm:text-right">{BANKING_DETAILS.domestic.branch}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">Account Number:</span>
                    <span className="font-mono font-black text-forest text-lg sm:text-right">{BANKING_DETAILS.domestic.accountNumber}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">IFSC Code:</span>
                    <span className="font-mono font-black text-saffron-dark text-base sm:text-right">{BANKING_DETAILS.domestic.ifsc}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">MICR Code:</span>
                    <span className="font-mono font-medium text-charcoal/80 sm:text-right">{BANKING_DETAILS.domestic.micr}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                    <span className="text-charcoal/70">Branch Address:</span>
                    <span className="font-medium text-forest-dark sm:text-right text-xs sm:text-sm">{BANKING_DETAILS.domestic.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-dark">
                <span className="text-xs text-charcoal/70 block">
                  Eligible for 50% tax deduction under Section 80G for Indian tax payers.
                </span>
              </div>
            </div>

            {/* FCRA Foreign Donations (International Remittance) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-forest/20 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-5">
                <div className="border-b border-cream-dark pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-saffron block">
                      FOREIGN DONATIONS / REMITTANCE
                    </span>
                    <span className="text-xs font-bold bg-amber-50 text-amber-900 px-2.5 py-1 rounded-full border border-amber-200">
                      FCRA Authorized • Wire Transfer
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-forest-dark mt-1">
                    FCRA Bank Account Details
                  </h3>
                </div>

                <div className="space-y-3 font-body text-charcoal/90 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">FCRA Reg. Number:</span>
                    <span className="font-mono font-black text-forest-dark sm:text-right">{BANKING_DETAILS.fcra.registrationNumber}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">Account Name:</span>
                    <span className="font-bold text-forest-dark sm:text-right">{BANKING_DETAILS.domestic.accountName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">Bank Name:</span>
                    <span className="font-semibold text-forest-dark sm:text-right">{BANKING_DETAILS.fcra.bankName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">Branch &amp; Code:</span>
                    <span className="font-semibold text-forest-dark sm:text-right">{BANKING_DETAILS.fcra.branch}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">Account Number:</span>
                    <span className="font-mono font-black text-forest text-lg sm:text-right">{BANKING_DETAILS.fcra.accountNumber}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">IFSC Code:</span>
                    <span className="font-mono font-black text-saffron-dark text-base sm:text-right">{BANKING_DETAILS.fcra.ifsc}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-forest/5">
                    <span className="text-charcoal/70">SWIFT Code:</span>
                    <span className="font-mono font-black text-forest-dark text-base sm:text-right">{BANKING_DETAILS.fcra.swift}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                    <span className="text-charcoal/70">Branch Address:</span>
                    <span className="font-medium text-forest-dark sm:text-right text-xs sm:text-sm">{BANKING_DETAILS.fcra.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-dark">
                <span className="text-xs text-charcoal/70 block">
                  Mandated FCRA designated account at State Bank of India, New Delhi Main Branch as per Government of India guidelines.
                </span>
              </div>
            </div>
          </div>

          {/* 5. Physical Cheque / Demand Draft Notice */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-4">
            <h3 className="font-heading text-xl font-bold text-forest-dark">
              Physical Cheque or Demand Draft
            </h3>
            <p className="font-body text-charcoal/85 text-base leading-relaxed">
              {BANKING_DETAILS.chequeDetails}
            </p>
          </div>

          {/* 6. Dedicated Donor Support & Grievance Contact */}
          <div className="bg-forest-50 border border-forest-200 rounded-3xl p-8 text-center space-y-4">
            <h3 className="font-heading text-xl font-bold text-forest-dark">
              Donor Inquiries &amp; Receipt Confirmation
            </h3>
            <p className="font-body text-charcoal/90 text-base max-w-2xl mx-auto leading-relaxed">
              For any questions regarding donations, wire transfers, 80G receipts, or CSR partnerships, please reach out to our accounts desk:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 pt-2 font-body text-sm sm:text-base">
              <a
                href={`mailto:${BANKING_DETAILS.feedbackEmail}`}
                className="inline-flex items-center font-bold text-forest hover:text-forest-dark underline"
              >
                <span>Email: {BANKING_DETAILS.feedbackEmail}</span>
              </a>
              <span className="text-charcoal/40 hidden sm:inline">•</span>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw || "+919428309408"}`}
                className="inline-flex items-center font-bold text-forest hover:text-forest-dark"
              >
                <span>Phone: {BANKING_DETAILS.donorHelpline} (Kalyan Dangar)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
