import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  VERIFIED_IMPACT_METRICS,
  ACHIEVEMENTS,
  SITE_CONFIG,
} from "@/lib/constants";
import {
  AwardMedalIcon,
  CheckCircleIcon,
  BookOpenIcon,
  HeartPulseIcon,
  UsersGroupIcon,
  ShieldCheckIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Impact & Reports | Swadeep Shikshan Vikas Sanstha",
  description:
    "Explore verified impact statistics, sector-wise programmatic achievements, and documentation reports of Swadeep Shikshan Vikas Sanstha across Gujarat.",
};

export default function ImpactPage() {
  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="impact-hero-heading"
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
            id="impact-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            IMPACT &amp; REPORTS
          </h1>

          <p className="font-gujarati text-xl sm:text-2xl text-cream/90 font-medium">
            અસર અને અહેવાલો — ૨૦૦૫ થી સતત માપી શકાય તેવું સામાજિક પરિવર્તન
          </p>

          <p className="font-body text-cream/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            Verified statistics, programmatic milestones, and documentation reflecting grassroots empowerment across Gujarat communities.
          </p>
        </div>
      </section>

      {/* 2. Verification Metadata Bar */}
      <section className="bg-white border-b border-forest/10 py-5" aria-label="Impact data source and verification status">
        <div className="container-wide max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-charcoal/80">
            <div>
              <span className="text-forest uppercase tracking-wider block sm:inline">Data Source: </span>
              <span>{VERIFIED_IMPACT_METRICS.source}</span>
            </div>
            <div>
              <span className="text-forest uppercase tracking-wider block sm:inline">Reporting Period: </span>
              <span className="font-bold text-forest-dark">{VERIFIED_IMPACT_METRICS.reportingPeriod}</span>
            </div>
            <div>
              <span className="text-forest uppercase tracking-wider block sm:inline">Last Verified: </span>
              <span className="font-bold text-forest-dark">{VERIFIED_IMPACT_METRICS.lastVerified}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Milestone Grid */}
      <section className="section-padding py-16 lg:py-24" aria-labelledby="milestone-heading">
        <div className="container-wide max-w-5xl mx-auto space-y-12">
          <SectionHeading
            badge="CENTRAL IMPACT REGISTRY"
            gujaratiText="મુખ્ય સિદ્ધિઓ"
            title="Core Impact Highlights"
            subtitle="Authentic statistics maintained across all Swadeep operations."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFIED_IMPACT_METRICS.summaryStats.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 shadow-sm border border-forest/10 hover:border-forest/30 hover:shadow-md transition-all text-center space-y-2 group"
              >
                <div className="font-heading font-black text-4xl sm:text-5xl text-forest group-hover:text-forest-light transition-colors">
                  {item.value}
                </div>
                <div className="font-heading font-bold text-lg text-forest-dark">
                  {item.label}
                </div>
                <div className="text-xs sm:text-sm font-medium text-charcoal/60">
                  {item.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Thematic Sector-wise Data */}
      <section id="thematic-stats" className="section-padding py-16 lg:py-24 bg-white border-y border-forest/10 scroll-mt-20">
        <div className="container-wide max-w-5xl mx-auto space-y-12">
          <SectionHeading
            badge="SECTORAL PERFORMANCE"
            gujaratiText="કાર્યક્ષેત્ર વાઈઝ આંકડા"
            title="Thematic Program Achievements"
            subtitle="Verified breakdowns as reported in official Swadeep records."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Education */}
            <div className="p-8 rounded-3xl bg-cream border border-forest/15 shadow-sm space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-forest/10">
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center">
                  <BookOpenIcon className="w-5 h-5 text-forest" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  Education
                </h3>
              </div>
              <ul className="space-y-3 font-body text-charcoal/85 text-sm sm:text-base">
                {ACHIEVEMENTS.education.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between py-1 border-b border-forest/5">
                    <span>{item.label}</span>
                    <span className="font-heading font-bold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Health */}
            <div className="p-8 rounded-3xl bg-cream border border-forest/15 shadow-sm space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-forest/10">
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center">
                  <HeartPulseIcon className="w-5 h-5 text-forest" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  Health
                </h3>
              </div>
              <ul className="space-y-3 font-body text-charcoal/85 text-sm sm:text-base">
                {ACHIEVEMENTS.health.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between py-1 border-b border-forest/5">
                    <span>{item.label}</span>
                    <span className="font-heading font-bold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Livelihood */}
            <div className="p-8 rounded-3xl bg-cream border border-forest/15 shadow-sm space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-forest/10">
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center">
                  <UsersGroupIcon className="w-5 h-5 text-forest" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  Livelihood
                </h3>
              </div>
              <ul className="space-y-3 font-body text-charcoal/85 text-sm sm:text-base">
                {ACHIEVEMENTS.livelihood.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between py-1 border-b border-forest/5">
                    <span>{item.label}</span>
                    <span className="font-heading font-bold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rural Infrastructure */}
            <div className="p-8 rounded-3xl bg-cream border border-forest/15 shadow-sm space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-forest/10">
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5 text-forest" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  Rural Infrastructure
                </h3>
              </div>
              <ul className="space-y-3 font-body text-charcoal/85 text-sm sm:text-base">
                {ACHIEVEMENTS.infrastructure.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between py-1 border-b border-forest/5">
                    <span>{item.label}</span>
                    <span className="font-heading font-bold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disaster Management */}
            <div className="p-8 rounded-3xl bg-cream border border-forest/15 shadow-sm space-y-5 md:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 pb-3 border-b border-forest/10">
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-forest" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  Disaster Management &amp; Relief Operations
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ACHIEVEMENTS.disaster.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl border border-forest/10 font-body text-charcoal/85 text-sm">
                    <span>{item.label}</span>
                    <span className="font-heading font-bold text-forest-dark">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Documentation & Compliance Section */}
      <section id="reports" className="section-padding py-16 lg:py-24 scroll-mt-20" aria-labelledby="reports-heading">
        <div className="container-wide max-w-5xl mx-auto space-y-10">
          <SectionHeading
            badge="TRANSPARENCY &amp; EVIDENCE"
            gujaratiText="દસ્તાવેજીકરણ અને અહેવાલ"
            title="Reports &amp; Governance Evidence"
            subtitle="Statutory registrations and documented grassroots achievements."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Registration Evidence Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-forest/10 space-y-4">
              <h3 className="font-heading font-bold text-xl text-forest-dark">
                Statutory Governance &amp; Registration
              </h3>
              <p className="font-body text-charcoal/80 text-sm leading-relaxed">
                Swadeep Shikshan Vikas Sanstha is fully registered under the Mumbai Public Trusts Act, 1950, and holds valid statutory registrations with the Income Tax Department and Ministry of Home Affairs:
              </p>
              <div className="space-y-2.5 pt-2 text-sm">
                <div className="p-3 rounded-xl bg-cream-dark/50 flex justify-between">
                  <span className="text-charcoal/70">Trust Registration No:</span>
                  <strong className="font-mono text-forest-dark">{SITE_CONFIG.trustRegistrationNo}</strong>
                </div>
                <div className="p-3 rounded-xl bg-cream-dark/50 flex justify-between">
                  <span className="text-charcoal/70">Permanent Account Number (PAN):</span>
                  <strong className="font-mono text-forest-dark">{SITE_CONFIG.pan}</strong>
                </div>
                <div className="p-3 rounded-xl bg-cream-dark/50 flex justify-between">
                  <span className="text-charcoal/70">FCRA Registration Number:</span>
                  <strong className="font-mono text-forest-dark">{SITE_CONFIG.fcraNumber}</strong>
                </div>
                <div className="p-3 rounded-xl bg-cream-dark/50 flex justify-between">
                  <span className="text-charcoal/70">Tax Exemption Eligibility:</span>
                  <strong className="text-forest font-semibold">Section 80G</strong>
                </div>
              </div>
            </div>

            {/* Recognition & Annual Documentation Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-forest/10 space-y-4">
              <h3 className="font-heading font-bold text-xl text-forest-dark">
                Recognition &amp; Documentation Requests
              </h3>
              <p className="font-body text-charcoal/80 text-sm leading-relaxed">
                Honored with the <strong>CSR Conclave Award 2019</strong> for outstanding contributions in rural development and child-focused social interventions across Gujarat.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                  <AwardMedalIcon className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>CSR Conclave 2019 Award Winner</span>
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  Recognized for impactful grassroots execution in education, Anganwadi strengthening, and coastal livelihood programs.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  For formal copies of programmatic evaluation reports, audited balance sheets, or CSR project proposals, please contact our administrative desk:
                </p>
                <div className="mt-3">
                  <a
                    href="mailto:swadeepindiango@gmail.com?subject=Request%20for%20Swadeep%20Reports%20and%20Documentation"
                    className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-bold text-white bg-forest hover:bg-forest-light transition-colors shadow-sm"
                  >
                    <span>Request Documentation via Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-gradient-to-r from-forest-dark to-forest text-white rounded-3xl p-8 sm:p-12 text-center space-y-5">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              Support Continuous Grassroots Impact
            </h3>
            <p className="font-body text-cream/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Every donation helps us reach more children in remote Anganwadis, provide dental healthcare, and install solar lighting in rural Gujarat.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/donate"
                className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-saffron hover:bg-saffron-dark shadow-md transition-colors"
              >
                Donate to the Cause
              </Link>
              <Link
                href="/programs"
                className="px-8 py-3.5 rounded-full text-sm font-bold text-cream hover:text-forest-dark bg-transparent hover:bg-cream border border-cream/80 transition-colors"
              >
                Explore All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
