import type { Metadata, Viewport } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { SITE_CONFIG } from "@/lib/constants";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B3025",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Swadeep Shikshan Vikas Sanstha | Grassroots NGO in Gujarat",
    template: "%s | Swadeep Shikshan Vikas Sanstha",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Swadeep Shikshan Vikas Sanstha",
    "NGO in Ahmedabad",
    "Grassroots NGO Gujarat",
    "Rural Development Gujarat",
    "Education NGO Ahmedabad",
    "Section 80G Tax Exemption NGO",
    "FCRA Registered NGO",
    "ICDS Anganwadi BaLA",
    "Coastal Fishermen Livelihood Sagarbandhu",
    "Solar Street Lights Rural Infrastructure",
    "Disaster Relief Gujarat",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  manifest: "/manifest.json",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "en-IN": SITE_CONFIG.url,
      "x-default": SITE_CONFIG.url,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Swadeep Shikshan Vikas Sanstha | Grassroots NGO in Gujarat",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Swadeep Shikshan Vikas Sanstha Grassroots Impact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swadeep Shikshan Vikas Sanstha | Grassroots NGO in Gujarat",
    description: SITE_CONFIG.description,
    images: ["/images/hero-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: "Swadeep Shikshan Vikas Sanstha",
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/images/favicon.png`,
        description: SITE_CONFIG.description,
        foundingDate: "2005",
        nonprofitStatus: "Nonprofit501c3",
        taxID: "AAKTS6375E",
        address: {
          "@type": "PostalAddress",
          streetAddress: "21, Abhinandan Park Society, Prernatirth Derasar Road, Prahlad Nagar",
          addressLocality: "Ahmedabad",
          addressRegion: "Gujarat",
          postalCode: "380015",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-942-830-9408",
          contactType: "customer service",
          email: SITE_CONFIG.email,
          availableLanguage: ["English"],
        },
        sameAs: [
          SITE_CONFIG.social.facebook,
          SITE_CONFIG.social.youtube,
          SITE_CONFIG.social.instagram,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: "Swadeep Shikshan Vikas Sanstha",
        description: SITE_CONFIG.description,
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
        inLanguage: ["en-IN"],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSans.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-body bg-cream text-charcoal antialiased">
        {/* WCAG 2.2 AA Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:bg-[#F47B2A] focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-extrabold focus:outline-none focus:ring-2 focus:ring-white transition-all duration-150"
        >
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
