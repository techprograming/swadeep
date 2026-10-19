import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE_CONFIG, BANKING_DETAILS, OFFICE_LOCATIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection | Swadeep Shikshan Vikas Sanstha",
  description:
    "Learn about how Swadeep Shikshan Vikas Sanstha protects your personal data, handles donation records, and maintains transparency.",
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Header Banner */}
      <section
        aria-labelledby="privacy-heading"
        className="relative py-16 lg:py-24 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden"
      >
        <div className="container-wide section-padding relative z-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-saffron-light border border-white/15">
            <span>Governance &amp; Transparency</span>
          </div>

          <h1
            id="privacy-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Privacy Policy &amp; Data Protection
          </h1>

          <p className="font-gujarati text-lg sm:text-xl text-cream/90 font-medium">
            ગોપનીયતા નીતિ અને ડેટા સુરક્ષા — પારદર્શક અને સુરક્ષિત વ્યવસ્થા
          </p>

          <p className="font-body text-xs sm:text-sm text-cream/70 pt-2">
            Last Updated: October 2026 • Effective for all Swadeep website visitors, donors, and partners
          </p>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="section-padding py-16 lg:py-24">
        <div className="container-wide max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-forest/10 space-y-8 font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-forest-dark">
              1. Introduction
            </h2>
            <p>
              Swadeep Shikshan Vikas Sanstha (&ldquo;Swadeep&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to respecting the privacy of individuals who interact with our website, donate to our cause, or contact our team. This Privacy Policy outlines what information we collect, the reasons we collect it, how it is safeguarded, and how you can exercise your rights.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-forest-dark">
              2. Information We Collect
            </h2>
            <p>
              We collect only the minimum information necessary to fulfill your requests, process statutory tax-exempt donation receipts, and communicate regarding our social welfare initiatives:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li>
                <strong>Contact Form Inquiries:</strong> Your full name, email address, phone number (optional), subject, and the message you provide when sending an inquiry through our contact form.
              </li>
              <li>
                <strong>Donation &amp; 80G Tax Exemption Records:</strong> Donor full legal name, PAN (Permanent Account Number), postal address, email, telephone number, transaction reference / UTR number, and remittance date as mandated by the Income Tax Department of India for issuing Section 80G receipts.
              </li>
              <li>
                <strong>Technical Information:</strong> Standard anonymized server request logs (IP addresses, browser user-agents, timestamps) used strictly for rate-limiting, denial-of-service defense, and website security.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-forest-dark">
              3. Purpose &amp; Use of Information
            </h2>
            <p>Your information is used solely for legitimate, authorized non-profit purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li>To respond to your questions, partnership inquiries, and volunteer messages.</li>
              <li>To issue and dispatch official Section 80G donation receipts and certificates.</li>
              <li>To comply with statutory non-profit audit requirements, FCRA quarterly filings, and statutory income tax compliance under Indian law.</li>
              <li>We <strong>never sell, lease, rent, or trade</strong> your personal information or contact details to third-party commercial marketers.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-forest-dark">
              4. Data Retention &amp; Security Safeguards
            </h2>
            <p>
              We implement industry-standard administrative, physical, and technical safeguards. Input fields are sanitized to protect against cross-site scripting (XSS), rate limits prevent automated abuse, and server communication is encrypted over HTTPS.
            </p>
            <p>
              Donation records and statutory 80G receipts are preserved for the minimum duration mandated by the Income Tax Act, 1961 (generally 7 financial years) to satisfy official audit standards. General contact inquiries are retained only as long as needed to address your communication.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-forest-dark">
              5. Child Privacy Safeguards
            </h2>
            <p>
              As an organization working extensively with Anganwadi toddlers and school children, Swadeep adheres to strict child protection guidelines. Field photographs of children published on our website are taken with institutional and parental awareness during educational activities and community drives. We never publish sensitive identifying personal records, home addresses, or confidential details of any child.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-forest-dark">
              6. Your Privacy Rights &amp; Grievance Redressal
            </h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections to your donor records, or ask questions regarding our privacy practices.
            </p>
            <div className="p-6 rounded-2xl bg-forest-50 border border-forest-150 space-y-2">
              <h3 className="font-heading font-bold text-base text-forest-dark">
                Privacy Officer &amp; Official Contact:
              </h3>
              <p className="text-sm">
                <strong>Swadeep Shikshan Vikas Sanstha</strong><br />
                Operating Headquarters: {OFFICE_LOCATIONS.operating.fullAddress}<br />
                Attention: Kalyan Dangar<br />
                Telephone: <a href="tel:+919428309408" className="text-forest underline font-bold">+91-942-830-9408</a><br />
                Email: <a href="mailto:swadeepindiango@gmail.com" className="text-forest underline font-bold">swadeepindiango@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Footer Back Link */}
          <div className="pt-6 border-t border-forest/10 flex justify-between items-center text-sm">
            <Link
              href="/"
              className="font-bold text-forest hover:text-forest-dark underline"
            >
              Return to Homepage
            </Link>
            <Link
              href="/contact"
              className="font-bold text-forest hover:text-forest-dark underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
