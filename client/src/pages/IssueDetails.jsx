import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPinIcon, ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';

// Dynamic API URL for Production/Development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const IssueDetails = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`${API_URL}/issues/${id}`);
        if (response.data.success) setIssue(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#ff4d6d] font-black italic uppercase tracking-widest animate-pulse">Loading Details...</div>;
  if (!issue) return <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white font-black uppercase tracking-widest italic">Issue Not Found.</div>;

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        <Link to="/issues" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-all mb-6 text-[10px] font-black uppercase tracking-widest">
          <ArrowLeftIcon className="size-4" /> Back to Feed
        </Link>

        <div className="bg-[#0b0f1a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          <div className="w-full h-72 md:h-96 bg-black/20">
            {issue.image ? (
              <img src={issue.image} alt={issue.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center opacity-20">
                <PhotoIcon className="size-12" />
              </div>
            )}
          </div>

          <div className="p-8 md:p-12">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-[#ff4d6d]/10 text-[#ff4d6d] text-[10px] font-black rounded-md border border-[#ff4d6d]/20 uppercase tracking-widest">
                {issue.status || 'Pending'}
              </span>
              <span className="text-[10px] text-gray-600 font-mono">ID: {issue._id.slice(-6).toUpperCase()}</span>
            </div>

            <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">{issue.title}</h1>
            
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-10 pb-8 border-b border-white/5 uppercase tracking-wide">
              <MapPinIcon className="size-4 text-[#ff4d6d]" />
              <span>{issue.landmark}</span>
            </div>

            <div className="grid grid-cols-2 gap-10 mb-10">
              <div>
                <p className="text-[10px] text-gray-600 font-black uppercase mb-1 tracking-widest">Category</p>
                <p className="text-sm font-bold text-gray-200">{issue.category}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-600 font-black uppercase mb-1 tracking-widest">Priority</p>
                <p className="text-sm font-bold text-gray-200">{issue.priority}</p>
              </div>
            </div>

            <div className="mb-10">
              <p className="text-[10px] text-gray-600 font-black uppercase mb-3 tracking-widest">Description</p>
              <p className="text-gray-400 text-base leading-relaxed italic">
                "{issue.description}"
              </p>
            </div>

            <div className="pt-8 border-t border-white/5 flex justify-between items-center opacity-40 text-[10px] font-black uppercase tracking-widest">
              <span>{new Date(issue.createdAt).toDateString()}</span>
              <span>Reported by Citizen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;