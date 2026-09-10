import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  User,
  Factory,
  Lock,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Key,
  Eye,
  EyeOff,
  Building2,
  Recycle,
  HelpCircle,
  ArrowLeft,
  Scale
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function LoginPage() {
  const { login, navigateTo, addToast, user, recyclerUser, pageParams } = useApp();

  // Role selected in login panel: "generator" | "recycler"
  const [authRole, setAuthRole] = useState(() => pageParams?.initialRole || "generator");
  const [authMethod, setAuthMethod] = useState("otp"); // otp | password
  const [phoneNumber, setPhoneNumber] = useState(
    authRole === "generator" ? "9810244921" : "9811872091"
  );
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("4829");
  const [email, setEmail] = useState(
    authRole === "generator"
      ? "aarav.sharma@noida-resident.in"
      : "compliance@ecovidyut-recyclers.in"
  );
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync if pageParams changes
  useEffect(() => {
    if (pageParams?.initialRole) {
      setAuthRole(pageParams.initialRole);
      if (pageParams.initialRole === "recycler") {
        setEmail("compliance@ecovidyut-recyclers.in");
        setPhoneNumber("9811872091");
      } else {
        setEmail("aarav.sharma@noida-resident.in");
        setPhoneNumber("9810244921");
      }
    }
  }, [pageParams]);

  const handleSelectRole = (role) => {
    setAuthRole(role);
    setOtpSent(false);
    setOtpCode("");
    if (role === "recycler") {
      setEmail("compliance@ecovidyut-recyclers.in");
      setPhoneNumber("9811872091");
    } else {
      setEmail("aarav.sharma@noida-resident.in");
      setPhoneNumber("9810244921");
    }
  };

  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      addToast({
        type: "error",
        title: "Invalid Mobile",
        message: "Please enter a valid 10-digit mobile number."
      });
      return;
    }

    const testCode = `${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOtp(testCode);
    setOtpSent(true);
    setOtpCode(testCode); // Auto-filled for smooth testing

    addToast({
      type: "info",
      title: "OTP Dispatched",
      message: `Verification code sent to +91 ${phoneNumber}. (Test Code: ${testCode})`
    });
  };

  const handleVerifyAndLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      login(authRole);
    }, 500);
  };

  const handleDemoLogin = (role) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(role);
    }, 400);
  };

  return (
    <div id="login-page" className="max-w-xl mx-auto py-6 sm:py-10 animate-fade-in">
      {/* Back to Public Portal Button */}
      <div className="mb-4">
        <button
          onClick={() => navigateTo("landing")}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#5C6A64] hover:text-[#083833] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Landing Page</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#083833]/15 p-6 sm:p-10 shadow-lg space-y-6">
        {/* Brand & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#083833] text-[#10B981] shadow-xs mb-1">
            <Recycle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16201B] tracking-tight font-display">
            Sign In to SAKSHI
          </h1>
          <p className="iso-measure mx-auto text-xs sm:text-sm text-[#5C6A64]">
            Honest Impact & Circularity Ledger • Welcoming Residents & Recyclers across NCR
          </p>
        </div>

        {/* Role Selection Panel (Prominent, explicitly configured per user request) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#788880]">
              Step 1: Select Your Portal Role
            </label>
            <span className="text-[11px] text-[#083833] font-semibold">
              Active: {authRole === "generator" ? "Waste Generator" : "Certified Recycler"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Generator Role Card */}
            <button
              type="button"
              id="role-select-generator"
              onClick={() => handleSelectRole("generator")}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                authRole === "generator"
                  ? "border-[#083833] bg-[#E6F4F1] ring-2 ring-[#083833]/20 shadow-xs"
                  : "border-[#D7E3DC] bg-[#FAF9F5] hover:border-[#83c5be] text-[#5C6A64]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    authRole === "generator"
                      ? "bg-[#083833] text-white"
                      : "bg-white text-[#5C6A64] border border-[#D7E3DC]"
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                {authRole === "generator" && (
                  <CheckCircle2 className="w-4 h-4 text-[#083833]" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-[#1E2522] block">
                  Waste Generator
                </span>
                <span className="text-[10px] text-[#5C6A64] block leading-snug mt-0.5">
                  Resident, RWA Society, Tech Parks
                </span>
              </div>
            </button>

            {/* Recycler Role Card */}
            <button
              type="button"
              id="role-select-recycler"
              onClick={() => handleSelectRole("recycler")}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                authRole === "recycler"
                  ? "border-[#D96B27] bg-[#FDF1E8] ring-2 ring-[#D96B27]/20 shadow-xs"
                  : "border-[#D7E3DC] bg-[#FAF9F5] hover:border-[#D96B27] text-[#5C6A64]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    authRole === "recycler"
                      ? "bg-[#D96B27] text-white"
                      : "bg-white text-[#5C6A64] border border-[#D7E3DC]"
                  }`}
                >
                  <Factory className="w-4 h-4" />
                </div>
                {authRole === "recycler" && (
                  <CheckCircle2 className="w-4 h-4 text-[#D96B27]" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-[#1E2522] block">
                  Certified Recycler
                </span>
                <span className="text-[10px] text-[#5C6A64] block leading-snug mt-0.5">
                  CPCB/SPCB Licensed Facilities
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Role Context Helper Banner */}
        <div
          className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
            authRole === "generator"
              ? "bg-[#E6F4F1] border-[#83c5be]/60 text-[#083833]"
              : "bg-[#FDF1E8] border-[#D96B27]/30 text-[#8C3F10]"
          }`}
        >
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs leading-relaxed">
            {authRole === "generator" ? (
              <span>
                <strong>Generator Workspace:</strong> Doorstep pickup scheduling with EV fleets, live route OTP verification, and verifiable Circularity Credits.
              </span>
            ) : (
              <span>
                <strong>Recycler Operations Hub:</strong> Real-time tare/gross weighbridge proof submission, CPCB/UPPCB compliant ledger stamping, and fleet dispatch.
              </span>
            )}
          </p>
        </div>

        {/* Auth Method Switcher */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-[#788880] block mb-2">
            Step 2: Authenticate Credentials
          </label>
          <div className="flex items-center justify-center gap-6 text-xs font-semibold border-b border-[#EAEFEA] pb-2">
            <button
              type="button"
              onClick={() => setAuthMethod("otp")}
              className={`pb-1 border-b-2 transition-all ${
                authMethod === "otp"
                  ? "border-[#083833] text-[#083833] font-bold"
                  : "border-transparent text-[#788880] hover:text-[#1E2522]"
              }`}
            >
              Mobile OTP Verification
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod("password")}
              className={`pb-1 border-b-2 transition-all ${
                authMethod === "password"
                  ? "border-[#083833] text-[#083833] font-bold"
                  : "border-transparent text-[#788880] hover:text-[#1E2522]"
              }`}
            >
              Password / License ID
            </button>
          </div>
        </div>

        {/* Primary Form */}
        <form onSubmit={handleVerifyAndLogin} className="space-y-4">
          {authMethod === "otp" ? (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E2522] block">
                  Registered Mobile Number (+91)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#5C6A64]">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="98102 44921"
                      className="w-full pl-12 pr-4 py-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs sm:text-sm font-mono text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="px-4 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] hover:bg-[#b8f2e6]/30 text-xs font-bold text-[#083833] transition-colors shrink-0"
                  >
                    {otpSent ? "Resend OTP" : "Get OTP"}
                  </button>
                </div>
              </div>

              {otpSent && (
                <div className="space-y-1.5 animate-fade-in">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-[#1E2522]">
                      Enter 4-Digit Verification Code
                    </label>
                    <span className="text-[11px] text-[#083833] font-mono">
                      (Test Code: {generatedOtp})
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full text-center tracking-widest text-lg font-mono font-black py-2.5 bg-[#FAF9F5] border border-[#83c5be] rounded-xl text-[#083833] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E2522] block">
                  {authRole === "generator" ? "Email Address" : "SPCB License or Facility Email"}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#788880]" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-[#1E2522]">Password</label>
                  <button
                    type="button"
                    onClick={() =>
                      addToast({
                        type: "info",
                        title: "Password Reset",
                        message: "Password recovery link dispatched to registered contact."
                      })
                    }
                    className="text-[11px] text-[#083833] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#788880]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#788880] hover:text-[#1E2522]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all ${
              authRole === "generator"
                ? "bg-[#083833] hover:bg-[#062925]"
                : "bg-[#D96B27] hover:bg-[#C45E1E]"
            }`}
          >
            {isLoading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In as {authRole === "generator" ? "Waste Generator" : "Certified Recycler"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick One-Click Demo Logins */}
        <div className="pt-4 border-t border-[#EAEFEA] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#788880]">
              Instant One-Click Verified Accounts
            </span>
            <span className="text-[10px] text-[#083833] font-semibold">
              Live Sandbox
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              id="demo-login-generator"
              onClick={() => handleDemoLogin("generator")}
              className="p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] hover:bg-[#E6F4F1] text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E2522] group-hover:text-[#083833]">
                  Aarav Sharma
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#b8f2e6] text-[#083833] font-bold">
                  Generator
                </span>
              </div>
              <p className="text-[11px] text-[#5C6A64] mt-0.5">
                Cleo County, Sector 120 Noida
              </p>
            </button>

            <button
              type="button"
              id="demo-login-recycler"
              onClick={() => handleDemoLogin("recycler")}
              className="p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#D96B27] hover:bg-[#FDF1E8] text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E2522] group-hover:text-[#D96B27]">
                  EcoVidyut Hub
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FDF1E8] text-[#D96B27] font-bold border border-[#D96B27]/30">
                  Recycler
                </span>
              </div>
              <p className="text-[11px] text-[#5C6A64] mt-0.5">
                UPPCB Lic. (Sec 63 Noida)
              </p>
            </button>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="pt-2 text-center text-xs text-[#5C6A64] space-y-2">
          <p className="text-[11px]">
            New facility?{" "}
            <button
              onClick={() => navigateTo("certified_recyclers")}
              className="text-[#083833] font-bold underline"
            >
              Apply for SAKSHI Certification
            </button>
          </p>
          <div className="flex items-center justify-center gap-3 text-[10px] text-[#788880]">
            <span>256-Bit SHA Encrypted</span>
            <span>•</span>
            <span>UPPCB & CPCB Rule 16 Audited</span>
            <span>•</span>
            <span>Zero Data Resale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
