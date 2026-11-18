import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications & Field Learning Materials | Swadeep Shikshan Vikas Sanstha",
  description:
    "Explore and download Swadeep's field-tested educational manuals, health learning materials, children's storybooks, and organizational operational guidelines.",
  keywords: [
    "Swadeep Publications",
    "Dental Health TLM Book",
    "Arti & The Tooth Fairy Story Book",
    "Maa No Prem Rhymes Book",
    "Grassroots NGO Learning Materials",
    "Swadeep Organizational Manual",
  ],
  alternates: {
    canonical: "/publications",
  },
  openGraph: {
    title: "Publications & Field Learning Materials | Swadeep Shikshan Vikas Sanstha",
    description:
      "Explore and download Swadeep's field-tested educational manuals, health learning materials, children's storybooks, and organizational operational guidelines.",
    url: "https://www.swadeep.org/publications",
    siteName: "Swadeep Shikshan Vikas Sanstha",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Publications & Field Learning Materials | Swadeep Shikshan Vikas Sanstha",
    description:
      "Field-tested pedagogical manuals, children's storybooks, and organizational guidelines.",
  },
};

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
