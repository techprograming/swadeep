"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { isValidEmail } from "@/lib/utils";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  MapPinIcon,
  PhoneCallIcon,
  MailIcon,
  ClockIcon,
  CompassIcon,
} from "@/components/ui/Icons";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (trimmedName.length > 100) {
      newErrors.name = "Name cannot exceed 100 characters.";
    }

    // Email validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (!isValidEmail(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone validation (optional, but if provided, validate)
    const trimmedPhone = formData.phone.trim();
    if (trimmedPhone) {
      const phoneRegex = /^[+]?[\d\s-]{8,15}$/;
      if (!phoneRegex.test(trimmedPhone)) {
        newErrors.phone = "Please enter a valid phone number (8-15 digits).";
      }
    }

    // Subject validation
    const trimmedSubject = formData.subject.trim();
    if (!trimmedSubject) {
      newErrors.subject = "Subject is required.";
    } else if (trimmedSubject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    // Message validation
    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      newErrors.message = "Message is required.";
    } else if (trimmedMessage.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    } else if (trimmedMessage.length > 2000) {
      newErrors.message = "Message cannot exceed 2000 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setErrorMessage("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="contact-hero-heading"
        className="relative py-20 lg:py-28 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 bg-saffron/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-10 w-80 h-80 bg-forest-light/30 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="container-wide section-padding relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-saffron-light border border-white/15">
            <span>We Are Here to Listen & Collaborate</span>
          </div>

          <h1
            id="contact-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            Get In Touch
          </h1>

          <p className="font-gujarati text-xl sm:text-2xl text-cream/90 font-medium">
            અમારો સંપર્ક કરો — સહયોગ, માર્ગદર્શન અને પ્રશ્નો માટે
          </p>

          <p className="font-body text-cream/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about our programs, wish to collaborate, or want to
            visit our project sites in rural Gujarat? Reach out to us directly.
          </p>
        </div>
      </section>

      {/* 2. Main Two-Column Layout: Form (Left) & Info (Right) */}
      <section className="section-padding py-20 lg:py-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-forest/10">
              <div className="mb-8 space-y-2">
                <span className="font-gujarati text-saffron-dark text-sm font-semibold block">
                  સંદેશ મોકલો
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-forest-dark">
                  SEND US AN EMAIL
                </h2>
                <p className="font-body text-charcoal/70 text-sm sm:text-base">
                  &ldquo;*&rdquo; indicates required fields
                </p>
              </div>

              {/* Status Notifications */}
              {submitStatus === "success" && (
                <div
                  role="alert"
                  className="mb-6 p-4 rounded-2xl bg-forest-50 border border-forest-200 text-forest-dark flex items-start space-x-3"
                >
                  <svg
                    className="w-5 h-5 text-forest shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-heading font-bold text-sm">Thank you!</h3>
                    <p className="text-xs sm:text-sm mt-0.5">
                      Your message has been successfully received. We will be in touch shortly.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  role="alert"
                  className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3"
                >
                  <svg
                    className="w-5 h-5 text-rose-600 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-heading font-bold text-sm">Submission Error</h3>
                    <p className="text-xs sm:text-sm mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs sm:text-sm font-semibold text-charcoal"
                    >
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Patel"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-rose-400 bg-rose-50/30 focus:ring-rose-400"
                          : "border-forest/15 bg-cream/30 focus:border-forest focus:ring-forest/20"
                      }`}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-rose-600 font-medium">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs sm:text-sm font-semibold text-charcoal"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-rose-400 bg-rose-50/30 focus:ring-rose-400"
                          : "border-forest/15 bg-cream/30 focus:border-forest focus:ring-forest/20"
                      }`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-rose-600 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs sm:text-sm font-semibold text-charcoal"
                    >
                      Phone Number <span className="text-charcoal/40 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? "border-rose-400 bg-rose-50/30 focus:ring-rose-400"
                          : "border-forest/15 bg-cream/30 focus:border-forest focus:ring-forest/20"
                      }`}
                      aria-invalid={errors.phone ? "true" : "false"}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-rose-600 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs sm:text-sm font-semibold text-charcoal"
                    >
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. CSR Partnership / Volunteer Inquiry"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                        errors.subject
                          ? "border-rose-400 bg-rose-50/30 focus:ring-rose-400"
                          : "border-forest/15 bg-cream/30 focus:border-forest focus:ring-forest/20"
                      }`}
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-xs text-rose-600 font-medium">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs sm:text-sm font-semibold text-charcoal"
                    >
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-xs text-charcoal/40">
                      {formData.message.length} / 2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about how you would like to connect with Swadeep..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 resize-y ${
                      errors.message
                        ? "border-rose-400 bg-rose-50/30 focus:ring-rose-400"
                        : "border-forest/15 bg-cream/30 focus:border-forest focus:ring-forest/20"
                    }`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-rose-600 font-medium">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-white bg-saffron hover:bg-saffron-dark disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Contact Details, Map Placeholder & Social Links */}
            <div className="lg:col-span-5 space-y-8">
              {/* Info Card */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-forest/10 space-y-6">
                <div>
                  <span className="font-gujarati text-saffron-dark text-xs font-semibold block uppercase">
                    સીધો સંપર્ક
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest-dark mt-1">
                    Contact Information
                  </h3>
                </div>

                <div className="space-y-5 text-sm text-charcoal/80 font-body">
                  {/* Address */}
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center shrink-0 border border-forest-100">
                      <MapPinIcon className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-forest uppercase tracking-wider">
                        Registered Office
                      </span>
                      <p className="font-medium text-charcoal/90 mt-0.5 leading-snug">
                        {SITE_CONFIG.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center shrink-0 border border-forest-100">
                      <PhoneCallIcon className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-forest uppercase tracking-wider">
                        Helpline / Telephone
                      </span>
                      <a
                        href={`tel:${SITE_CONFIG.phone}`}
                        className="font-medium text-charcoal/90 hover:text-saffron transition-colors mt-0.5 block"
                      >
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center shrink-0 border border-forest-100">
                      <MailIcon className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-forest uppercase tracking-wider">
                        Official Inquiries
                      </span>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="font-medium text-charcoal/90 hover:text-saffron transition-colors mt-0.5 block"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center shrink-0 border border-forest-100">
                      <ClockIcon className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-forest uppercase tracking-wider">
                        Office Working Hours
                      </span>
                      <p className="font-medium text-charcoal/90 mt-0.5">
                        Monday – Saturday: 9:30 AM – 6:30 PM
                      </p>
                      <span className="text-xs text-charcoal/60">Sunday: Closed</span>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="pt-6 border-t border-cream-dark">
                  <span className="block text-xs font-bold text-forest uppercase tracking-wider mb-3">
                    Connect on Social Media
                  </span>
                  <div className="flex items-center space-x-3">
                    {/* Facebook */}
                    <a
                      href={SITE_CONFIG.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-forest-50 hover:bg-forest text-forest hover:text-white flex items-center justify-center transition-colors border border-forest-100"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>

                    {/* Twitter */}
                    <a
                      href={SITE_CONFIG.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-forest-50 hover:bg-forest text-forest hover:text-white flex items-center justify-center transition-colors border border-forest-100"
                      aria-label="Twitter"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href={SITE_CONFIG.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-forest-50 hover:bg-forest text-forest hover:text-white flex items-center justify-center transition-colors border border-forest-100"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    {/* YouTube */}
                    <a
                      href={SITE_CONFIG.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-forest-50 hover:bg-forest text-forest hover:text-white flex items-center justify-center transition-colors border border-forest-100"
                      aria-label="YouTube"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* FAQ from swadeep.org */}
                <div className="pt-6 border-t border-cream-dark space-y-2">
                  <span className="block text-xs font-bold text-forest uppercase tracking-wider">
                    FREQUENTLY ASKED QUESTIONS
                  </span>
                  <p className="font-heading font-semibold text-sm text-forest-dark">
                    Do you have questions about how we can help your company?
                  </p>
                  <p className="font-body text-xs sm:text-sm text-charcoal/80">
                    Send us an email and we’ll get in touch shortly.
                  </p>
                </div>
              </div>

              {/* Map Placeholder Div */}
              <div className="bg-forest-light rounded-3xl p-6 sm:p-8 text-cream shadow-xl border border-white/20 relative overflow-hidden flex flex-col justify-between min-h-[260px]">
                {/* Decorative Map Pattern grid */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-forest-dark/80 px-3 py-1 rounded-full text-xs font-bold text-saffron-light">
                    Location Overview
                  </span>
                  <CompassIcon className="w-6 h-6 text-saffron-light" />
                </div>

                <div className="relative z-10 my-4 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-saffron text-white flex items-center justify-center shadow-lg animate-bounce">
                    <MapPinIcon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-heading text-lg sm:text-xl font-bold text-white">
                    Headquarters: Prahlad Nagar, Ahmedabad
                  </h4>
                  <p className="text-sm sm:text-base text-cream/90 max-w-sm mx-auto leading-relaxed">
                    SWADEEP, 21, Abhinandan Park Society, Prernatirth Derasar Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/10 text-center">
                  <a
                    href="https://maps.google.com/?q=SWADEEP+21+Abhinandan+Park+Society+Prernatirth+Derasar+Rd+Prahlad+Nagar+Ahmedabad+Gujarat+380015"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold text-white hover:text-saffron-light transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <svg
                      className="w-3.5 h-3.5 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
