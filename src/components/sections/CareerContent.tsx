"use client";

import React, { useState } from "react";
import GetInvolvedSubNav from "@/components/ui/GetInvolvedSubNav";
import { CheckCircleIcon, BriefcaseIcon, FileTextIcon, UploadIcon } from "@/components/ui/Icons";

const CURRENT_OPENINGS = [
  {
    title: "Co-ordinator- Education Project",
    location: "Position based in Gujarat. Contact us to know more.",
  },
  {
    title: "Co-ordinator- Fisheries Project",
    location: "Position based in Gujarat. Contact us to know more.",
  },
  {
    title: "Co-ordinator",
    location: "Position based in Gujarat. Contact us to know more.",
  },
  {
    title: "Co-ordinator",
    location: "Position based in Gujarat. Contact us to know more.",
  },
  {
    title: "Teacher",
    location: "Position based in Gujarat. Contact us to know more.",
  },
  {
    title: "Teacher",
    location: "Position based in Gujarat. Contact us to know more.",
  },
];

const POSITION_OPTIONS = [
  "Select Position",
  "Co-ordinator- Education Project",
  "Co-ordinator- Fisheries Project",
  "Co-ordinator",
  "Teacher",
];

export default function CareerContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "Select Position",
    website: "", // honeypot
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 1048576) {
        setFileError("Max. file size: 1 MB.");
        setCvFile(null);
        return;
      }
      setCvFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileError("");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 1048576) {
        setFileError("Max. file size: 1 MB.");
        setCvFile(null);
        return;
      }
      setCvFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setStatusMessage("");

    if (!cvFile) {
      setFileError("Please upload your CV & Covering Letter (Max. file size: 1 MB).");
      setFormStatus("idle");
      return;
    }

    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position", formData.position);
      data.append("cvFile", cvFile);
      if (formData.website) data.append("website", formData.website);

      const res = await fetch("/api/career", {
        method: "POST",
        body: data,
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setFormStatus("success");
        setStatusMessage(resData.message || "Thank you for applying to team Swadeep! Your application and CV have been received successfully.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          position: "Select Position",
          website: "",
        });
        setCvFile(null);
      } else {
        setFormStatus("error");
        setStatusMessage(resData.error || "Submission failed. Please check your details and try again.");
      }
    } catch {
      setFormStatus("error");
      setStatusMessage("Network error. Please try again later or contact us directly.");
    }
  };

  return (
    <main id="main-content" className="flex-1 bg-cream min-h-screen">
      {/* Sub Navigation */}
      <GetInvolvedSubNav activeTab="career" />

      {/* Hero Section — 100% Exact Original Content */}
      <section
        aria-labelledby="career-heading"
        className="relative py-16 sm:py-20 bg-gradient-to-br from-[#0B3025] via-[#174B38] to-[#205943] text-cream overflow-hidden"
      >
        <div className="container-wide section-padding relative z-10 max-w-4xl mx-auto space-y-4 text-center">
          <p className="text-xs uppercase tracking-widest text-cream/70 font-semibold">
            Swadeep Shikshan Vikas Sanstha
          </p>

          <h1
            id="career-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            Discover New Career
          </h1>

          <p className="font-body text-cream/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            Come, be a part of team Swadeep! Together, let’s spread smile across the world!
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16">
        <div className="container-wide max-w-4xl mx-auto px-4 sm:px-6 space-y-12">

          {/* Current Openings Section — 100% Exact Original Titles and Locations */}
          <div className="space-y-6">
            <div className="border-b border-forest/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A] block">
                OPPORTUNITIES
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025] mt-1">
                Current Openings
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CURRENT_OPENINGS.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-forest/15 shadow-sm hover:border-forest/30 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center">
                      <BriefcaseIcon size={20} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#0B3025]">
                      {job.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-charcoal/75">
                      {job.location}
                    </p>
                  </div>
                  <a
                    href="#apply-form"
                    onClick={() => {
                      if (POSITION_OPTIONS.includes(job.title)) {
                        setFormData((prev) => ({ ...prev, position: job.title }));
                      }
                    }}
                    className="text-xs font-bold text-[#F47B2A] hover:text-[#E06A1B] inline-flex items-center gap-1 pt-2"
                  >
                    <span>Apply for this position →</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form Section — 100% Exact Original Labels */}
          <div id="apply-form" className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-forest/15 space-y-6 scroll-mt-24">
            <div className="border-b border-forest/10 pb-4">
              <h3 className="font-heading text-2xl font-bold text-[#0B3025]">
                Please fill out the form below
              </h3>
              <p className="text-xs font-medium text-charcoal/60 mt-1">
                &quot;*&quot; indicates required fields
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest-50 text-forest mx-auto flex items-center justify-center">
                  <CheckCircleIcon size={36} />
                </div>
                <h4 className="font-heading text-2xl font-bold text-forest-dark">
                  Application Submitted!
                </h4>
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

                {/* Your Name* */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#0B3025]">
                    Your Name*
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

                {/* Your Email* */}
                <div className="space-y-1.5">
                  <label htmlFor="career-email" className="block text-sm font-bold text-[#0B3025]">
                    Your Email*
                  </label>
                  <input
                    id="career-email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                  />
                </div>

                {/* Contact No.* */}
                <div className="space-y-1.5">
                  <label htmlFor="career-phone" className="block text-sm font-bold text-[#0B3025]">
                    Contact No.*
                  </label>
                  <input
                    id="career-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium transition-colors"
                  />
                </div>

                {/* Apply for a Position* */}
                <div className="space-y-1.5">
                  <label htmlFor="career-position" className="block text-sm font-bold text-[#0B3025]">
                    Apply for a Position*
                  </label>
                  <select
                    id="career-position"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none text-sm font-medium bg-white transition-colors"
                  >
                    {POSITION_OPTIONS.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upload Your CV & Covering Letter* */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#0B3025]">
                    Upload Your CV &amp; Covering Letter*
                  </label>
                  
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center space-y-3 transition-colors ${
                      fileError ? "border-red-400 bg-red-50/50" : "border-forest/25 hover:border-forest/50 bg-cream/30"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-forest-50 text-forest mx-auto flex items-center justify-center">
                      <UploadIcon size={24} />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-charcoal/90">
                        {cvFile ? (
                          <span className="text-forest font-bold">{cvFile.name} ({(cvFile.size / 1024).toFixed(1)} KB)</span>
                        ) : (
                          <>
                            Drop files here or{" "}
                            <label className="text-[#F47B2A] hover:underline cursor-pointer font-bold">
                              Select files
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          </>
                        )}
                      </p>
                      <p className="text-xs text-charcoal/60">
                        Max. file size: 1 MB.
                      </p>
                    </div>

                    {cvFile && (
                      <button
                        type="button"
                        onClick={() => setCvFile(null)}
                        className="text-xs text-red-600 hover:underline font-semibold"
                      >
                        Remove file
                      </button>
                    )}
                  </div>

                  {fileError && (
                    <p className="text-xs font-semibold text-red-600">{fileError}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 rounded-xl text-base font-extrabold text-white bg-[#174B38] hover:bg-[#0B3025] disabled:opacity-60 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {formStatus === "submitting" ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <span>Submit Application</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
