"use client";

export default function LogsTable({ logs }) {
  function formatThreat(threat) {
    return threat
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function formatTime(timestamp) {
    if (!timestamp) return "-";

    try {
      return new Date(timestamp).toLocaleTimeString();
    } catch {
      return "-";
    }
  }

  function getActionStyle(action) {
    if (action === "BLOCK") {
      return "bg-red-500/10 border-red-500/30 text-red-400";
    }

    if (action === "MASK") {
      return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
    }

    return "bg-green-500/10 border-green-500/30 text-green-400";
  }

  function getRiskStyle(score) {
    if (score >= 70) {
      return "text-red-400";
    }

    if (score >= 40) {
      return "text-yellow-400";
    }

    return "text-green-400";
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

      {/* HEADER */}

      <div className="p-6 border-b border-gray-800">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Live Security Logs
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Real-time AI security events
            </p>

          </div>

          <div className="text-2xl">
            📋
          </div>

        </div>

      </div>


      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead>

            <tr className="bg-gray-800/60 border-b border-gray-800">

              <th className="text-left px-6 py-4 text-gray-400 text-xs uppercase tracking-wider">
                Time
              </th>

              <th className="text-left px-6 py-4 text-gray-400 text-xs uppercase tracking-wider">
                Prompt
              </th>

              <th className="text-left px-6 py-4 text-gray-400 text-xs uppercase tracking-wider">
                Risk
              </th>

              <th className="text-left px-6 py-4 text-gray-400 text-xs uppercase tracking-wider">
                Detected
              </th>

              <th className="text-left px-6 py-4 text-gray-400 text-xs uppercase tracking-wider">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {logs.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No security events yet.
                </td>

              </tr>

            ) : (

              logs.map((log, index) => (

                <tr
                  key={`${log.timestamp}-${index}`}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >

                  {/* TIME */}

                  <td className="px-6 py-5 text-gray-500 text-sm whitespace-nowrap">

                    {formatTime(log.timestamp)}

                  </td>


                  {/* PROMPT */}

                  <td className="px-6 py-5 max-w-[350px]">

                    <p className="text-gray-200 text-sm truncate">
                      {log.prompt}
                    </p>

                  </td>


                  {/* RISK */}

                  <td className="px-6 py-5">

                    <span
                      className={`font-bold text-lg ${getRiskStyle(
                        log.risk_score
                      )}`}
                    >
                      {log.risk_score}
                    </span>

                  </td>


                  {/* DETECTED */}

                  <td className="px-6 py-5">

                    {log.detected &&
                    log.detected.length > 0 ? (

                      <div className="flex flex-wrap gap-2">

                        {log.detected.map(
                          (threat, threatIndex) => (

                            <span
                              key={`${threat}-${threatIndex}`}
                              className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold whitespace-nowrap"
                            >
                              {formatThreat(threat)}
                            </span>

                          )
                        )}

                      </div>

                    ) : (

                      <span className="text-gray-600 text-sm">
                        None
                      </span>

                    )}

                  </td>


                  {/* ACTION */}

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-bold ${getActionStyle(
                        log.action
                      )}`}
                    >
                      {log.action}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}