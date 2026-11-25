import type { Metadata } from "next";
import DonateContent from "@/components/sections/DonateContent";

export const metadata: Metadata = {
  title: "Donation | Swadeep Shikshan Vikas Sanstha",
  description:
    "Swadeep is a non-profit organization and hence, any donation given to organization is liable for tax exemption under Section 80G. View bank account and FCRA details.",
  alternates: {
    canonical: "/donation",
  },
};

export default function DonationPage() {
  return <DonateContent />;
}
