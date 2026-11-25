import type { Metadata } from "next";
import PartnerWithUsContent from "@/components/sections/PartnerWithUsContent";

export const metadata: Metadata = {
  title: "Partner With Us | Swadeep Shikshan Vikas Sanstha",
  description:
    "Swadeep is always open for collaboration with individuals and organisations having similar vision. We have been funded by corporate, government, NGOs, social groups and individuals to carryout impactful work.",
  alternates: {
    canonical: "/partner-with-us",
  },
};

export default function PartnerWithUsPage() {
  return <PartnerWithUsContent />;
}
