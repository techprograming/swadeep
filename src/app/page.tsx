import React from "react";
import Hero from "@/components/sections/Hero";
import WhoAreWeSection from "@/components/sections/WhoAreWeSection";
import FocusAreas from "@/components/sections/FocusAreas";
import ImpactStats from "@/components/sections/ImpactStats";
import FeaturedVideos from "@/components/sections/FeaturedVideos";
import Partners from "@/components/sections/Partners";
import Testimonials from "@/components/sections/Testimonials";
import OurTrustees from "@/components/sections/OurTrustees";
import CallToAction from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <WhoAreWeSection />
      <FocusAreas />
      <ImpactStats />
      <Partners />
      <Testimonials />
      <FeaturedVideos />
      <OurTrustees />
      <CallToAction />
    </main>
  );
}
