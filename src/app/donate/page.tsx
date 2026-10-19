import type { Metadata } from "next";
import Link from "next/link";
import { BANKING_DETAILS, SITE_CONFIG } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import { ReceiptTextIcon, LandmarkIcon, MailIcon, PhoneCallIcon, MapPinIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Donation | Swadeep Shikshan Vikas Sanstha",
  description:
    "Swadeep is a non-profit organization and hence, any donation given to organization is liable for tax exemption. View domestic and FCRA bank details.",
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
            Swadeep is a non-profit organization and hence, any donation given to organization is liable for tax exemption.
          </p>
        </div>
      </section>

      {/* 2. Main Donation Content */}
      <section className="section-padding py-20 lg:py-24">
        <div className="container-wide max-w-5xl mx-auto space-y-12">
          {/* Note on Cheque/Draft */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-forest-dark">
              Donation
            </h2>
            <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
              Swadeep is a non-profit organization and hence, any donation given to organization is liable for tax exemption.
            </p>
            <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
              You may either transfer donation directly to organization bank account or send cheque/draft in favour of{" "}
              <strong className="text-forest-dark">Swadeep Shikshan Vikas Sanstha</strong> at 21, Abhinandan Park Society, Opp. Vastrapur Railway Station, Butbhavani Railway Crossing, Vejalpur – Ahmedabad -380051. Contact: Kalyan Dangar 09428309408.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-dark/80 border border-forest/10 font-heading font-bold text-forest-dark text-base">
                <span>Permanent Account Number (PAN):</span>
                <span className="text-saffron-dark font-mono text-lg">{BANKING_DETAILS.pan}</span>
              </span>
            </div>
          </div>

          {/* 3. Bank Accounts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Non-FCRA Local Donations */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-forest/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="border-b border-cream-dark pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-forest block">
                    FOR LOCAL DONATIONS – INDIA
                  </span>
                  <h3 className="font-heading text-xl font-bold text-forest-dark">
                    NON FCRA Bank A/C Details
                  </h3>
                </div>

                <div className="space-y-3 font-body text-charcoal/90 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">Bank Account Name:</span>
                    <span className="font-semibold text-forest-dark text-right">{BANKING_DETAILS.domestic.accountName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">Bank Name:</span>
                    <span className="font-semibold text-forest-dark text-right">{BANKING_DETAILS.domestic.bankName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">Address:</span>
                    <span className="font-medium text-forest-dark text-right">{BANKING_DETAILS.domestic.address}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">Branch:</span>
                    <span className="font-semibold text-forest-dark text-right">{BANKING_DETAILS.domestic.branch}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">Account:</span>
                    <span className="font-mono font-bold text-forest-dark text-lg text-right">{BANKING_DETAILS.domestic.accountNumber}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5">
                    <span className="text-charcoal/70">IFSC:</span>
                    <span className="font-mono font-bold text-saffron-dark text-base text-right">{BANKING_DETAILS.domestic.ifsc}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FCRA Foreign Donations */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-forest/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="border-b border-cream-dark pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron block">
                    FOR FOREIGN DONATIONS / REMITTANCE
                  </span>
                  <h3 className="font-heading text-xl font-bold text-forest-dark">
                    FCRA Bank A/C Details
                  </h3>
                </div>

                <div className="space-y-3 font-body text-charcoal/90 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">FCRA Registration Number:</span>
                    <span className="font-mono font-bold text-forest-dark text-right">{BANKING_DETAILS.fcra.registrationNumber}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">Name of Bank:</span>
                    <span className="font-semibold text-forest-dark text-right">{BANKING_DETAILS.fcra.bankName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">BRANCH Name and CODE:</span>
                    <span className="font-semibold text-forest-dark text-right">{BANKING_DETAILS.fcra.branch}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">Account No.:</span>
                    <span className="font-mono font-bold text-forest-dark text-lg text-right">{BANKING_DETAILS.fcra.accountNumber} ({BANKING_DETAILS.fcra.accountType})</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">IFSC:</span>
                    <span className="font-mono font-bold text-saffron-dark text-base text-right">{BANKING_DETAILS.fcra.ifsc}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5">
                    <span className="text-charcoal/70">SWIFT:</span>
                    <span className="font-mono font-bold text-forest-dark text-base text-right">{BANKING_DETAILS.fcra.swift}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5">
                    <span className="text-charcoal/70">ADDRESS:</span>
                    <span className="font-medium text-forest-dark text-right text-xs sm:text-sm">{BANKING_DETAILS.fcra.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Contact */}
          <div className="bg-forest-50 border border-forest-200 rounded-2xl p-6 text-center space-y-2">
            <p className="font-body text-charcoal/90 text-base sm:text-lg">
              For any feedback on our fundraising efforts, please contact{" "}
              <a
                href={`mailto:${BANKING_DETAILS.feedbackEmail}`}
                className="font-bold text-forest underline hover:text-forest-dark"
              >
                {BANKING_DETAILS.feedbackEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
