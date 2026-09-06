"use client";

import { useState } from "react";
import RiskGauge from "@/components/RiskGauge";

export default function TestPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkPrompt() {
    if (!prompt.trim()) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      console.log("API URL:", apiUrl);

      const response = await fetch(
        `${apiUrl}/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Firewall request failed:",
          response.status,
          errorText
        );

        throw new Error(
          `Firewall request failed: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();

      console.log("Firewall response:", data);

      setResult(data);
    } catch (error) {
      console.error("Firewall error:", error);

      setResult({
        error: error.message,
      });
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      {/* Page Header */}
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">

          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-4">
            🛡️ AI Security Scanner
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            AI Firewall Scanner
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Analyze prompts for sensitive data and malicious instructions.
          </p>

        </div>

        {/* Input Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-xl font-bold">
              Enter your prompt
            </h2>

            <span className="text-gray-500 text-sm">
              Security Check
            </span>

          </div>

          <textarea
            className="w-full h-44 bg-gray-800 border border-gray-700 rounded-xl p-5 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition resize-none"
            placeholder="Example: My email is test@gmail.com"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="flex items-center justify-between mt-5">

            <p className="text-gray-500 text-sm">
              {prompt.length} characters
            </p>

            <button
              onClick={checkPrompt}
              disabled={loading || !prompt.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 px-8 py-3 rounded-xl font-bold transition"
            >
              {loading
                ? "🔄 Scanning..."
                : "🛡️ CHECK PROMPT"}
            </button>

          </div>

        </div>

        {/* Security Result */}
        {result && !result.error && (

          <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl p-8">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-bold">
                  Security Result
                </h2>

                <p className="text-gray-400 mt-2">
                  AI Firewall analysis completed
                </p>

              </div>

              <div className="text-3xl">
                🛡️
              </div>

            </div>

            {/* Risk Score */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">

              <p className="text-gray-400 text-sm">
                Risk Score
              </p>

              <div className="flex items-end gap-2 mt-2">

                <span className="text-5xl font-bold">
                  {result.risk_score}
                </span>

                <span className="text-gray-500 mb-2">
                  / 100
                </span>

              </div>

              <RiskGauge score={result.risk_score} />

            </div>

            {/* Detection + Action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

              {/* Detected Threats */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">

                <p className="text-gray-400 text-sm mb-4">
                  Detected Threats
                </p>

                {result.detected &&
                result.detected.length > 0 ? (

                  <div className="flex gap-2 flex-wrap">

                    {result.detected.map((item, index) => (

                      <span
                        key={index}
                        className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-full text-sm font-semibold"
                      >
                        🚨 {item}
                      </span>

                    ))}

                  </div>

                ) : (

                  <span className="text-green-400 font-semibold">
                    🟢 No threats detected
                  </span>

                )}

              </div>

              {/* Firewall Action */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">

                <p className="text-gray-400 text-sm mb-4">
                  Firewall Action
                </p>

                <span
                  className={`inline-flex px-5 py-2 rounded-full font-bold ${
                    result.action === "BLOCK"
                      ? "bg-red-500/10 border border-red-500/30 text-red-400"
                      : result.action === "MASK"
                      ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                      : "bg-green-500/10 border border-green-500/30 text-green-400"
                  }`}
                >

                  {result.action === "BLOCK" && "🚨 "}
                  {result.action === "MASK" && "🟡 "}
                  {result.action === "ALLOW" && "🟢 "}

                  {result.action}

                </span>

              </div>

            </div>

            {/* Secured Prompt */}
            <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-6">

              <div className="flex items-center justify-between mb-4">

                <div>

                  <h3 className="text-xl font-bold">
                    Secured Prompt
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Sanitized output generated by the firewall
                  </p>

                </div>

                <span className="text-2xl">
                  🔐
                </span>

              </div>

              <div className="bg-black border border-gray-700 p-5 rounded-xl break-words text-gray-300">
                {result.secured_prompt}
              </div>

            </div>

          </div>

        )}

        {/* Error */}
        {result?.error && (

          <div className="mt-10 bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-400">

            🚨 {result.error}

          </div>

        )}

      </div>

    </main>
  );
}