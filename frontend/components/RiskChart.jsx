"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RiskChart({ logs }) {
  const threatTypes = [
    "EMAIL",
    "PHONE",
    "CREDIT_CARD",
    "AADHAAR",
    "PAN",
    "PROMPT_INJECTION",
    "JAILBREAK",
  ];

  const data = threatTypes.map((threat) => ({
    name: threat,
    value: logs.filter((log) =>
      log.detected?.includes(threat)
    ).length,
  }));

  const totalThreats = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const activeCategories = data.filter(
    (item) => item.value > 0
  ).length;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Threat Distribution
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Detected security threats
          </p>
        </div>

        <div className="text-2xl">
          🛡️
        </div>

      </div>


      {/* CHART */}

      <div className="w-full overflow-x-auto">

        <div className="min-w-[650px]">

          <ResponsiveContainer width="100%" height={340}>

            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 70,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
              />

              <XAxis
                dataKey="name"
                interval={0}
                angle={-35}
                textAnchor="end"
                height={80}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 10,
                }}
                axisLine={{
                  stroke: "#4B5563",
                }}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#4B5563",
                }}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(255,255,255,0.04)",
                }}
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "10px",
                  color: "#ffffff",
                }}
                formatter={(value) => [
                  value,
                  "Detected",
                ]}
              />

              <Bar
                dataKey="value"
                name="Threats"
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
                barSize={38}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* SUMMARY */}

      <div className="grid grid-cols-2 gap-4 mt-4">

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">

          <p className="text-gray-400 text-sm">
            Total Threats
          </p>

          <p className="text-3xl font-bold text-white mt-1">
            {totalThreats}
          </p>

        </div>


        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">

          <p className="text-gray-400 text-sm">
            Active Categories
          </p>

          <p className="text-3xl font-bold text-white mt-1">
            {activeCategories}
          </p>

        </div>

      </div>

    </div>
  );
}