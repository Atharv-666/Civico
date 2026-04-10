import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// Cleaned up unused icons to prevent import errors
import { PhotoIcon } from '@heroicons/react/24/outline'; 

const Admin = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllIssues = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/issues/all');
      if (res.data.success) {
        setIssues(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const tid = toast.loading("Updating status...");
    try {
      const res = await axios.patch(`http://localhost:5000/api/issues/status/${id}`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Marked as ${newStatus}`, { id: tid });
        setIssues(issues.map(iss => iss._id === id ? { ...iss, status: newStatus } : iss));
      }
    } catch (err) {
      toast.error("Update failed", { id: tid });
    }
  };

  useEffect(() => {
    fetchAllIssues();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#ff4d6d] font-black italic animate-pulse">
      OPENING CONTROL CENTER...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Admin <span className="text-[#ff4d6d]">Console</span></h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Full Oversight of Salokhenagar Issues</p>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-center">
            <span className="block text-2xl font-black text-[#ff4d6d]">{issues.length}</span>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Total Reports</span>
          </div>
        </header>

        <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-[#0b0f1a] shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Issue Details</th>
                <th className="px-8 py-6">Reporter</th>
                <th className="px-8 py-6">Current Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {issues.map((issue) => (
                <tr key={issue._id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      {issue.image ? (
                        <img src={issue.image} className="size-12 rounded-xl object-cover bg-black/40 border border-white/5" alt="" />
                      ) : (
                        <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-gray-700">
                          <PhotoIcon className="size-5" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-sm text-white group-hover:text-[#ff4d6d] transition-colors">{issue.title}</p>
                        <p className="text-xs text-gray-500 italic">{issue.landmark || 'No Landmark'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-medium text-gray-400">
                    {issue.reportedBy || 'Anonymous'}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      issue.status === 'Resolved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                      issue.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                      'bg-[#ff4d6d]/10 text-[#ff4d6d] border border-[#ff4d6d]/20'
                    }`}>
                      {issue.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <select 
                      onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                      value={issue.status || 'Pending'}
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase outline-none focus:border-[#ff4d6d]/50 cursor-pointer text-white"
                    >
                      <option value="Pending" className="bg-[#0b0f1a]">Pending</option>
                      <option value="In Progress" className="bg-[#0b0f1a]">In Progress</option>
                      <option value="Resolved" className="bg-[#0b0f1a]">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;