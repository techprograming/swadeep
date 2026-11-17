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
  const [employees, setEmployees] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function loadEmployees() {
      try {
        const res = await fetch("/api/employees");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.employees)) {
            setEmployees(data.employees);
          }
        }
      } catch (err) {
        console.warn("Could not load employees:", err);
      }
    }
    loadEmployees();
  }, []);
  const { isGujarati, t } = useLanguage();

  const fundingPartnersTestimonials = TESTIMONIALS.filter(
    (item) => item.category === "Funding Partners"
  );
  const staffTestimonials = TESTIMONIALS.filter(
    (item) => item.category === "Swadeep Staff"
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
            <span>{isGujarati ? SITE_CONFIG.nameGujarati : SITE_CONFIG.name}</span>
          </div>

          <h1
            id="about-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            {isGujarati ? "અમારા વિશે — પરિચય અને ઉદ્દેશ્યો" : "Who Are We?"}
          </h1>

          <p className="font-gujarati text-xl sm:text-2xl text-saffron-light font-medium">
            {isGujarati
              ? "૨૦૦૫ થી વંચિત સમુદાયો અને બાળકોના સર્વાંગી ઉત્થાન માટે સમર્પિત"
              : "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા — પરિચય અને ઉદ્દેશ્યો"}
          </p>

          <p className="font-body text-cream/90 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto pt-2">
            {isGujarati
              ? "અમદાવાદ, ગુજરાતમાં ૨૦૦૫ માં સ્થપાયેલી સામાજિક બિન-નફાકારક સંસ્થા"
              : "Non-profit organization in Ahmedabad, Gujarat founded in 2005."}
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
                {isGujarati ? SITE_CONFIG.nameGujarati : "SWADEEP SHIKSHAN VIKAS SANSTHA"}
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-forest-dark tracking-tight">
                {isGujarati ? "સંસ્થાની સ્થાપના અને સફર" : "Who Are We?"}
              </h2>

              <div className="space-y-4 font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                <p>{isGujarati ? SITE_CONFIG.whoAreWe1Gu : SITE_CONFIG.whoAreWe1}</p>
                <p>{isGujarati ? SITE_CONFIG.whoAreWe2Gu : SITE_CONFIG.whoAreWe2}</p>
              </div>

              {/* Award Callout */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <AwardMedalIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-amber-900 tracking-wider">
                    {isGujarati ? "સન્માન" : "Recognition"}
                  </div>
                  <div className="font-heading font-extrabold text-amber-950 text-base sm:text-lg">
                    {isGujarati ? "CSR કોન્ક્લેવ ૨૦૧૯ એવોર્ડ વિજેતા" : "CSR Conclave 2019 Award"}
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
                    {isGujarati ? "ક્ષેત્રીય નેતૃત્વ" : "Grassroots Leadership"}
                  </span>
                  <h3 className="font-heading font-bold text-xl">
                    {isGujarati ? SITE_CONFIG.nameGujarati : SITE_CONFIG.name}
                  </h3>
                  <p className="text-sm text-cream/95">
                    {isGujarati
                      ? "અમદાવાદ, ગુજરાત – ૨૦૦૫ થી અવિરત સેવા"
                      : "Ahmedabad, Gujarat – Serving Communities Since 2005"}
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
            badge={isGujarati ? "ધ્યેય અને દ્રષ્ટિકોણ" : "OUR PURPOSE"}
            gujaratiText="આપણું વિઝન અને મિશન"
            title={isGujarati ? "ધ્યેય અને દ્રષ્ટિકોણ" : "Our Vision & Mission"}
            subtitle={
              isGujarati
                ? "૨૦૦૫ થી સ્વદીપ ટીમને માર્ગદર્શન આપતો આધારસ્તંભ."
                : "The foundational purpose guiding team Swadeep since 2005."
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
                  {isGujarati ? "અમારું વિઝન (Vision)" : "Our Vision"}
                </h3>
                <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                  {isGujarati ? SITE_CONFIG.visionGu : SITE_CONFIG.vision}
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
                  {isGujarati ? "અમારું મિશન (Mission)" : "Our Mission"}
                </h3>
                <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                  {isGujarati ? SITE_CONFIG.missionGu : SITE_CONFIG.mission}
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
            badge={isGujarati ? "પ્રમાણિત કામગીરી" : "MEASURABLE WORK"}
            gujaratiText="અમારી સિદ્ધિઓ"
            title={isGujarati ? "અમારી સિદ્ધિઓ" : "Our Achievements"}
            subtitle={
              isGujarati
                ? "અમારા પાંચ વિકાસ ક્ષેત્રોમાં નોંધાયેલ વાસ્તવિક પરિણામો."
                : "Authentic programmatic milestones across our thematic areas of development."
            }
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Education */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {isGujarati ? ACHIEVEMENTS.education.titleGu : ACHIEVEMENTS.education.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.education.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{isGujarati ? item.labelGu : item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Health */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {isGujarati ? ACHIEVEMENTS.health.titleGu : ACHIEVEMENTS.health.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.health.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{isGujarati ? item.labelGu : item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Livelihood */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {isGujarati ? ACHIEVEMENTS.livelihood.titleGu : ACHIEVEMENTS.livelihood.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.livelihood.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{isGujarati ? item.labelGu : item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rural Infrastructure Development */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {isGujarati ? ACHIEVEMENTS.infrastructure.titleGu : ACHIEVEMENTS.infrastructure.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.infrastructure.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{isGujarati ? item.labelGu : item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disaster Management */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4 md:col-span-2 lg:col-span-2">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {isGujarati ? ACHIEVEMENTS.disaster.titleGu : ACHIEVEMENTS.disaster.title}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ACHIEVEMENTS.disaster.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between font-body text-charcoal/85 text-base p-2 bg-white rounded-xl border border-forest/5">
                    <span>{isGujarati ? item.labelGu : item.label}</span>
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
            badge={isGujarati ? "અભિપ્રાય અને પ્રશંસા" : "SWADEEP SHIKSHAN VIKAS SANSTHA"}
            gujaratiText="અમારા વિશે મહાનુભાવો અને સાથીઓના વિચારો"
            title={isGujarati ? "ભાગીદારો અને સાથીઓના વિચારો" : "What They Say About Us"}
            subtitle={
              isGujarati
                ? "અમારા પ્રતિષ્ઠિત સહયોગીઓ અને સમર્પિત કાર્યકરો દ્વારા વ્યક્ત કરાયેલ વિશ્વાસ."
                : "Words of trust and collaboration from our esteemed partners and dedicated staff members."
            }
            align="center"
          />

          {/* Funding Partners Quotes */}
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-forest-dark border-l-4 border-saffron pl-4">
              {isGujarati ? "સહયોગી પાર્ટનર્સ (Funding Partners)" : "Funding Partners"}
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

          {/* Swadeep Executive & Field Operations Team */}
          {employees.length > 0 && (
            <div className="space-y-6 pt-4">
              <div className="border-l-4 border-forest pl-4">
                <h3 className="font-heading text-2xl font-bold text-forest-dark">
                  {isGujarati ? "અમારી ક્ષેત્રીય અને વ્યવસ્થાપકીય ટીમ" : "Our Operational & Field Leadership Team"}
                </h3>
                <p className="font-body text-xs sm:text-sm text-charcoal/70 mt-1">
                  {isGujarati
                    ? "પાયાના સ્તરે સતત કાર્યરત કર્મનિષ્ઠ કાર્યકરો અને પ્રોજેક્ટ કોઓર્ડિનેટર."
                    : "Dedicated project coordinators, social educators, and community mobilization leads."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {employees.map((emp) => (
                  <div
                    key={emp.id || emp.name}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-forest/10 hover:border-forest/30 transition-all hover:shadow-md flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-base text-forest-dark">
                          {emp.name}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-forest-50 text-forest border border-forest/15">
                          {emp.department || "Operations"}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-saffron-dark">
                        {emp.role}
                      </div>
                      {emp.bio && (
                        <p className="text-xs text-charcoal/75 leading-relaxed line-clamp-3 pt-1">
                          {emp.bio}
                        </p>
                      )}
                    </div>

                    {(emp.email || emp.phone) && (
                      <div className="pt-3 mt-3 border-t border-cream-dark text-[11px] text-charcoal/60 space-y-0.5">
                        {emp.email && <div>Email: {emp.email}</div>}
                        {emp.phone && <div>Phone: {emp.phone}</div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Swadeep Staff Quotes */}
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-forest-dark border-l-4 border-forest pl-4">
              {isGujarati ? "સ્વદીપ કાર્યકર ટીમ (Swadeep Staff)" : "Swadeep Staff"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {staffTestimonials.map((tItem, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-forest/10 space-y-4 flex flex-col justify-between">
                  <p className="font-body text-charcoal/85 text-base italic leading-relaxed">
                    &ldquo;{tItem.quote}&rdquo;
                  </p>
                  <div className="pt-3 border-t border-cream-dark">
                    <div className="font-heading font-bold text-lg text-forest-dark">{tItem.name}</div>
                    <div className="text-sm text-charcoal/70">{tItem.role}</div>
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
