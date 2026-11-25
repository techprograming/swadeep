"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GetInvolvedSubNav from "@/components/ui/GetInvolvedSubNav";
import { CheckCircleIcon, HandshakeIcon } from "@/components/ui/Icons";
import { PARTNERS } from "@/lib/constants";

export default function PartnerWithUsContent() {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    collaborationArea: "Education & Anganwadi Support",
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
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus("success");
        setStatusMessage(data.message || "Thank you for reaching out to collaborate with Swadeep Shikshan Vikas Sanstha. Our team will connect with you shortly.");
        setFormData({
          organizationName: "",
          contactPerson: "",
          email: "",
          phone: "",
          collaborationArea: "Education & Anganwadi Support",
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
      <GetInvolvedSubNav activeTab="partner" />

      {/* Hero Section — 100% Exact Original Content */}
      <section
        aria-labelledby="partner-heading"
        className="relative py-16 sm:py-20 bg-gradient-to-br from-[#0B3025] via-[#174B38] to-[#205943] text-cream overflow-hidden"
      >
        <div className="container-wide section-padding relative z-10 max-w-4xl mx-auto space-y-4 text-center">
          <p className="text-xs uppercase tracking-widest text-cream/70 font-semibold">
            Swadeep Shikshan Vikas Sanstha
          </p>

          <h1
            id="partner-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            Partner With Us
          </h1>

          <p className="font-body text-cream/90 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed pt-2">
            Swadeep is always open for collaboration with individuals and organisations having similar vision.  We have been funded by corporate, government, NGOs, social groups and individuals to carryout impactful work.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16">
        <div className="container-wide max-w-4xl mx-auto px-4 sm:px-6 space-y-12">

          {/* Partner Inquiry Form Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-forest/15 space-y-6">
            <div className="border-b border-forest/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A] block">
                COLLABORATION INQUIRY
              </span>
              <h2 className="font-heading text-2xl font-bold text-[#0B3025] mt-1">
                Connect with Swadeep for Impactful Collaboration
              </h2>
            </div>

            {formStatus === "success" ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest-50 text-forest mx-auto flex items-center justify-center">
                  <CheckCircleIcon size={36} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-forest-dark">
                  Inquiry Received!
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  {statusMessage}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="px-6 py-2.5 rounded-full text-sm font-bold text-forest border border-forest/30 hover:bg-forest/5 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="partner-org" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      Organization / Individual Name *
                    </label>
                    <input
                      id="partner-org"
                      type="text"
                      required
                      placeholder="e.g. CSR Foundation / Enterprise / Individual"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="partner-contact" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      Contact Person *
                    </label>
                    <input
                      id="partner-contact"
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="partner-email" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      Email Address *
                    </label>
                    <input
                      id="partner-email"
                      type="email"
                      required
                      placeholder="contact@organization.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="partner-phone" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      Phone Number
                    </label>
                    <input
                      id="partner-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="partner-area" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                    Area of Collaboration / Focus
                  </label>
                  <select
                    id="partner-area"
                    value={formData.collaborationArea}
                    onChange={(e) => setFormData({ ...formData, collaborationArea: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium bg-white transition-colors"
                  >
                    <option value="Education & Anganwadi Support">Education & Anganwadi Support</option>
                    <option value="Community Health & Dental Care">Community Health & Dental Care</option>
                    <option value="Coastal Fishermen Livelihoods">Coastal Fishermen Livelihoods</option>
                    <option value="Rural Infrastructure & Solar Lighting">Rural Infrastructure & Solar Lighting</option>
                    <option value="Disaster Management & Relief">Disaster Management & Relief</option>
                    <option value="General Institutional Partnership">General Institutional Partnership</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="partner-message" className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                    Collaboration Details / Proposal *
                  </label>
                  <textarea
                    id="partner-message"
                    required
                    rows={4}
                    placeholder="Describe your organization's vision, intended area of support, or how you would like to collaborate..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 rounded-xl text-base font-extrabold text-white bg-[#174B38] hover:bg-[#0B3025] disabled:opacity-60 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {formStatus === "submitting" ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <HandshakeIcon size={18} />
                        <span>Submit Collaboration Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Verified Institutional & CSR Partners Showcase */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-forest/15 shadow-sm space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-forest block">
                OUR PARTNERS
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0B3025]">
                Corporate, Government & Social Collaborators
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-4">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  className="p-4 rounded-2xl bg-cream/40 border border-forest/10 flex flex-col items-center justify-center text-center space-y-2 hover:bg-cream/80 transition-colors"
                >
                  <div className="relative w-16 h-12">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-semibold text-charcoal/90 leading-tight">
                    {partner.shortName}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
