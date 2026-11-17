import type { Metadata } from "next";
import DonateContent from "@/components/sections/DonateContent";

export const metadata: Metadata = {
  title: "Donation | Tax Exemption Under Section 80G | Swadeep Shikshan Vikas Sanstha",
  description:
    "Swadeep is a registered non-profit organization. Donations are eligible for tax exemption under Section 80G. View domestic Bank of India and foreign FCRA SBI account details.",
};

export default function DonatePage() {
  return <DonateContent />;
}
