import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Swadeep Shikshan Vikas Sanstha",
  description:
    "Contact Swadeep Shikshan Vikas Sanstha in Ahmedabad, Gujarat. Reach our executive team for partnership inquiries, volunteering, or donation support.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Swadeep Shikshan Vikas Sanstha",
    description:
      "Reach out to Swadeep Shikshan Vikas Sanstha in Ahmedabad, Gujarat for partnerships, inquiries, and grassroots collaboration.",
    url: "https://www.swadeep.org/contact",
    siteName: "Swadeep Shikshan Vikas Sanstha",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
