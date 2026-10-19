import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, ACHIEVEMENTS, TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import OurTrustees from "@/components/sections/OurTrustees";
import Partners from "@/components/sections/Partners";
import { EyeIcon, TargetIcon, AwardMedalIcon, CheckCircleIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Who Are We? | Swadeep Shikshan Vikas Sanstha",
  description:
    "With a strong urge, smart strategies and clear aim to stand along with the communities who needs a push to find a better direction, Swadeep was founded in 2005 in Ahmedabad, Gujarat.",
};

export default function AboutPage() {
  const fundingPartnersTestimonials = TESTIMONIALS.filter(
    (t) => t.category === "Funding Partners"
  );
  const staffTestimonials = TESTIMONIALS.filter(
    (t) => t.category === "Swadeep Staff"
  );

  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="about-hero-heading"
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
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-bold tracking-wider text-cream/90 uppercase">
            <span>Swadeep Shikshan Vikas Sanstha</span>
          </div>

          <h1
            id="about-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            Who Are We?
          </h1>

          <p className="font-gujarati text-xl sm:text-2xl text-saffron-light font-medium">
            સ્વદીપ શિક્ષણ વિકાસ સંસ્થા — પરિચય અને ઉદ્દેશ્યો
          </p>

          <p className="font-body text-cream/90 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto pt-2">
            Non-profit organization in Ahmedabad, Gujarat founded in 2005.
          </p>
        </div>
      </section>

      {/* 2. Who Are We? Content Section */}
      <section className="section-padding py-20 lg:py-24">
        <div className="container-wide max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
                SWADEEP SHIKSHAN VIKAS SANSTHA
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-forest-dark tracking-tight">
                Who Are We?
              </h2>

              <div className="space-y-4 font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                <p>
                  With a strong urge, smart strategies and clear aim to stand along with the communities who needs a push to find a better direction, Swadeep (Swadeep Shikshan Vikas Sanstha) was founded in 2005. We mainly focus on the sustainable and integrated development of the vulnerable, with a special corner in the heart for children and women as also reflected in our work. We believe that ‘Improved Education’ through ‘Social Service’ mode will enable disadvantaged groups to become self-reliant and emerge out of the clutches of poverty. Our organization lays emphasis on transparency, accountability, community mobilization, participation and ownership.
                </p>
                <p>
                  Team Swadeep is working with astounding dedication for under privileged people in the areas like Education, Health, Safety, Livelihood, Rural Infrastructure and capacity building of communities. We also conducts the awareness programs for Education, Health and Safety, Parenting, behaviour based training, youth Empowerment, Environment, Water and Sanitation management practices and many more. Our efforts have developed lasting association with government, non-government and corporate organizations; also with the communities and groups with whom we have worked.
                </p>
              </div>

              {/* Award Callout */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <AwardMedalIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-amber-900 tracking-wider">Recognition</div>
                  <div className="font-heading font-extrabold text-amber-950 text-base sm:text-lg">
                    CSR Conclave 2019 Award
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
                    Grassroots Leadership
                  </span>
                  <h3 className="font-heading font-bold text-xl">
                    Swadeep Shikshan Vikas Sanstha
                  </h3>
                  <p className="text-sm text-cream/95">
                    Ahmedabad, Gujarat – Serving Communities Since 2005
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="section-padding py-20 bg-cream-dark/50 border-y border-forest/10" aria-label="Vision and Mission">
        <div className="container-wide max-w-5xl mx-auto">
          <SectionHeading
            badge="OUR PURPOSE"
            gujaratiText="આપણું વિઝન અને મિશન"
            title="Our Vision &amp; Mission"
            subtitle="The foundational purpose guiding team Swadeep since 2005."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border-2 border-forest/10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest flex items-center justify-center border border-forest-100">
                  <EyeIcon className="w-7 h-7 text-forest" />
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-forest-dark">
                  Our Vision
                </h3>
                <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                  To work towards the empowerment of vulnerable communities in under serviced area with a special focus on children and women.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border-2 border-saffron/20 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-saffron-50 text-saffron-dark flex items-center justify-center border border-saffron-100">
                  <TargetIcon className="w-7 h-7 text-saffron-dark" />
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-forest-dark">
                  Our Mission
                </h3>
                <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                  Improved education true social service delivery to enable disadvantaged communities to become self-reliant and emerge out of the clutches of poverty.
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
            badge="MEASURABLE WORK"
            gujaratiText="અમારી સિદ્ધિઓ"
            title="Our Achievements"
            subtitle="Authentic programmatic milestones across our thematic areas of development."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Education */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                Education
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
                Health
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
                Livelihood
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
                Rural Infrastructure Development
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
                Disaster Management
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
            badge="SWADEEP SHIKSHAN VIKAS SANSTHA"
            gujaratiText="અમારા વિશે મહાનુભાવો અને સાથીઓના વિચારો"
            title="What They Say About Us"
            subtitle="Words of trust and collaboration from our esteemed partners and dedicated staff members."
            align="center"
          />

          {/* Funding Partners Quotes */}
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-forest-dark border-l-4 border-saffron pl-4">
              Funding Partners
            </h3>
            <div className="space-y-6">
              {fundingPartnersTestimonials.map((t, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-4">
                  <p className="font-body text-charcoal/85 text-base sm:text-lg italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-cream-dark flex items-center justify-between">
                    <div>
                      <div className="font-heading font-bold text-lg text-forest-dark">{t.name}</div>
                      <div className="text-sm text-charcoal/70">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Swadeep Staff Quotes */}
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-forest-dark border-l-4 border-forest pl-4">
              Swadeep Staff
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {staffTestimonials.map((t, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-forest/10 space-y-4 flex flex-col justify-between">
                  <p className="font-body text-charcoal/85 text-base italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-3 border-t border-cream-dark">
                    <div className="font-heading font-bold text-lg text-forest-dark">{t.name}</div>
                    <div className="text-sm text-charcoal/70">{t.role}</div>
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
