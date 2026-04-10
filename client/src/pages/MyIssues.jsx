import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { 
  MapPinIcon, 
  ArrowLongRightIcon, 
  PencilSquareIcon, 
  TrashIcon 
} from "@heroicons/react/24/outline";

// Dynamic API URL for Production/Development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const MyIssues = () => {
  const { user, isLoaded } = useUser();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyIssues = async () => {
    if (!isLoaded || !user) return;
    try {
      // Updated to use dynamic API_URL
      const response = await axios.get(`${API_URL}/issues/user/${user.id}`);
      if (response.data.success) {
        setIssues(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching your reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    const tid = toast.loading("Deleting report...");
    try {
      // Updated to use dynamic API_URL
      const res = await axios.delete(`${API_URL}/issues/${id}`);
      if (res.data.success) {
        toast.success("Report deleted", { id: tid });
        setIssues(issues.filter(issue => issue._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete", { id: tid });
    }
  };

  useEffect(() => {
    fetchMyIssues();
  }, [user, isLoaded]);

  if (loading) return <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white text-2xl font-black italic tracking-tighter animate-pulse uppercase">Syncing Activity...</div>;

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl font-black mb-3 italic uppercase tracking-tighter">
              MY <span className="text-[#ff4d6d]">ACTIVITY</span>
            </h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              Tracking your contributions to Salokhenagar
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-2xl mb-2">
            <span className="text-3xl font-black text-[#ff4d6d]">{issues.length}</span>
            <span className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest font-mono">Reports</span>
          </div>
        </header>

        {issues.length === 0 ? (
          <div className="text-center py-20 bg-[#0b0f1a] rounded-[3rem] border border-dashed border-white/10">
            <p className="text-gray-500 font-black uppercase tracking-widest italic">"You haven't reported any issues yet."</p>
            <Link to="/createissue" className="text-[#ff4d6d] text-[10px] font-black mt-4 inline-block hover:underline uppercase tracking-widest">Report an Issue →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {issues.map((issue) => (
              <div key={issue._id} className="bg-[#0b0f1a] border border-white/10 rounded-3xl overflow-hidden flex flex-col group hover:border-[#ff4d6d]/50 transition-all relative shadow-2xl">
                
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <Link 
                    to={`/edit/${issue._id}`} 
                    className="p-2 bg-black/60 backdrop-blur-md rounded-xl text-gray-400 hover:text-white border border-white/5 hover:border-white/20 transition-all"
                  >
                    <PencilSquareIcon className="size-5" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(issue._id)}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-xl text-gray-400 hover:text-[#ff4d6d] border border-white/5 hover:border-[#ff4d6d]/30 transition-all"
                  >
                    <TrashIcon className="size-5" />
                  </button>
                </div>

                <div className="h-48 w-full bg-black/40 overflow-hidden">
                  {issue.image ? (
                    <img src={issue.image} alt="Issue" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 text-[10px] font-black uppercase tracking-widest">No Evidence Attached</div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-[9px] font-black px-2 py-1 rounded uppercase border ${
                        issue.status === "Resolved"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : issue.status === "In Progress"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}
                    >
                      {issue.status || "Pending"}
                    </span>
                    <span className="text-[9px] text-gray-600 font-mono">#{issue._id.slice(-4).toUpperCase()}</span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter italic">{issue.title}</h3>

                  <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold mb-4 uppercase tracking-widest">
                    <MapPinIcon className="size-4 text-[#ff4d6d]" />
                    <span className="truncate">{issue.landmark}</span>
                  </div>

                  <p className="text-gray-500 text-xs line-clamp-2 mb-6 leading-relaxed italic">"{issue.description}"</p>

                  <Link to={`/issues/${issue._id}`} className="w-full py-3 border border-white/5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#ff4d6d] hover:text-white transition-all group/btn">
                    VIEW DETAILS
                    <ArrowLongRightIcon className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIssues;