import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="text-center py-24 px-6">

        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold">
          🛡️ AI-Powered LLM Security
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          AI Firewall
        </h1>

        <p className="mt-6 text-2xl md:text-3xl text-blue-400 font-semibold">
          Security Layer for LLM Applications
        </p>

        <p className="max-w-3xl mx-auto mt-6 text-gray-400 text-lg leading-8">
          Protect AI applications from prompt injection, sensitive data
          leakage, and malicious user requests with an intelligent security
          layer.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

          <Link
            href="/test"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/20"
          >
            🧪 Scan a Prompt
          </Link>

          <Link
            href="/dashboard"
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-8 py-4 rounded-xl font-bold transition"
          >
            📊 Security Dashboard
          </Link>

        </div>

      </section>


      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        <FeatureCard
          icon="🔍"
          title="Prompt Scanner"
          text="Analyze user prompts for PII leakage and prompt injection attacks."
        />

        <FeatureCard
          icon="⚡"
          title="Risk Analysis"
          text="Calculate a security risk score and classify every request."
        />

        <FeatureCard
          icon="🚨"
          title="Threat Protection"
          text="Automatically allow, mask, or block dangerous requests."
        />

      </section>


      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 mt-20">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12">

          <h2 className="text-3xl font-bold text-center">
            How AI Firewall Works
          </h2>

          <p className="text-gray-400 text-center mt-3">
            Every prompt passes through the security layer before reaching
            the AI application.
          </p>


          <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-6 mt-12 text-center">

            <FlowStep
              icon="👤"
              title="User"
              text="User Prompt"
            />

            <div className="hidden md:block text-3xl text-blue-400">
              →
            </div>

            <FlowStep
              icon="🛡️"
              title="Firewall"
              text="Analyze & Protect"
            />

            <div className="hidden md:block text-3xl text-blue-400">
              →
            </div>

            <FlowStep
              icon="🤖"
              title="AI"
              text="Safe Request"
            />

          </div>

        </div>

      </section>


      {/* MVP Capabilities */}
      <section className="max-w-6xl mx-auto px-6 mt-16">

        <h2 className="text-3xl font-bold text-center">
          Security Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">

          <PipelineCard
            number="01"
            title="Detect"
            text="Identify suspicious patterns."
          />

          <PipelineCard
            number="02"
            title="Score"
            text="Calculate threat severity."
          />

          <PipelineCard
            number="03"
            title="Protect"
            text="Mask or block unsafe content."
          />

          <PipelineCard
            number="04"
            title="Log"
            text="Record security events."
          />

        </div>

      </section>


      {/* Footer */}
      <footer className="text-center text-gray-500 py-16 mt-16 border-t border-gray-900">
        <p className="font-semibold text-gray-400">
          🛡️ AI Firewall
        </p>

        <p className="mt-2 text-sm">
          Intelligent Security Layer for LLM Applications
        </p>

        <p className="mt-4 text-xs">
          Built for Hackathon 🚀
        </p>
      </footer>

    </main>
  );
}


/* Feature Card */

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition">

      <div className="text-5xl">
        {icon}
      </div>

      <h2 className="text-2xl font-bold mt-5">
        {title}
      </h2>

      <p className="mt-3 text-gray-400 leading-7">
        {text}
      </p>

    </div>
  );
}


/* Flow Step */

function FlowStep({ icon, title, text }) {
  return (
    <div>

      <div className="text-5xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold mt-3">
        {title}
      </h3>

      <p className="text-gray-400 mt-1">
        {text}
      </p>

    </div>
  );
}


/* Pipeline Card */

function PipelineCard({ number, title, text }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

      <div className="text-blue-400 font-bold text-sm">
        {number}
      </div>

      <h3 className="text-xl font-bold mt-3">
        {title}
      </h3>

      <p className="text-gray-400 mt-2 text-sm">
        {text}
      </p>

    </div>
  );
}