"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  UsersGroupIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  BuildingIcon,
  MapPinIcon,
  PhoneCallIcon,
  MailIcon,
  ReceiptTextIcon,
  CalendarIcon,
} from "@/components/ui/Icons";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  phone?: string;
  email?: string;
  bio?: string;
  image?: string;
}

interface FieldLog {
  id: string;
  staffName: string;
  village: string;
  date: string;
  activityType: string;
  beneficiaries: number;
  notes?: string;
}

type EmployeeTab = "roster" | "logs" | "notices" | "resources";

export default function EmployeesPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string; role: string; name?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<EmployeeTab>("roster");

  // Login form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Staff list state
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    department: "Field Operations",
    phone: "",
    email: "",
    bio: "",
    image: "",
  });

  // Field logs state
  const [logs, setLogs] = useState<FieldLog[]>([]);
  const [isAddingLog, setIsAddingLog] = useState(false);
  const [newLog, setNewLog] = useState({
    staffName: "",
    village: "",
    date: new Date().toISOString().split("T")[0],
    activityType: "Anganwadi Early Education Inspection",
    beneficiaries: 25,
    notes: "",
  });

  // Action feedback message
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showFeedback = (type: "success" | "error", text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Check saved session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("swadeep_employee_token");
    const savedUser = localStorage.getItem("swadeep_employee_user");
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        if (parsedUser.name) {
          setNewLog((prev) => ({ ...prev, staffName: parsedUser.name }));
        }
      } catch {
        localStorage.removeItem("swadeep_employee_token");
        localStorage.removeItem("swadeep_employee_user");
      }
    }
  }, []);

  // Fetch employees and field logs when logged in
  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      setIsLoadingEmployees(true);
      try {
        const [empRes, logsRes] = await Promise.all([
          fetch("/api/employees"),
          fetch("/api/field-logs"),
        ]);

        if (empRes.ok) {
          const empData = await empRes.json();
          setEmployees(empData.employees || []);
        }
        if (logsRes.ok) {
          const logsData = await logsRes.json();
          setLogs(logsData.logs || []);
        }
      } catch (err) {
        console.error("Failed to load employee portal data:", err);
      } finally {
        setIsLoadingEmployees(false);
      }
    };

    loadData();
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/auth/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setLoginError(data.error || "Authentication failed. Check credentials.");
        setIsLoggingIn(false);
        return;
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("swadeep_employee_token", data.token);
      localStorage.setItem("swadeep_employee_user", JSON.stringify(data.user));
    } catch {
      setLoginError("Could not reach authentication server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("swadeep_employee_token");
    localStorage.removeItem("swadeep_employee_user");
  };

  // Add Employee Handler
  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEmployees((prev) => [...prev, data.employee]);
        setIsAddingEmployee(false);
        setNewEmployee({
          name: "",
          role: "",
          department: "Field Operations",
          phone: "",
          email: "",
          bio: "",
          image: "",
        });
        showFeedback("success", "Employee / Staff member added successfully to website!");
      } else {
        showFeedback("error", data.error || "Failed to add employee.");
      }
    } catch {
      showFeedback("error", "Network error while saving employee.");
    }
  };

  // Delete Employee Handler
  const handleDeleteEmployee = async (id: string) => {
    if (!confirm("Are you sure you want to remove this employee record?")) return;
    try {
      const res = await fetch(`/api/employees?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEmployees((prev) => prev.filter((e) => e.id !== id));
        showFeedback("success", "Employee removed.");
      }
    } catch {
      showFeedback("error", "Failed to remove employee.");
    }
  };

  // Add Field Log Handler
  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/field-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLog),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLogs((prev) => [data.log, ...prev]);
        setIsAddingLog(false);
        setNewLog({
          staffName: user?.name || "Swadeep Staff",
          village: "",
          date: new Date().toISOString().split("T")[0],
          activityType: "Anganwadi Early Education Inspection",
          beneficiaries: 25,
          notes: "",
        });
        showFeedback("success", "Daily field work log saved successfully!");
      } else {
        showFeedback("error", data.error || "Failed to save field log.");
      }
    } catch {
      showFeedback("error", "Network error while saving field log.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-charcoal pt-24 pb-16">
      {/* Top Breadcrumb / Title Bar */}
      <div className="bg-[#0B3025] text-cream border-b border-forest-light/20 py-8 px-4 sm:px-6">
        <div className="container-wide max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-saffron tracking-wider uppercase mb-2">
              <ShieldCheckIcon size={14} />
              <span>Internal Staff Portal</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Swadeep Employees &amp; Field Staff
            </h1>
            <p className="font-body text-xs sm:text-sm text-cream/80 mt-1">
              Field operations management, staff directory, daily reporting, and organizational resources.
            </p>
          </div>

          {token && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white">
                  {user?.name || "Swadeep Staff"} ({user?.username})
                </div>
                <div className="text-[11px] text-saffron font-semibold">Active Session</div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-xs font-bold rounded-full bg-white/15 hover:bg-rose-600 text-white transition-all border border-white/20"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container-wide max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* Floating feedback alert */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-semibold transition-all ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-rose-50 text-rose-900 border border-rose-200"
            }`}
          >
            <div className="flex items-center space-x-2">
              <CheckCircleIcon size={16} />
              <span>{feedback.text}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-xs underline hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}

        {!token ? (
          /* Unauthenticated Employee Login View */
          <div className="max-w-md mx-auto my-12 bg-white p-6 sm:p-8 rounded-3xl border border-forest/10 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0B3025] text-cream flex items-center justify-center shadow-md">
                <UsersGroupIcon size={28} />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0B3025]">
                Employee Portal Login
              </h2>
              <p className="font-body text-xs sm:text-sm text-charcoal/70">
                Sign in with your authorized staff credentials to manage team records and field logs.
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
                  Employee ID / Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="swem"
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
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl bg-cream/40 border border-forest/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-[#0B3025] hover:bg-[#174B38] transition-all shadow-md disabled:opacity-50"
              >
                {isLoggingIn ? "Verifying Staff ID..." : "Sign In to Employee Portal"}
              </button>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <span className="font-bold">Staff Credentials:</span> Employee ID{" "}
                <code className="bg-amber-100 px-1 rounded font-mono font-bold">swem</code> / Password{" "}
                <code className="bg-amber-100 px-1 rounded font-mono font-bold">emp@05</code>.
              </div>
            </form>

            <div className="pt-2 text-center">
              <Link
                href="/"
                className="text-xs font-bold text-forest hover:text-[#F47B2A] transition-colors"
              >
                &larr; Return to Swadeep Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Authenticated Employee Portal View */
          <div className="space-y-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-forest/10 shadow-xs">
                <div className="text-[11px] font-bold text-charcoal/60 uppercase">Staff Active</div>
                <div className="text-xl sm:text-2xl font-black text-[#0B3025] mt-0.5">
                  {employees.length}
                </div>
                <div className="text-[11px] text-forest font-semibold mt-1">Field &amp; Office Roster</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-forest/10 shadow-xs">
                <div className="text-[11px] font-bold text-charcoal/60 uppercase">Field Logs</div>
                <div className="text-xl sm:text-2xl font-black text-[#0B3025] mt-0.5">
                  {logs.length}
                </div>
                <div className="text-[11px] text-forest font-semibold mt-1">Recorded Interventions</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-forest/10 shadow-xs">
                <div className="text-[11px] font-bold text-charcoal/60 uppercase">ICDS Centres</div>
                <div className="text-xl sm:text-2xl font-black text-[#0B3025] mt-0.5">
                  277+
                </div>
                <div className="text-[11px] text-forest font-semibold mt-1">Bhavnagar District</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-forest/10 shadow-xs">
                <div className="text-[11px] font-bold text-charcoal/60 uppercase">Coastal Villages</div>
                <div className="text-xl sm:text-2xl font-black text-[#0B3025] mt-0.5">
                  10
                </div>
                <div className="text-[11px] text-forest font-semibold mt-1">Sagarbandhu Coverage</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-forest/10 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab("roster")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "roster"
                    ? "bg-[#0B3025] text-white shadow-sm"
                    : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Staff &amp; Team Roster ({employees.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("logs")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "logs"
                    ? "bg-[#0B3025] text-white shadow-sm"
                    : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Daily Field Work Logs ({logs.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("notices")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "notices"
                    ? "bg-[#0B3025] text-white shadow-sm"
                    : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Internal Notices &amp; Schedules
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("resources")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "resources"
                    ? "bg-[#0B3025] text-white shadow-sm"
                    : "bg-white text-charcoal/80 hover:bg-forest-50"
                }`}
              >
                Field Resources &amp; Downloads
              </button>
            </div>

            {/* TAB: Staff Roster Management */}
            {activeTab === "roster" && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                      Staff &amp; Employees Directory
                    </h3>
                    <p className="text-xs text-charcoal/60">
                      Manage Swadeep’s operational staff, field coordinators, and technical team shown on the website.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingEmployee(!isAddingEmployee)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] transition-colors self-start sm:self-auto"
                  >
                    {isAddingEmployee ? "Close Form" : "+ Add New Employee"}
                  </button>
                </div>

                {/* Add Employee Form */}
                {isAddingEmployee && (
                  <form
                    onSubmit={handleAddEmployee}
                    className="bg-white p-6 rounded-3xl border border-forest/20 shadow-md space-y-4"
                  >
                    <h4 className="font-heading font-bold text-sm text-[#0B3025]">
                      Add New Staff Member to Website
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newEmployee.name}
                          onChange={(e) =>
                            setNewEmployee({ ...newEmployee, name: e.target.value })
                          }
                          placeholder="e.g. Dishaben"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Role / Designation *
                        </label>
                        <input
                          type="text"
                          required
                          value={newEmployee.role}
                          onChange={(e) =>
                            setNewEmployee({ ...newEmployee, role: e.target.value })
                          }
                          placeholder="e.g. Program Coordinator"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Department
                        </label>
                        <select
                          value={newEmployee.department}
                          onChange={(e) =>
                            setNewEmployee({ ...newEmployee, department: e.target.value })
                          }
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
                        >
                          <option value="Field Operations">Field Operations</option>
                          <option value="Anganwadi & Education">Anganwadi &amp; Education</option>
                          <option value="Health & Nutrition">Health &amp; Nutrition</option>
                          <option value="Coastal Livelihoods">Coastal Livelihoods</option>
                          <option value="Administration & Accounts">Administration &amp; Accounts</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          value={newEmployee.email}
                          onChange={(e) =>
                            setNewEmployee({ ...newEmployee, email: e.target.value })
                          }
                          placeholder="employee@swadeep.org"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Phone (Optional)
                        </label>
                        <input
                          type="text"
                          value={newEmployee.phone}
                          onChange={(e) =>
                            setNewEmployee({ ...newEmployee, phone: e.target.value })
                          }
                          placeholder="+91-942-830-9408"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Photo URL (Optional)
                        </label>
                        <input
                          type="text"
                          value={newEmployee.image}
                          onChange={(e) =>
                            setNewEmployee({ ...newEmployee, image: e.target.value })
                          }
                          placeholder="/images/team/member.jpg"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal/80 mb-1">
                        Bio &amp; Key Responsibilities
                      </label>
                      <textarea
                        rows={2}
                        value={newEmployee.bio}
                        onChange={(e) =>
                          setNewEmployee({ ...newEmployee, bio: e.target.value })
                        }
                        placeholder="Leading grassroots Anganwadi training sessions, monitoring learning outcomes, and coordinating field visits..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingEmployee(false)}
                        className="px-4 py-2 text-xs font-bold text-charcoal/70 hover:bg-gray-100 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-white bg-[#0B3025] hover:bg-[#174B38] rounded-full shadow-sm"
                      >
                        Save Employee Record
                      </button>
                    </div>
                  </form>
                )}

                {/* Employees Cards Grid */}
                {isLoadingEmployees ? (
                  <div className="bg-white p-8 rounded-3xl border border-forest/10 text-center text-xs text-charcoal/60">
                    Loading team roster...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {employees.map((emp) => (
                      <div
                        key={emp.id || emp.name}
                        className="bg-white p-5 rounded-2xl border border-forest/10 shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-forest text-cream flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden relative shadow-xs">
                              {emp.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={emp.image}
                                  alt={emp.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span>
                                  {emp.name
                                    .split(" ")
                                    .map((p) => p[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-heading font-bold text-sm text-[#0B3025] block truncate">
                                {emp.name}
                              </span>
                              <span className="text-xs font-semibold text-forest block truncate">
                                {emp.role}
                              </span>
                              <span className="text-[10px] text-charcoal/50 block uppercase tracking-wider">
                                {emp.department}
                              </span>
                            </div>
                          </div>

                          {emp.bio && (
                            <p className="text-xs text-charcoal/70 line-clamp-3 mt-3 pt-2 border-t border-gray-100">
                              {emp.bio}
                            </p>
                          )}

                          <div className="mt-3 space-y-1 text-[11px] text-charcoal/60">
                            {emp.phone && (
                              <div className="flex items-center gap-1.5">
                                <PhoneCallIcon size={12} className="text-forest" />
                                <span>{emp.phone}</span>
                              </div>
                            )}
                            {emp.email && (
                              <div className="flex items-center gap-1.5">
                                <MailIcon size={12} className="text-forest" />
                                <span className="truncate">{emp.email}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                            Active Staff
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteEmployee(emp.id)}
                            className="text-xs font-bold text-rose-600 hover:text-rose-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: Field Work Logs */}
            {activeTab === "logs" && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                      Daily Field Work &amp; Intervention Logs
                    </h3>
                    <p className="text-xs text-charcoal/60">
                      Record village community visits, Anganwadi inspections, and beneficiary counts.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingLog(!isAddingLog)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] transition-colors self-start sm:self-auto"
                  >
                    {isAddingLog ? "Close Form" : "+ Log Today's Work"}
                  </button>
                </div>

                {isAddingLog && (
                  <form
                    onSubmit={handleAddLog}
                    className="bg-white p-6 rounded-3xl border border-forest/20 shadow-md space-y-4"
                  >
                    <h4 className="font-heading font-bold text-sm text-[#0B3025]">
                      New Field Activity Entry
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Staff Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newLog.staffName}
                          onChange={(e) =>
                            setNewLog({ ...newLog, staffName: e.target.value })
                          }
                          placeholder="e.g. Dishaben"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Village / Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={newLog.village}
                          onChange={(e) =>
                            setNewLog({ ...newLog, village: e.target.value })
                          }
                          placeholder="e.g. Talaja, Sartampur, Alang"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={newLog.date}
                          onChange={(e) =>
                            setNewLog({ ...newLog, date: e.target.value })
                          }
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Activity Category *
                        </label>
                        <select
                          value={newLog.activityType}
                          onChange={(e) =>
                            setNewLog({ ...newLog, activityType: e.target.value })
                          }
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
                        >
                          <option value="Anganwadi Early Education Inspection">
                            Anganwadi Early Education Inspection
                          </option>
                          <option value="Nutrition Kit & Ration Distribution">
                            Nutrition Kit &amp; Ration Distribution
                          </option>
                          <option value="Fishermen Livelihood & Safety Camp">
                            Fishermen Livelihood &amp; Safety Camp
                          </option>
                          <option value="Community Health & Hygiene Session">
                            Community Health &amp; Hygiene Session
                          </option>
                          <option value="Solar Water & Sanitation Check">
                            Solar Water &amp; Sanitation Check
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal/80 mb-1">
                          Beneficiaries Count
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={newLog.beneficiaries}
                          onChange={(e) =>
                            setNewLog({ ...newLog, beneficiaries: Number(e.target.value) })
                          }
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal/80 mb-1">
                        Field Observations &amp; Notes
                      </label>
                      <textarea
                        rows={2}
                        value={newLog.notes}
                        onChange={(e) =>
                          setNewLog({ ...newLog, notes: e.target.value })
                        }
                        placeholder="Recorded center attendance, checked BaLA learning posters, identified repair needs..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingLog(false)}
                        className="px-4 py-2 text-xs font-bold text-charcoal/70 hover:bg-gray-100 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-white bg-[#0B3025] hover:bg-[#174B38] rounded-full shadow-sm"
                      >
                        Save Field Log
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {logs.length === 0 ? (
                    <div className="bg-white p-8 rounded-3xl border border-forest/10 text-center text-xs text-charcoal/50">
                      No field logs submitted yet. Click &ldquo;+ Log Today&apos;s Work&rdquo; to add one.
                    </div>
                  ) : (
                    logs.map((log) => (
                      <div
                        key={log.id}
                        className="bg-white p-5 rounded-2xl border border-forest/10 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-sm text-[#0B3025]">
                              {log.activityType}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest-50 text-forest border border-forest/15">
                              {log.beneficiaries} Beneficiaries
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal/60">
                            <span className="flex items-center gap-1">
                              <MapPinIcon size={12} className="text-saffron" />
                              {log.village}
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarIcon size={12} className="text-forest" />
                              {log.date}
                            </span>
                            <span className="font-semibold text-charcoal/80">
                              By {log.staffName}
                            </span>
                          </div>
                          {log.notes && (
                            <p className="text-xs text-charcoal/75 mt-1.5 leading-relaxed">
                              {log.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB: Internal Notices & Schedules */}
            {activeTab === "notices" && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-xs">
                  <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                    Internal Staff Notices &amp; Field Directives
                  </h3>
                  <p className="text-xs text-charcoal/60">
                    Important organizational announcements, meeting dates, and field protocols.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-amber-200 bg-amber-50/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        Priority Notice
                      </span>
                      <span className="text-xs text-charcoal/50">Next Saturday, 10:00 AM</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-[#0B3025]">
                      Monthly Field Operations Review Meeting
                    </h4>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      All cluster coordinators must attend the monthly review at Swadeep head office, Bhavnagar. Bring physical attendance sheets and Anganwadi tracking forms.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-forest/15 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-forest-50 text-forest">
                        Program Schedule
                      </span>
                      <span className="text-xs text-charcoal/50">November 10 - 18, 2026</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-[#0B3025]">
                      BaLA Anganwadi Learning Kit Verification
                    </h4>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      Inspection phase for 50 child-friendly Anganwadis in Talaja block. Check wall learning aids, story cards, and sanitization kits.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-forest/15 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-forest-50 text-forest">
                        Partnership Camp
                      </span>
                      <span className="text-xs text-charcoal/50">November 22, 2026</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-[#0B3025]">
                      Sagarbandhu Coastal Community Health Camp
                    </h4>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      Joint health camp with CGPL / Tata Power medical team at Alang coast. Mobilize registered fishing families for eye and general health checkups.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-forest/15 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-forest-50 text-forest">
                        HR &amp; Finance
                      </span>
                      <span className="text-xs text-charcoal/50">Due 28th of every month</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-[#0B3025]">
                      Field Travel &amp; Fuel Allowance Submission
                    </h4>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      Submit motorcycle fuel bills and field log sheets to the accounts department by the 28th to ensure timely reimbursement.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Field Resources & Downloads */}
            {activeTab === "resources" && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-xs">
                  <h3 className="font-heading font-bold text-lg text-[#0B3025]">
                    Field Resources, Forms &amp; Guidelines
                  </h3>
                  <p className="text-xs text-charcoal/60">
                    Official forms, project reports, and standard operating procedures for field coordinators.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-forest/10 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-3">
                        <ReceiptTextIcon size={20} />
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#0B3025]">
                        Anganwadi Child Tracking Register
                      </h4>
                      <p className="text-xs text-charcoal/60 mt-1">
                        Standard format for tracking preschool enrollment, height, weight, and attendance.
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <Link
                        href="/contact"
                        className="text-xs font-bold text-[#F47B2A] hover:underline"
                      >
                        Request Copy from Office &rarr;
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-forest/10 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-3">
                        <BuildingIcon size={20} />
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#0B3025]">
                        Published Annual Statutory Report
                      </h4>
                      <p className="text-xs text-charcoal/60 mt-1">
                        Audited financial statement, donor utilization, and trustee governance report.
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <Link
                        href="/resources#reports"
                        className="text-xs font-bold text-[#0B3025] hover:underline"
                      >
                        View in Reports Repository &rarr;
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-forest/10 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-3">
                        <ShieldCheckIcon size={20} />
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#0B3025]">
                        Child Protection &amp; Safety Policy
                      </h4>
                      <p className="text-xs text-charcoal/60 mt-1">
                        Mandatory code of conduct for all staff, volunteers, and partner field agents.
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <Link
                        href="/privacy"
                        className="text-xs font-bold text-forest hover:underline"
                      >
                        Read Guidelines &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
