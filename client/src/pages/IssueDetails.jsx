import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPinIcon, ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';

const IssueDetails = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/issues/${id}`);
        if (response.data.success) setIssue(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#ff4d6d] font-bold animate-pulse">Loading...</div>;
  if (!issue) return <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">Not found.</div>;

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Back link */}
        <Link to="/issues" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-all mb-6 text-xs font-bold uppercase tracking-widest">
          <ArrowLeftIcon className="size-4" /> Back
        </Link>

        <div className="bg-[#0b0f1a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Image - Controlled Height */}
          <div className="w-full h-72 md:h-96 bg-black/20">
            {issue.image ? (
              <img src={issue.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center opacity-20">
                <PhotoIcon className="size-12" />
              </div>
            )}
          </div>

          <div className="p-8 md:p-12">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-[#ff4d6d]/10 text-[#ff4d6d] text-[10px] font-black rounded-md border border-[#ff4d6d]/20 uppercase">
                {issue.status}
              </span>
              <span className="text-[10px] text-gray-600 font-mono">ID: {issue._id.slice(-6)}</span>
            </div>

            <h1 className="text-3xl font-black mb-2 tracking-tight">{issue.title}</h1>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-10 pb-8 border-b border-white/5">
              <MapPinIcon className="size-4 text-[#ff4d6d]" />
              <span>{issue.landmark}</span>
            </div>

            <div className="grid grid-cols-2 gap-10 mb-10">
              <div>
                <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Category</p>
                <p className="text-sm font-medium">{issue.category}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Priority</p>
                <p className="text-sm font-medium">{issue.priority}</p>
              </div>
            </div>

            <div className="mb-10">
              <p className="text-[10px] text-gray-600 font-bold uppercase mb-3">Description</p>
              <p className="text-gray-400 text-base leading-relaxed leading-7 italic">
                "{issue.description}"
              </p>
            </div>

            <div className="pt-8 border-t border-white/5 flex justify-between items-center opacity-40 text-[10px] font-bold uppercase tracking-widest">
              <span>{new Date(issue.createdAt).toDateString()}</span>
              <span>By {issue.reportedBy || 'Citizen'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;