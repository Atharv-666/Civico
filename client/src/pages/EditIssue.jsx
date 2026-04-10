import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon, CheckIcon, PhotoIcon } from '@heroicons/react/24/outline';

// Dynamic API URL for Production/Development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const EditIssue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', category: '', priority: '', landmark: '', description: '', image: ''
  });

  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`${API_URL}/issues/${id}`);
        if (res.data.success) {
          setFormData(res.data.data);
          setPreview(res.data.data.image);
        }
      } catch (err) {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const tid = toast.loading("Updating records...");

    try {
      let finalImageUrl = formData.image;

      if (newImage) {
        const data = new FormData();
        data.append("file", newImage);
        data.append("upload_preset", "civico_preset");
        data.append("cloud_name", "dlvsmu0x3");

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dlvsmu0x3/image/upload",
          data
        );
        finalImageUrl = cloudRes.data.secure_url;
      }

      const updatedData = { ...formData, image: finalImageUrl };
      const res = await axios.put(`${API_URL}/issues/${id}`, updatedData);

      if (res.data.success) {
        toast.success("Update Successful!", { id: tid });
        setTimeout(() => navigate('/issues'), 1000);
      }
    } catch (err) {
      toast.error("Update failed", { id: tid });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#ff4d6d] font-black italic uppercase tracking-tighter animate-pulse">LOADING...</div>;

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-8 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
          <ArrowLeftIcon className="size-4" /> Back
        </button>

        <div className="bg-[#0b0f1a] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl font-black mb-10 italic uppercase tracking-tighter">Edit <span className="text-[#ff4d6d]">Report</span></h2>
          
          <form onSubmit={onSubmitHandler} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Evidence Photo</label>
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 group bg-white/[0.02]">
                {preview ? (
                  <>
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    <label htmlFor="image-edit" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer font-bold text-[10px] uppercase tracking-widest">Change Photo</label>
                  </>
                ) : (
                  <label htmlFor="image-edit" className="flex flex-col items-center justify-center h-full cursor-pointer"><PhotoIcon className="size-8 text-gray-700" /></label>
                )}
                <input type="file" id="image-edit" className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Title</label>
              <input name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 focus:border-[#ff4d6d]/50 outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Category</label>
                  <select name="category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-5 py-3.5 outline-none cursor-pointer">
                    <option>Roads & Pavement</option>
                    <option>Waste & Cleaning</option>
                    <option>Street Lights</option>
                    <option>Public Safety</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Priority</label>
                  <select name="priority" value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-5 py-3.5 outline-none cursor-pointer">
                    <option>Low Priority</option>
                    <option>Medium Priority</option>
                    <option>High Priority</option>
                  </select>
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Landmark</label>
              <input name="landmark" value={formData.landmark} onChange={(e) => setFormData({...formData, landmark: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 focus:border-[#ff4d6d]/50 outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Description</label>
              <textarea name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="4" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 focus:border-[#ff4d6d]/50 outline-none resize-none italic" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#ff4d6d] py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#ff3355] transition-all shadow-xl shadow-[#ff4d6d]/10 disabled:bg-gray-700">
              {isSubmitting ? 'PROCESSING...' : 'SAVE CHANGES'}
              <CheckIcon className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditIssue;