"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GetInvolvedSubNav from "@/components/ui/GetInvolvedSubNav";
import { CheckCircleIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";

const COUNTRIES = [
  "India",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Liberia",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Viet Nam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function VolunteerContent() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    message: "",
    website: "", // honeypot
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setStatusMessage("");

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus("success");
        setStatusMessage(data.message || "Thank you for offering your zeal and compassion! Your volunteer application has been received successfully.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          streetAddress: "",
          addressLine2: "",
          city: "",
          state: "",
          zipCode: "",
          country: "India",
          message: "",
          website: "",
        });
      } else {
        setFormStatus("error");
        setStatusMessage(data.error || "Submission failed. Please check your details and try again.");
      }
    } catch {
      setFormStatus("error");
      setStatusMessage("Network error. Please try again later or contact us directly.");
    }
  };

  return (
    <main id="main-content" className="flex-1 bg-cream min-h-screen">
      {/* Sub Navigation */}
      <GetInvolvedSubNav activeTab="volunteer" />

      {/* Hero Section — 100% Exact Original Content */}
      <section
        aria-labelledby="volunteer-heading"
        className="relative py-16 sm:py-20 bg-gradient-to-br from-[#0B3025] via-[#174B38] to-[#205943] text-cream overflow-hidden"
      >
        <div className="container-wide section-padding relative z-10 max-w-4xl mx-auto space-y-4 text-center">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-saffron border border-white/15">
            Help Us Help Them
          </span>

          <p className="text-xs uppercase tracking-widest text-cream/70 font-semibold">
            Swadeep Shikshan Vikas Sanstha
          </p>

          <h1
            id="volunteer-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            Become A Volunteer
          </h1>

          <p className="font-body text-cream/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            We are a cause-driven NGO deeply engaged at grassroots through life-transforming programs. Join our hands in reaching out to communities through your zeal and compassion!
          </p>
        </div>
      </section>

      {/* Main Content & Form Area */}
      <section className="py-12 sm:py-16">
        <div className="container-wide max-w-4xl mx-auto px-4 sm:px-6 space-y-10">

          {/* Authentic Original Photograph Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-forest/15 shadow-sm">
            <div className="relative w-full h-64 sm:h-80">
              <Image
                src="/images/help-us-help-them.jpg"
                alt="Help Us Help Them - Swadeep Shikshan Vikas Sanstha Volunteer Community"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <span className="text-white text-sm font-semibold tracking-wide drop-shadow-md">
                  Swadeep Shikshan Vikas Sanstha — Community Volunteering
                </span>
              </div>
            </div>
          </div>

          {/* Volunteer Form Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-forest/15">
            {formStatus === "success" ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest-50 text-forest mx-auto flex items-center justify-center">
                  <CheckCircleIcon size={36} />
                </div>
                <h2 className="font-heading text-2xl font-bold text-forest-dark">
                  Application Received!
                </h2>
                <p className="font-body text-charcoal/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  {statusMessage}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="px-6 py-2.5 rounded-full text-sm font-bold text-forest border border-forest/30 hover:bg-forest/5 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="hidden"
                  aria-hidden="true"
                />

                {formStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
                    {statusMessage}
                  </div>
                )}

                {/* Volunteer Name(Required) */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#0B3025]">
                    Volunteer Name<span className="text-[#F47B2A] font-bold">(Required)</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="First Name"
                        aria-label="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                      />
                      <span className="text-[11px] text-charcoal/60 mt-1 block">First</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Last Name"
                        aria-label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                      />
                      <span className="text-[11px] text-charcoal/60 mt-1 block">Last</span>
                    </div>
                  </div>
                </div>

                {/* Volunteer Email(Required) */}
                <div className="space-y-1.5">
                  <label htmlFor="volunteer-email" className="block text-sm font-bold text-[#0B3025]">
                    Volunteer Email<span className="text-[#F47B2A] font-bold">(Required)</span>
                  </label>
                  <input
                    id="volunteer-email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                  />
                </div>

                {/* Volunteer Mobile No.(Required) */}
                <div className="space-y-1.5">
                  <label htmlFor="volunteer-phone" className="block text-sm font-bold text-[#0B3025]">
                    Volunteer Mobile No.<span className="text-[#F47B2A] font-bold">(Required)</span>
                  </label>
                  <input
                    id="volunteer-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                  />
                </div>

                {/* Volunteer Address(Required) */}
                <div className="space-y-3 pt-2">
                  <label className="block text-sm font-bold text-[#0B3025]">
                    Volunteer Address<span className="text-[#F47B2A] font-bold">(Required)</span>
                  </label>
                  
                  {/* Street Address */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Street Address"
                      aria-label="Street Address"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                    />
                    <span className="text-[11px] text-charcoal/60 mt-1 block">Street Address</span>
                  </div>

                  {/* Address Line 2 */}
                  <div>
                    <input
                      type="text"
                      placeholder="Address Line 2"
                      aria-label="Address Line 2"
                      value={formData.addressLine2}
                      onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                    />
                    <span className="text-[11px] text-charcoal/60 mt-1 block">Address Line 2</span>
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="City"
                        aria-label="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                      />
                      <span className="text-[11px] text-charcoal/60 mt-1 block">City</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="State / Province / Region"
                        aria-label="State / Province / Region"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                      />
                      <span className="text-[11px] text-charcoal/60 mt-1 block">State / Province / Region</span>
                    </div>
                  </div>

                  {/* ZIP and Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="ZIP / Postal Code"
                        aria-label="ZIP / Postal Code"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                      />
                      <span className="text-[11px] text-charcoal/60 mt-1 block">ZIP / Postal Code</span>
                    </div>
                    <div>
                      <select
                        aria-label="Country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium bg-white transition-colors"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <span className="text-[11px] text-charcoal/60 mt-1 block">Country</span>
                    </div>
                  </div>
                </div>

                {/* Write Your Message(Required) */}
                <div className="space-y-1.5 pt-2">
                  <label htmlFor="volunteer-message" className="block text-sm font-bold text-[#0B3025]">
                    Write Your Message<span className="text-[#F47B2A] font-bold">(Required)</span>
                  </label>
                  <textarea
                    id="volunteer-message"
                    required
                    rows={4}
                    placeholder="Share how you would like to contribute your time, skills, or zeal..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm transition-colors"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 rounded-xl text-base font-extrabold text-white bg-[#174B38] hover:bg-[#0B3025] disabled:opacity-60 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {formStatus === "submitting" ? (
                      <span>Submitting...</span>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Social Media Links — 100% Exact Original Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-forest/15 shadow-sm text-center space-y-4">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#0B3025]">
              To Keep Up With The News Follow Us On Social
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
              <a
                href="https://www.facebook.com/swadeep.india"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#1877F2] bg-[#1877F2]/10 hover:bg-[#1877F2]/20 transition-colors"
              >
                <span>Facebook</span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCoeuNu1qz3E3eikxcIw6vkA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#FF0000] bg-[#FF0000]/10 hover:bg-[#FF0000]/20 transition-colors"
              >
                <span>YouTube</span>
              </a>
              <a
                href="https://in.linkedin.com/in/swadeep-india-a5464871"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#0A66C2] bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 transition-colors"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
