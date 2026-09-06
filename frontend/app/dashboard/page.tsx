"use client";

import { useEffect, useState } from "react";
import LogsTable from "@/components/LogsTable";
import RiskChart from "@/components/RiskChart";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    console.log("Dashboard API URL:", apiUrl);

    if (!apiUrl) {
      setError("API URL is not configured");
      return;
    }

    async function loadDashboard() {
      try {
        const [statsResponse, logsResponse] = await Promise.all([
          fetch(`${apiUrl}/dashboard/stats`),
          fetch(`${apiUrl}/logs`),
        ]);

        if (!statsResponse.ok) {
          throw new Error(
            `Stats request failed: ${statsResponse.status}`
          );
        }

        if (!logsResponse.ok) {
          throw new Error(
            `Logs request failed: ${logsResponse.status}`
          );
        }

        const statsData = await statsResponse.json();
        const logsData = await logsResponse.json();

        setStats(statsData);
        setLogs(logsData);
        setError("");
        setLastUpdated(new Date());

        console.log("Dashboard updated:", statsData);
      } catch (err) {
        console.error("Dashboard refresh error:", err);
        setError("Backend connection failed");
      }
    }

    // Load immediately
    loadDashboard();

    // Refresh every 3 seconds
    const interval = setInterval(() => {
      loadDashboard();
    }, 3000);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, []);

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error && !stats) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
        <div className="bg-gray-900 border border-red-500/30 rounded-2xl p-8 max-w-lg w-full text-center">
          <div className="text-5xl mb-4">🚨</div>

          <h1 className="text-2xl font-bold text-red-400">
            Firewall Connection Error
          </h1>

          <p className="text-gray-400 mt-3">
            {error}
          </p>

          <p className="text-gray-500 text-sm mt-4">
            Make sure the FastAPI backend is running on port 8000.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (!stats) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-5 animate-pulse">
            🛡️
          </div>

          <p className="text-2xl font-semibold">
            Loading AI Firewall Dashboard...
          </p>

          <p className="text-gray-500 mt-2">
            Connecting to security engine
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // DASHBOARD
  // ============================================================

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-4">
                <span>🛡️</span>
                <span>Security Operations Center</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                AI Firewall Dashboard
              </h1>

              <p className="text-gray-400 mt-3 text-lg">
                Real-time monitoring of AI security events and threats.
              </p>

            </div>

            {/* LIVE STATUS */}

            <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl px-5 py-3">

              <div className="relative flex items-center justify-center">

                <div className="absolute w-3 h-3 bg-green-400 rounded-full animate-ping opacity-60"></div>

                <div className="relative w-3 h-3 bg-green-400 rounded-full"></div>

              </div>

              <div>

                <p className="text-green-400 font-bold text-sm">
                  LIVE
                </p>

                <p className="text-gray-500 text-xs">
                  Auto-refresh: 3s
                </p>

              </div>

            </div>

          </div>

          {/* LAST UPDATED */}

          {lastUpdated && (
            <p className="text-gray-600 text-xs mt-4">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}

          {/* BACKEND WARNING */}

          {error && (
            <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-xl px-4 py-3 text-sm">
              ⚠️ Temporary backend connection issue. Retrying automatically...
            </div>
          )}

        </div>


        {/* ====================================================
            PRIMARY STAT CARDS
        ==================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Card
            title="Total Requests"
            value={stats.total_requests}
            icon="📥"
          />

          <Card
            title="Blocked Attacks"
            value={stats.blocked_requests}
            icon="🚨"
          />

          <Card
            title="Masked Prompts"
            value={stats.masked_requests}
            icon="🛡️"
          />

          <Card
            title="Average Risk"
            value={`${Number(
              stats.average_risk_score
            ).toFixed(1)}%`}
            icon="⚠️"
          />

        </div>


        {/* ====================================================
            SECONDARY STAT CARDS
        ==================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

          <MiniCard
            title="Allowed"
            value={stats.allowed_requests}
            icon="✅"
          />

          <MiniCard
            title="PII Detected"
            value={stats.pii_detected}
            icon="🔐"
          />

          <MiniCard
            title="Injection Attacks"
            value={stats.injection_attacks}
            icon="⚡"
          />

          <MiniCard
            title="Jailbreak Attacks"
            value={stats.jailbreak_attacks}
            icon="🔥"
          />

        </div>


        {/* ====================================================
            CHART + FIREWALL STATUS
        ==================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

          {/* ==================================================
              THREAT DISTRIBUTION
          ================================================== */}

          <RiskChart logs={logs} />


          {/* ==================================================
              FIREWALL STATUS
          ================================================== */}

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            {/* TITLE */}

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold">
                  Live Security Status
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Firewall protection status
                </p>

              </div>

              <div className="text-2xl">
                🛡️
              </div>

            </div>


            {/* STATUS PANEL */}

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">

              {/* ACTIVE STATUS */}

              <div className="flex items-center gap-3">

                <div className="relative flex items-center justify-center">

                  <div className="absolute w-4 h-4 bg-green-400 rounded-full animate-ping opacity-40"></div>

                  <div className="relative w-3 h-3 bg-green-400 rounded-full"></div>

                </div>

                <span className="text-green-400 text-lg font-bold">
                  FIREWALL ACTIVE
                </span>

              </div>


              {/* DESCRIPTION */}

              <p className="text-gray-400 mt-4 leading-relaxed">
                Monitoring AI prompts for sensitive information,
                malicious instructions, prompt injection and
                jailbreak attempts.
              </p>


              {/* PROTECTION CARDS */}

              <div className="mt-6 grid grid-cols-2 gap-4">

                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">

                  <p className="text-gray-500 text-sm">
                    Protection
                  </p>

                  <p className="text-green-400 font-bold mt-1">
                    ACTIVE
                  </p>

                </div>


                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">

                  <p className="text-gray-500 text-sm">
                    Monitoring
                  </p>

                  <p className="text-blue-400 font-bold mt-1">
                    REAL-TIME
                  </p>

                </div>

              </div>


              {/* DETECTION MODULES */}

              <div className="mt-6">

                <p className="text-gray-500 text-sm mb-3">
                  Active Detection Modules
                </p>

                <div className="flex flex-wrap gap-3">

                  <Badge text="EMAIL" />

                  <Badge text="PHONE" />

                  <Badge text="CREDIT CARD" />

                  <Badge text="AADHAAR" />

                  <Badge text="PAN" />

                  <Badge text="PROMPT INJECTION" />

                  <Badge text="JAILBREAK" />

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ====================================================
            SECURITY LOGS
        ==================================================== */}

        <div className="mt-10">

          <LogsTable logs={logs} />

        </div>


        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="mt-10 mb-5 text-center">

          <p className="text-gray-600 text-sm">
            AI Firewall Security Engine • Continuous Protection
          </p>

        </div>

      </div>
    </div>
  );
}


// ============================================================
// STAT CARD
// ============================================================

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:-translate-y-1 transition-all duration-300">

      <div className="flex items-center justify-between">

        <p className="text-gray-400 text-sm font-semibold">
          {title}
        </p>

        <span className="text-2xl">
          {icon}
        </span>

      </div>

      <p className="text-4xl font-bold mt-5">
        {value}
      </p>

    </div>
  );
}


// ============================================================
// MINI CARD
// ============================================================

function MiniCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all duration-300">

      <div className="flex items-center justify-between">

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <span className="text-lg">
          {icon}
        </span>

      </div>

      <p className="text-2xl font-bold text-white mt-3">
        {value}
      </p>

    </div>
  );
}


// ============================================================
// BADGE
// ============================================================

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold whitespace-nowrap">
      {text}
    </span>
  );
}