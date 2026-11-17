"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  SearchIcon,
  ClockIcon,
  BuildingIcon,
  MapPinIcon,
} from "@/components/ui/Icons";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  is_read: boolean;
  created_at: string;
}

interface Metric {
  metric_key?: string;
  key?: string;
  label_en: string;
  label_gu?: string;
  metric_value?: string;
  value?: string;
  subtext_en?: string;
}

interface Trustee {
  id: string;
  name: string;
  nameGu?: string;
  role: string;
  roleGu?: string;
  category?: string;
  description?: string;
  image?: string;
  highlight?: boolean;
}

interface Partner {
  id: string;
  name: string;
  nameGu?: string;
  category?: string;
  role: string;
  roleGu?: string;
  description?: string;
  logo?: string;
}

interface Report {
  id: string;
  title: string;
  titleGu?: string;
  category: string;
  year: string;
  description?: string;
  fileUrl?: string;
  status?: string;
}

type AdminTab = "inquiries" | "trustees" | "partners" | "reports" | "reviews" | "metrics" | "system";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("inquiries");

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquirySearch, setInquirySearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  // Dynamic Entities state
  const [trustees, setTrustees] = useState<Trustee[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  // Metrics state
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [editingMetricKey, setEditingMetricKey] = useState<string | null>(null);
  const [metricEditValue, setMetricEditValue] = useState("");
  const [isUpdatingMetric, setIsUpdatingMetric] = useState(false);

  // Form Modals / Expandable state
  const [isAddingTrustee, setIsAddingTrustee] = useState(false);
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const [isAddingReport, setIsAddingReport] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Entity Form States
  const [newTrustee, setNewTrustee] = useState({
    name: "",
    nameGu: "",
    role: "Trustee",
    roleGu: "ટ્રસ્ટી",
    category: "Trustee",
    description: "",
    image: "",
    highlight: false,
  });
  const [newPartner, setNewPartner] = useState({ name: "", role: "", logo: "" });
  const [newReport, setNewReport] = useState({ title: "", titleGu: "", category: "Annual Report", year: "2024-2025", description: "", fileUrl: "" });

  // System status state
  const [isDbConnected, setIsDbConnected] = useState<boolean | null>(null);

  // Check saved session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("swadeep_admin_token");
    const savedUser = localStorage.getItem("swadeep_admin_user");
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("swadeep_admin_token");
        localStorage.removeItem("swadeep_admin_user");
      }
    }
  }, []);

  // Fetch all data when authenticated
  const loadAllData = async () => {
    if (!token) return;
    setIsLoadingInquiries(true);
    try {
      const [inqRes, metRes, revRes, truRes, partRes, repRes] = await Promise.all([
        fetch("/api/admin/inquiries", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/admin/metrics"),
        fetch("/api/reviews"),
        fetch("/api/trustees"),
        fetch("/api/partners"),
        fetch("/api/reports"),
      ]);

      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData.inquiries || []);
        setIsDbConnected(inqData.isConnected ?? false);
      }
      if (metRes.ok) {
        const metData = await metRes.json();
        setMetrics(metData.metrics || []);
      }
      if (revRes && revRes.ok) {
        const revData = await revRes.json();
        setReviews(revData.reviews || []);
      }
      if (truRes && truRes.ok) {
        const truData = await truRes.json();
        setTrustees(truData.trustees || []);
      }
      if (partRes && partRes.ok) {
        const partData = await partRes.json();
        setPartners(partData.partners || []);
      }
      if (repRes && repRes.ok) {
        const repData = await repRes.json();
        setReports(repData.reports || []);
      }
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [token]);

  const showFeedback = (type: "success" | "error", text: string) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setLoginError(data.error || "Authentication failed. Please verify credentials.");
        return;
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("swadeep_admin_token", data.token);
      localStorage.setItem("swadeep_admin_user", JSON.stringify(data.user));
    } catch {
      setLoginError("Could not reach authentication server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("swadeep_admin_token");
    localStorage.removeItem("swadeep_admin_user");
  };

  // Add Trustee Handler
  const handleAddTrustee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/trustees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTrustee),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTrustees((prev) => [...prev, data.trustee]);
        setIsAddingTrustee(false);
        setNewTrustee({
          name: "",
          nameGu: "",
          role: "Trustee",
          roleGu: "ટ્રસ્ટી",
          category: "Trustee",
          description: "",
          image: "",
          highlight: false,
        });
        showFeedback("success", "Trustee added to website successfully!");
      } else {
        showFeedback("error", data.error || "Failed to add trustee.");
      }
    } catch {
      showFeedback("error", "Network error while saving trustee.");
    }
  };

  const handleDeleteTrustee = async (id: string) => {
    if (!confirm("Are you sure you want to remove this trustee?")) return;
    try {
      const res = await fetch(`/api/trustees?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        setTrustees((prev) => prev.filter((t) => t.id !== id));
        showFeedback("success", "Trustee removed.");
      }
    } catch {
      showFeedback("error", "Failed to remove trustee.");
    }
  };

  // Add Partner Handler
  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPartner),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPartners((prev) => [...prev, data.partner]);
        setIsAddingPartner(false);
        setNewPartner({ name: "", role: "", logo: "" });
        showFeedback("success", "Partner added to website successfully!");
      } else {
        showFeedback("error", data.error || "Failed to add partner.");
      }
    } catch {
      showFeedback("error", "Network error while saving partner.");
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!confirm("Are you sure you want to remove this partner?")) return;
    try {
      const res = await fetch(`/api/partners?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        setPartners((prev) => prev.filter((p) => p.id !== id));
        showFeedback("success", "Partner removed.");
      }
    } catch {
      showFeedback("error", "Failed to remove partner.");
    }
  };

  // Add Report Handler
  const handleAddReport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReport),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReports((prev) => [data.report, ...prev]);
        setIsAddingReport(false);
        setNewReport({ title: "", titleGu: "", category: "Annual Report", year: "2024-2025", description: "", fileUrl: "" });
        showFeedback("success", "Report published to website successfully!");
      } else {
        showFeedback("error", data.error || "Failed to publish report.");
      }
    } catch {
      showFeedback("error", "Network error while saving report.");
    }
  };

  const handleDeleteReport = async (id: string) => {
    if (!confirm("Are you sure you want to remove this report?")) return;
    try {
      const res = await fetch(`/api/reports?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        setReports((prev) => prev.filter((r) => r.id !== id));
        showFeedback("success", "Report removed.");
      }
    } catch {
      showFeedback("error", "Failed to remove report.");
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to remove this review?")) return;
    try {
      const res = await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        showFeedback("success", "Review removed.");
      } else {
        showFeedback("error", "Failed to remove review.");
      }
    } catch {
      showFeedback("error", "Failed to remove review.");
    }
  };

  const handleUpdateInquiryStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleSaveMetric = async (key: string) => {
    if (!metricEditValue.trim()) return;
    setIsUpdatingMetric(true);
    try {
      const res = await fetch("/api/admin/metrics", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ key, value: metricEditValue.trim() }),
      });
      if (res.ok) {
        setMetrics((prev) =>
          prev.map((m) =>
            (m.key || m.metric_key) === key
              ? { ...m, value: metricEditValue.trim(), metric_value: metricEditValue.trim() }
              : m
          )
        );
        setEditingMetricKey(null);
        showFeedback("success", "Metric updated successfully.");
      }
    } catch (err) {
      console.error("Failed to update metric", err);
    } finally {
      setIsUpdatingMetric(false);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.subject.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.message.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main id="main-content" className="pt-24 sm:pt-28 pb-20 bg-cream min-h-screen">
      <div className="container-wide section-padding max-w-6xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-forest/15 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47B2A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B3025]">
                Internal Administration Portal
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025] mt-1">
              Swadeep Administrative Dashboard
            </h1>
          </div>

          {token && user && (
            <div className="flex items-center space-x-3">
              <div className="text-right text-xs">
                <div className="font-bold text-[#0B3025]">{user.username}</div>
                <div className="text-charcoal/60 capitalize">{user.role} role</div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-full text-xs font-bold bg-white hover:bg-forest-50 border border-forest/20 text-[#0B3025] transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Global Feedback Banner */}
        {actionMessage && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-bold animate-in fade-in duration-200 ${
              actionMessage.type === "success"
                ? "bg-green-50 text-green-900 border border-green-200"
                : "bg-red-50 text-red-900 border border-red-200"
            }`}
          >
            {actionMessage.text}
          </div>
        )}

        {/* Unauthenticated View: Secure Login Card */}
        {!token ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-forest/15 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#0B3025] text-white mx-auto flex items-center justify-center">
                <ShieldCheckIcon size={24} />
              </div>
              <h2 className="font-heading text-xl font-bold text-[#0B3025]">
                NGO Administrator Login
              </h2>
              <p className="font-body text-xs sm:text-sm text-charcoal/70">
                Sign in to manage trustees, partners, reports, contact inquiries, and metrics.
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0B3025] mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="swadeepngo"
                  className="w-full px-4 py-3 rounded-2xl bg-cream/40 border border-forest/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B3025] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-2xl bg-cream/40 border border-forest/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-[#0B3025] hover:bg-[#174B38] transition-all shadow-md disabled:opacity-50"
              >
                {isLoggingIn ? "Authenticating..." : "Sign In to Dashboard"}
              </button>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <span className="font-bold">Admin Credentials:</span> ID{" "}
                <code className="bg-amber-100 px-1 rounded font-mono font-bold">swadeepngo</code> / Password{" "}
                <code className="bg-amber-100 px-1 rounded font-mono font-bold">swadeep@2005</code>.
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="space-y-6">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap items-center gap-2 border-b border-forest/10 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab("inquiries")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "inquiries" ? "bg-[#0B3025] text-white shadow-sm" : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Inquiries ({inquiries.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("trustees")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "trustees" ? "bg-[#0B3025] text-white shadow-sm" : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Trustees ({trustees.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("partners")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "partners" ? "bg-[#0B3025] text-white shadow-sm" : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Partners ({partners.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("reports")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "reports" ? "bg-[#0B3025] text-white shadow-sm" : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Annual &amp; Project Reports ({reports.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "reviews" ? "bg-[#0B3025] text-white shadow-sm" : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Public Reviews ({reviews.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("metrics")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "metrics" ? "bg-[#0B3025] text-white shadow-sm" : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Metrics ({metrics.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("system")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "system" ? "bg-[#0B3025] text-white shadow-sm" : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                System Status
              </button>
            </div>

            {/* TAB: Inquiries Manager */}
            {activeTab === "inquiries" && (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-3xl border border-forest/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-2xl bg-cream/40 border border-forest/15 text-xs focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                    />
                    <SearchIcon size={14} className="absolute left-3 top-2.5 text-charcoal/40" />
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <span className="text-xs text-charcoal/60">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-2xl bg-cream/40 border border-forest/15 text-xs font-semibold text-[#0B3025] focus:outline-none"
                    >
                      <option value="all">All Inquiries</option>
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {isLoadingInquiries ? (
                  <div className="bg-white p-12 rounded-3xl text-center text-xs text-charcoal/60">
                    Loading inquiries...
                  </div>
                ) : filteredInquiries.length === 0 ? (
                  <div className="bg-white p-12 rounded-3xl text-center space-y-2 border border-forest/10">
                    <div className="font-heading font-bold text-base text-[#0B3025]">
                      No inquiries match your filter.
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 space-y-3">
                      {filteredInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => setSelectedInquiry(inq)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            selectedInquiry?.id === inq.id
                              ? "bg-forest-50/70 border-[#174B38] shadow-sm"
                              : "bg-white border-forest/10 hover:border-forest/25"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs sm:text-sm text-[#0B3025]">
                              {inq.name}
                            </span>
                            <span
                              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                inq.status === "new"
                                  ? "bg-amber-100 text-amber-800"
                                  : inq.status === "replied"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-charcoal/80 mt-1">
                            {inq.subject}
                          </div>
                          <p className="text-xs text-charcoal/60 line-clamp-2 mt-0.5">
                            {inq.message}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="lg:col-span-6">
                      {selectedInquiry ? (
                        <div className="bg-white p-6 rounded-3xl border border-forest/15 shadow-sm space-y-4 sticky top-28">
                          <div className="border-b border-forest/10 pb-4">
                            <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                              {selectedInquiry.subject}
                            </h3>
                            <div className="text-xs text-charcoal/60 mt-1">
                              From <span className="font-bold text-charcoal">{selectedInquiry.name}</span> ({selectedInquiry.email})
                            </div>
                          </div>
                          <div className="bg-cream/40 p-4 rounded-2xl text-xs text-charcoal/90 whitespace-pre-wrap leading-relaxed">
                            {selectedInquiry.message}
                          </div>
                          <div className="pt-2 flex items-center gap-2">
                            <span className="text-xs text-charcoal/60">Mark as:</span>
                            {["new", "reviewed", "replied", "archived"].map((st) => (
                              <button
                                key={st}
                                onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, st)}
                                className={`px-2.5 py-1 text-[11px] rounded-full font-bold uppercase transition-all ${
                                  selectedInquiry.status === st
                                    ? "bg-[#0B3025] text-white"
                                    : "bg-gray-100 text-charcoal/70 hover:bg-gray-200"
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white p-12 rounded-3xl border border-dashed border-forest/20 text-center text-xs text-charcoal/50">
                          Select an inquiry to view full details and change status.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Trustees Management */}
            {activeTab === "trustees" && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-xs flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                      Trustees &amp; Board Governance
                    </h3>
                    <p className="text-xs text-charcoal/60">
                      Manage trustees and executive leadership shown in the "Our Trustees" section on the website.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingTrustee(!isAddingTrustee)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] transition-colors"
                  >
                    {isAddingTrustee ? "Close Form" : "+ Add Trustee"}
                  </button>
                </div>

                {isAddingTrustee && (
                  <form onSubmit={handleAddTrustee} className="bg-white p-6 rounded-3xl border border-forest/20 shadow-md space-y-4">
                    <h4 className="font-heading font-bold text-sm text-[#0B3025]">Add New Trustee</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Name (English) *</label>
                        <input
                          type="text"
                          required
                          value={newTrustee.name}
                          onChange={(e) => setNewTrustee({ ...newTrustee, name: e.target.value })}
                          placeholder="e.g. Ramesh Patel"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Name (Gujarati)</label>
                        <input
                          type="text"
                          value={newTrustee.nameGu}
                          onChange={(e) => setNewTrustee({ ...newTrustee, nameGu: e.target.value })}
                          placeholder="દા.ત. રમેશ પટેલ"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none font-gujarati"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Designation / Role (English)</label>
                        <input
                          type="text"
                          value={newTrustee.role}
                          onChange={(e) => setNewTrustee({ ...newTrustee, role: e.target.value })}
                          placeholder="Trustee / Advisor / Chairman"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Role in Gujarati</label>
                        <input
                          type="text"
                          value={newTrustee.roleGu}
                          onChange={(e) => setNewTrustee({ ...newTrustee, roleGu: e.target.value })}
                          placeholder="ટ્રસ્ટી / સલાહકાર / પ્રમુખ"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none font-gujarati"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Category / Role Type</label>
                        <select
                          value={newTrustee.category}
                          onChange={(e) => setNewTrustee({ ...newTrustee, category: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
                        >
                          <option value="Trustee">Trustee (ટ્રસ્ટી)</option>
                          <option value="Chairman">Chairman (પ્રમુખ)</option>
                          <option value="CEO">Chief Executive Officer (CEO)</option>
                          <option value="Advisor">Advisor (સલાહકાર)</option>
                          <option value="Treasurer">Treasurer (ખજાનચી)</option>
                          <option value="Secretary">Secretary (મંત્રી)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Photo / Avatar URL (Optional)</label>
                        <input
                          type="text"
                          value={newTrustee.image}
                          onChange={(e) => setNewTrustee({ ...newTrustee, image: e.target.value })}
                          placeholder="e.g. /images/trustees/patel.jpg or image URL"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                    </div>

                    {newTrustee.image && (
                      <div className="flex items-center gap-3 p-3 bg-cream/40 rounded-xl border border-forest/10">
                        <div className="w-12 h-12 rounded-xl bg-forest overflow-hidden relative shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={newTrustee.image}
                            alt="Trustee Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                        <span className="text-xs text-charcoal/70">
                          Photo preview thumbnail (will appear on homepage and trustee cards)
                        </span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="trustee-highlight"
                        checked={newTrustee.highlight}
                        onChange={(e) => setNewTrustee({ ...newTrustee, highlight: e.target.checked })}
                        className="w-4 h-4 rounded text-[#F47B2A] focus:ring-[#F47B2A] border-gray-300"
                      />
                      <label htmlFor="trustee-highlight" className="text-xs font-bold text-charcoal/80 cursor-pointer">
                        Feature / Highlight this trustee on website
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal/80 mb-1">Brief Description / Bio</label>
                      <textarea
                        rows={2}
                        value={newTrustee.description}
                        onChange={(e) => setNewTrustee({ ...newTrustee, description: e.target.value })}
                        placeholder="Trustee overseeing education, rural community welfare and institutional partnerships..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none resize-none"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingTrustee(false)}
                        className="px-4 py-2 text-xs font-bold text-charcoal/70 hover:bg-gray-100 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-white bg-[#0B3025] hover:bg-[#174B38] rounded-full shadow-sm"
                      >
                        Save Trustee to Website
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {trustees.map((t) => (
                    <div
                      key={t.id || t.name}
                      className={`bg-white p-5 rounded-2xl border shadow-xs flex flex-col justify-between transition-all ${
                        t.highlight ? "border-[#F47B2A]/40 ring-1 ring-[#F47B2A]/20" : "border-forest/10"
                      }`}
                    >
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-forest text-cream flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden relative shadow-xs">
                            {t.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={t.image}
                                alt={t.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span>
                                {t.name
                                  .replace(/^(Shri|Smt|Dr)\s+/i, "")
                                  .split(" ")
                                  .map((p) => p[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-heading font-bold text-sm text-[#0B3025] truncate block">
                                {t.name}
                              </span>
                              {t.highlight && (
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                                  Featured
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest-50 text-forest border border-forest/15 inline-block mt-0.5">
                              {t.role}
                            </span>
                            {t.nameGu && (
                              <span className="font-gujarati text-xs text-charcoal/60 block mt-1 truncate">
                                {t.nameGu}
                              </span>
                            )}
                          </div>
                        </div>

                        {t.description && (
                          <p className="text-xs text-charcoal/70 line-clamp-2 mt-3 pt-2 border-t border-gray-100">
                            {t.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[11px] text-charcoal/40">
                          {t.image ? "Has Photo" : "Initials Avatar"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteTrustee(t.id)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Partners Management */}
            {activeTab === "partners" && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-xs flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                      Partners &amp; Donors
                    </h3>
                    <p className="text-xs text-charcoal/60">
                      Manage corporate CSR partners, foundations, and government supporters.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingPartner(!isAddingPartner)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] transition-colors"
                  >
                    {isAddingPartner ? "Close Form" : "+ Add Partner"}
                  </button>
                </div>

                {isAddingPartner && (
                  <form onSubmit={handleAddPartner} className="bg-white p-6 rounded-3xl border border-forest/20 shadow-md space-y-4">
                    <h4 className="font-heading font-bold text-sm text-[#0B3025]">Add New Partner</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Partner Organization Name *</label>
                        <input
                          type="text"
                          required
                          value={newPartner.name}
                          onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                          placeholder="e.g. Tata Power / UNICEF"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Program / Partnership Scope</label>
                        <input
                          type="text"
                          value={newPartner.role}
                          onChange={(e) => setNewPartner({ ...newPartner, role: e.target.value })}
                          placeholder="e.g. Anganwadi Education Support"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-charcoal/80 mb-1">Logo URL (Optional)</label>
                      <input
                        type="text"
                        value={newPartner.logo}
                        onChange={(e) => setNewPartner({ ...newPartner, logo: e.target.value })}
                        placeholder="/images/partner-icds.png"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingPartner(false)}
                        className="px-4 py-2 text-xs font-bold text-charcoal/70 hover:bg-gray-100 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-white bg-[#0B3025] hover:bg-[#174B38] rounded-full shadow-sm"
                      >
                        Save Partner to Website
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {partners.map((p) => (
                    <div key={p.id || p.name} className="bg-white p-5 rounded-2xl border border-forest/10 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2.5">
                          <div className="w-12 h-12 rounded-xl bg-white border border-forest/10 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.logo || "/images/partners/icds-gujarat.png"}
                              alt={p.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-heading font-bold text-sm text-[#0B3025] block truncate">{p.name}</span>
                            {p.category && (
                              <span className="text-[10px] font-bold text-forest bg-forest-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                                {p.category}
                              </span>
                            )}
                          </div>
                        </div>
                        {p.nameGu && <span className="font-gujarati text-xs text-charcoal/60 block mb-1">{p.nameGu}</span>}
                        <span className="text-xs text-charcoal/80 block mt-1 line-clamp-2 font-medium">{p.role}</span>
                        {p.description && (
                          <p className="text-[11px] text-charcoal/60 line-clamp-2 mt-1.5 pt-1.5 border-t border-gray-100">
                            {p.description}
                          </p>
                        )}
                      </div>
                      <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                          Active Partner
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeletePartner(p.id)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Annual & Project Reports Management */}
            {activeTab === "reports" && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-xs flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                      Annual Reports &amp; Project Documentation
                    </h3>
                    <p className="text-xs text-charcoal/60">
                      Upload and publish annual financial statements, statutory reports, and project impact assessments.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingReport(!isAddingReport)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] transition-colors"
                  >
                    {isAddingReport ? "Close Form" : "+ Add Report"}
                  </button>
                </div>

                {isAddingReport && (
                  <form onSubmit={handleAddReport} className="bg-white p-6 rounded-3xl border border-forest/20 shadow-md space-y-4">
                    <h4 className="font-heading font-bold text-sm text-[#0B3025]">Publish New Report</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Report Title (English) *</label>
                        <input
                          type="text"
                          required
                          value={newReport.title}
                          onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                          placeholder="e.g. Annual Activity Report 2024-25"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Title (Gujarati)</label>
                        <input
                          type="text"
                          value={newReport.titleGu}
                          onChange={(e) => setNewReport({ ...newReport, titleGu: e.target.value })}
                          placeholder="વાર્ષિક અહેવાલ ૨૦૨૪-૨૫"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none font-gujarati"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Report Category</label>
                        <select
                          value={newReport.category}
                          onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        >
                          <option value="Annual Report">Annual Report</option>
                          <option value="Project Report">Project Report</option>
                          <option value="Audit Report">Audit Report</option>
                          <option value="FC Accounts">FC Accounts (FCRA)</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">Year / Period</label>
                        <input
                          type="text"
                          value={newReport.year}
                          onChange={(e) => setNewReport({ ...newReport, year: e.target.value })}
                          placeholder="2024-2025"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">File / Download URL</label>
                        <input
                          type="text"
                          value={newReport.fileUrl}
                          onChange={(e) => setNewReport({ ...newReport, fileUrl: e.target.value })}
                          placeholder="/reports/swadeep-annual-report-2024-25.pdf"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-charcoal/80 mb-1">Description &amp; Highlights</label>
                      <textarea
                        rows={2}
                        value={newReport.description}
                        onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                        placeholder="Key achievements, audited balance sheet highlights, and donor contributions..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none resize-none"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingReport(false)}
                        className="px-4 py-2 text-xs font-bold text-charcoal/70 hover:bg-gray-100 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-white bg-[#0B3025] hover:bg-[#174B38] rounded-full shadow-sm"
                      >
                        Publish Report to Website
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reports.map((r) => (
                    <div key={r.id || r.title} className="bg-white p-5 rounded-2xl border border-forest/10 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest-50 text-forest border border-forest/15">
                            {r.category}
                          </span>
                          <span className="text-xs font-bold text-charcoal/60">{r.year}</span>
                        </div>
                        <h4 className="font-heading font-bold text-sm text-[#0B3025] mt-2">{r.title}</h4>
                        {r.titleGu && <span className="font-gujarati text-xs text-charcoal/60 block mt-0.5">{r.titleGu}</span>}
                        {r.description && <p className="text-xs text-charcoal/70 mt-2 line-clamp-2">{r.description}</p>}
                      </div>
                      <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                        {r.fileUrl ? (
                          <a
                            href={r.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-forest hover:text-saffron font-bold inline-flex items-center gap-1"
                          >
                            <span>Download / View PDF ↗</span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-forest font-medium">Contact for copy</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteReport(r.id)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Public Reviews Management */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-xs flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                      Public Reviews &amp; Feedback
                    </h3>
                    <p className="text-xs text-charcoal/60">
                      Reviews submitted by visitors and community supporters on the website.
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-forest-50 text-forest px-3 py-1 rounded-full border border-forest/15">
                    {reviews.length} Total Reviews
                  </span>
                </div>

                {reviews.length === 0 ? (
                  <div className="bg-white p-12 rounded-3xl text-center space-y-2 border border-forest/10">
                    <div className="font-heading font-bold text-base text-[#0B3025]">No reviews found.</div>
                    <p className="text-xs text-charcoal/60">
                      When visitors submit reviews from the Testimonials section, they will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.map((rev: any, idx: number) => (
                      <div key={rev.id || idx} className="bg-white p-5 rounded-2xl border border-forest/10 shadow-xs space-y-3 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              {rev.image ? (
                                <img
                                  src={rev.image}
                                  alt={rev.name}
                                  className="w-10 h-10 rounded-full object-cover border border-[#F47B2A]/30 shrink-0"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = "none";
                                  }}
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-[#0B3025] text-white font-bold text-xs flex items-center justify-center shrink-0 border border-[#F47B2A]/30">
                                  {rev.name ? rev.name.charAt(0).toUpperCase() : "R"}
                                </div>
                              )}
                              <div>
                                <span className="font-heading font-bold text-sm text-[#0B3025] block">{rev.name}</span>
                                <span className="text-xs text-charcoal/60 block">{rev.role || "Community Supporter"}</span>
                                {rev.email && (
                                  <a href={`mailto:${rev.email}`} className="text-[11px] text-[#F47B2A] hover:underline block mt-0.5 font-medium">
                                    {rev.email}
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center text-amber-400 text-xs shrink-0">
                              {"★".repeat(rev.rating || 5)}
                              {"☆".repeat(5 - (rev.rating || 5))}
                            </div>
                          </div>

                          <p className="text-xs text-charcoal/80 leading-relaxed italic bg-cream/40 p-3 rounded-xl border border-cream-dark/60">
                            &ldquo;{rev.quote}&rdquo;
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-gray-100">
                          <div className="flex items-center justify-between text-[11px] text-charcoal/50">
                            <span className="px-2 py-0.5 rounded-full bg-forest-50 text-forest font-semibold">
                              {rev.category || "Community Review"}
                            </span>
                            <span>{rev.created_at ? new Date(rev.created_at).toLocaleDateString("en-IN") : "Recent"}</span>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Notified to swadeepsvs@gmail.com
                            </span>

                            {rev.id && (
                              <button
                                type="button"
                                onClick={() => handleDeleteReview(rev.id)}
                                className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline px-1 py-0.5"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: Verified Metrics */}
            {activeTab === "metrics" && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-xs space-y-2">
                  <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                    Verified Grassroots Impact Metrics
                  </h3>
                  <p className="text-xs text-charcoal/60">
                    These key figures power the achievements counter on the homepage and impact page.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {metrics.map((m) => {
                    const key = m.key || m.metric_key || "";
                    const val = m.value || m.metric_value || "";
                    const isEditing = editingMetricKey === key;

                    return (
                      <div key={key} className="bg-white p-5 rounded-2xl border border-forest/10 shadow-xs space-y-3">
                        <div className="text-xs font-bold text-charcoal/60 uppercase">{m.label_en}</div>
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={metricEditValue}
                              onChange={(e) => setMetricEditValue(e.target.value)}
                              className="w-full px-3 py-1.5 text-base font-black rounded-xl border border-forest/30 focus:outline-none"
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                disabled={isUpdatingMetric}
                                onClick={() => handleSaveMetric(key)}
                                className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#0B3025]"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingMetricKey(null)}
                                className="px-3 py-1 rounded-full text-xs font-bold text-charcoal/60 bg-gray-100"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-black text-2xl text-[#0B3025]">{val}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingMetricKey(key);
                                setMetricEditValue(val);
                              }}
                              className="text-xs font-bold text-forest hover:underline"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: System Status & Diagnostic Details */}
            {activeTab === "system" && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-xs space-y-2">
                  <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                    System Architecture &amp; Database Health
                  </h3>
                  <p className="text-xs text-charcoal/60">
                    Diagnostics for local PostgreSQL database and Express REST API backend.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-cream/60 border border-forest/15 space-y-3">
                    <span className="text-xs font-bold uppercase text-[#0B3025]">
                      PostgreSQL Connection
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${isDbConnected ? "bg-green-500" : "bg-amber-500 animate-pulse"}`} />
                      <span className="text-sm font-bold text-[#0B3025]">
                        {isDbConnected ? "Connected to PostgreSQL" : "Local In-Memory / File Fallback Active"}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      {isDbConnected
                        ? "PostgreSQL connection pool is operational."
                        : "Application is running using resilient persistent storage in data/."}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-cream/60 border border-forest/15 space-y-3">
                    <span className="text-xs font-bold uppercase text-[#0B3025]">
                      Local Commands
                    </span>
                    <ul className="text-xs space-y-1.5 font-mono text-charcoal/80">
                      <li><span className="text-[#174B38] font-bold">Start Next.js:</span> npm run dev</li>
                      <li><span className="text-[#174B38] font-bold">Start Express:</span> npm run dev:server</li>
                      <li><span className="text-[#174B38] font-bold">Run Tests:</span> npm test</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
