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

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"inquiries" | "metrics" | "system">("inquiries");

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

  // Metrics state
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [editingMetricKey, setEditingMetricKey] = useState<string | null>(null);
  const [metricEditValue, setMetricEditValue] = useState("");
  const [isUpdatingMetric, setIsUpdatingMetric] = useState(false);

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

  // Fetch inquiries & metrics when authenticated
  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      setIsLoadingInquiries(true);
      try {
        const [inqRes, metRes] = await Promise.all([
          fetch("/api/admin/inquiries", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/admin/metrics"),
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
      } catch (err) {
        console.error("Failed to load admin data", err);
      } finally {
        setIsLoadingInquiries(false);
      }
    };

    loadData();
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || "Invalid username or password.");
        return;
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("swadeep_admin_token", data.token);
      localStorage.setItem("swadeep_admin_user", JSON.stringify(data.user));
    } catch {
      setLoginError("Failed to connect to authentication server.");
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

  const updateInquiryStatus = async (id: number, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus, is_read: true }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus, is_read: true } : item
          )
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus, is_read: true });
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleSaveMetric = async (key: string) => {
    if (!token || !metricEditValue.trim()) return;
    setIsUpdatingMetric(true);
    try {
      const res = await fetch("/api/admin/metrics", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ metric_key: key, metric_value: metricEditValue.trim() }),
      });

      if (res.ok) {
        setMetrics((prev) =>
          prev.map((m) => {
            const mKey = m.metric_key || m.key;
            if (mKey === key) {
              return { ...m, metric_value: metricEditValue, value: metricEditValue };
            }
            return m;
          })
        );
        setEditingMetricKey(null);
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

    const matchesStatus =
      statusFilter === "all" ? true : inq.status === statusFilter;

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
                Internal Administration
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

        {/* Unauthenticated View: Secure Login Card */}
        {!token ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-forest/15 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#0B3025] text-white mx-auto flex items-center justify-center">
                <ShieldCheckIcon size={24} />
              </div>
              <h2 className="font-heading text-xl font-bold text-[#0B3025]">
                Staff & Trustee Login
              </h2>
              <p className="font-body text-xs sm:text-sm text-charcoal/70">
                Sign in to manage contact submissions, verify impact metrics, and review system logs.
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
                  placeholder="admin"
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
                <span className="font-bold">Local Dev Notice:</span> Use default credentials{" "}
                <code className="bg-amber-100 px-1 rounded font-mono">admin</code> /{" "}
                <code className="bg-amber-100 px-1 rounded font-mono">Swadeep@Admin2026!</code>.
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
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === "inquiries"
                    ? "bg-[#0B3025] text-white shadow-sm"
                    : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Inquiries &amp; Messages ({inquiries.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("metrics")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === "metrics"
                    ? "bg-[#0B3025] text-white shadow-sm"
                    : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Verified Impact Metrics ({metrics.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("system")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === "system"
                    ? "bg-[#0B3025] text-white shadow-sm"
                    : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Database &amp; Architecture
              </button>
            </div>

            {/* TAB 1: Inquiries Manager */}
            {activeTab === "inquiries" && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
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

                {/* Inquiries Table / Cards */}
                {isLoadingInquiries ? (
                  <div className="bg-white p-12 rounded-3xl text-center text-xs text-charcoal/60">
                    Loading inquiries...
                  </div>
                ) : filteredInquiries.length === 0 ? (
                  <div className="bg-white p-12 rounded-3xl text-center space-y-2 border border-forest/10">
                    <div className="font-heading font-bold text-base text-[#0B3025]">
                      No inquiries match your filter.
                    </div>
                    <p className="text-xs text-charcoal/60">
                      Submissions from the Contact Form will automatically appear here.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* List Column */}
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
                          <div className="text-[11px] text-charcoal/40 mt-2">
                            {new Date(inq.created_at).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Details Column */}
                    <div className="lg:col-span-6">
                      {selectedInquiry ? (
                        <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-sm space-y-4 sticky top-28">
                          <div className="border-b border-forest/10 pb-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                                {selectedInquiry.name}
                              </h3>
                              <span className="text-xs text-charcoal/50">
                                ID #{selectedInquiry.id}
                              </span>
                            </div>
                            <div className="text-xs text-charcoal/70 mt-1">
                              <span>Email: </span>
                              <a
                                href={`mailto:${selectedInquiry.email}`}
                                className="font-semibold text-[#174B38] hover:underline"
                              >
                                {selectedInquiry.email}
                              </a>
                              {selectedInquiry.phone && (
                                <span className="ml-3">
                                  <span>Phone: </span>
                                  <a
                                    href={`tel:${selectedInquiry.phone}`}
                                    className="font-semibold text-[#174B38] hover:underline"
                                  >
                                    {selectedInquiry.phone}
                                  </a>
                                </span>
                              )}
                            </div>
                          </div>

                          <div>
                            <span className="text-xs font-bold text-charcoal/50 uppercase">
                              Subject:
                            </span>
                            <div className="text-sm font-bold text-[#0B3025] mt-0.5">
                              {selectedInquiry.subject}
                            </div>
                          </div>

                          <div>
                            <span className="text-xs font-bold text-charcoal/50 uppercase">
                              Message Content:
                            </span>
                            <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed bg-cream/40 p-4 rounded-2xl border border-forest/10 mt-1 whitespace-pre-wrap">
                              {selectedInquiry.message}
                            </p>
                          </div>

                          {/* Quick Actions */}
                          <div className="pt-2 border-t border-forest/10 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => updateInquiryStatus(selectedInquiry.id, "reviewed")}
                              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
                            >
                              Mark Reviewed
                            </button>
                            <button
                              type="button"
                              onClick={() => updateInquiryStatus(selectedInquiry.id, "replied")}
                              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-green-50 hover:bg-green-100 text-green-900 border border-green-200 transition-colors"
                            >
                              Mark Replied
                            </button>
                            <button
                              type="button"
                              onClick={() => updateInquiryStatus(selectedInquiry.id, "archived")}
                              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors"
                            >
                              Archive
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white p-12 rounded-3xl border border-forest/10 text-center text-xs text-charcoal/60">
                          Select an inquiry on the left to read full details and update status.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Metrics Manager */}
            {activeTab === "metrics" && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-forest/10 shadow-sm space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#0B3025]">
                    Verified Organizational Statistics
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-charcoal/70 mt-1">
                    These verified figures power the homepage impact counters and thematic program displays.
                  </p>
                </div>

                <div className="divide-y divide-forest/10">
                  {metrics.map((m) => {
                    const mKey = m.metric_key || m.key || "";
                    const mVal = m.metric_value || m.value || "";
                    const isEditing = editingMetricKey === mKey;

                    return (
                      <div
                        key={mKey}
                        className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="font-bold text-sm text-[#0B3025]">{m.label_en}</div>
                          {m.label_gu && (
                            <div className="font-gujarati text-xs text-charcoal/60">{m.label_gu}</div>
                          )}
                          {m.subtext_en && (
                            <div className="text-[11px] text-charcoal/50 mt-0.5">{m.subtext_en}</div>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          {isEditing ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={metricEditValue}
                                onChange={(e) => setMetricEditValue(e.target.value)}
                                className="px-3 py-1.5 rounded-xl border border-forest/20 text-xs font-bold w-28 focus:outline-none"
                              />
                              <button
                                type="button"
                                disabled={isUpdatingMetric}
                                onClick={() => handleSaveMetric(mKey)}
                                className="px-3 py-1.5 rounded-xl bg-[#174B38] text-white text-xs font-bold"
                              >
                                {isUpdatingMetric ? "Saving..." : "Save"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingMetricKey(null)}
                                className="px-2.5 py-1.5 rounded-xl bg-gray-100 text-charcoal text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-3">
                              <span className="text-base font-black text-[#F47B2A]">{mVal}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingMetricKey(mKey);
                                  setMetricEditValue(mVal);
                                }}
                                className="px-3 py-1 rounded-full text-xs font-semibold bg-forest-50 hover:bg-forest-100 text-[#174B38] transition-colors"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: System & Architecture Diagnostics */}
            {activeTab === "system" && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-forest/10 shadow-sm space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#0B3025]">
                    System Architecture &amp; Database
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-charcoal/70 mt-1">
                    Diagnostics for local PostgreSQL database and Express REST API backend.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Database Status Card */}
                  <div className="p-5 rounded-2xl bg-cream/60 border border-forest/15 space-y-3">
                    <span className="text-xs font-bold uppercase text-[#0B3025]">
                      PostgreSQL Connection
                    </span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isDbConnected ? "bg-green-500" : "bg-amber-500 animate-pulse"
                        }`}
                      />
                      <span className="text-sm font-bold text-[#0B3025]">
                        {isDbConnected ? "Connected to PostgreSQL" : "Local In-Memory Fallback Active"}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      {isDbConnected
                        ? "PostgreSQL connection pool is operational. Parameterized SQL queries are actively executing."
                        : "PostgreSQL service is currently offline on localhost:5432. The application is running seamlessly using resilient fallback data without crashing."}
                    </p>
                  </div>

                  {/* Local Setup Commands */}
                  <div className="p-5 rounded-2xl bg-cream/60 border border-forest/15 space-y-3">
                    <span className="text-xs font-bold uppercase text-[#0B3025]">
                      Local Commands
                    </span>
                    <ul className="text-xs space-y-1.5 font-mono text-charcoal/80">
                      <li>
                        <span className="text-[#174B38] font-bold">Start Next.js:</span> npm run dev
                      </li>
                      <li>
                        <span className="text-[#174B38] font-bold">Start Express:</span> npm run dev:server
                      </li>
                      <li>
                        <span className="text-[#174B38] font-bold">Run Migrations:</span> npm run db:migrate
                      </li>
                      <li>
                        <span className="text-[#174B38] font-bold">Seed Database:</span> npm run db:seed
                      </li>
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
