import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports, Governance & Resources | Swadeep Shikshan Vikas Sanstha",
  description:
    "Official audited annual reports, FCRA statements, statutory audit balance sheets, and organization brochure of Swadeep Shikshan Vikas Sanstha.",
  keywords: [
    "Swadeep Annual Reports",
    "Swadeep Audit Reports",
    "FCRA Accounts NGO Gujarat",
    "Swadeep Brochure PDF",
    "Swadeep Statutory Governance",
    "NGO Financial Transparency Gujarat",
  ],
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Reports, Governance & Resources | Swadeep Shikshan Vikas Sanstha",
    description:
      "Official audited annual reports, FCRA accounts, statutory balance sheets, and organization brochure of Swadeep.",
    url: "https://www.swadeep.org/resources",
    siteName: "Swadeep Shikshan Vikas Sanstha",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reports, Governance & Resources | Swadeep Shikshan Vikas Sanstha",
    description:
      "Statutory annual reports, audits, and official brochure of Swadeep Shikshan Vikas Sanstha.",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
