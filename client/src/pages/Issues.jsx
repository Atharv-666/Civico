import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MapPinIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/issues/all");
      if (response.data.success) {
        setIssues(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white text-2xl font-black">
        LOADING CIVICO...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8 text-center md:text-left">
          <h1 className="text-4xl font-black mb-3 italic">
            COMMUNITY <span className="text-[#ff4d6d]">REPORTS</span>
          </h1>
          <p className="text-gray-400 font-medium">
            Salokhenagar Live Activity Feed
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="bg-[#0b0f1a] border border-white/10 rounded-3xl overflow-hidden flex flex-col group hover:border-[#ff4d6d]/50 transition-all"
            >
              {/* IMAGE SECTION - This is what was missing! */}
              <div className="h-48 w-full bg-black/40 overflow-hidden">
                {issue.image ? (
                  <img
                    src={issue.image}
                    alt="Issue"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs font-bold uppercase tracking-tighter">
                    No Evidence Attached
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  {/* NEW DYNAMIC COLOR VERSION */}
                  <span
                    className={`text-[10px] font-black px-2 py-1 rounded uppercase border ${
                      issue.status === "Resolved"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : issue.status === "In Progress"
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}
                  >
                    {issue.status || "Pending"}
                  </span>
                  <span className="text-[10px] text-gray-600 font-mono">
                    #{issue._id.slice(-4)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {issue.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <MapPinIcon className="size-4 text-[#ff4d6d]" />
                  <span className="truncate">{issue.landmark}</span>
                </div>

                <p className="text-gray-500 text-xs line-clamp-2 mb-6 leading-relaxed italic">
                  "{issue.description}"
                </p>

                <Link
                  to={`/issues/${issue._id}`}
                  className="w-full py-3 border border-white/5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-[#ff4d6d] hover:text-white transition-all group/btn"
                >
                  VIEW DETAILS
                  <ArrowLongRightIcon className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Issues;
