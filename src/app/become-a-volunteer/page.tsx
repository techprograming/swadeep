import type { Metadata } from "next";
import VolunteerContent from "@/components/sections/VolunteerContent";

export const metadata: Metadata = {
  title: "Become A Volunteer | Help Us Help Them | Swadeep Shikshan Vikas Sanstha",
  description:
    "We are a cause-driven NGO deeply engaged at grassroots through life-transforming programs. Join our hands in reaching out to communities through your zeal and compassion!",
  alternates: {
    canonical: "/become-a-volunteer",
  },
};

export default function BecomeAVolunteerPage() {
  return <VolunteerContent />;
}
