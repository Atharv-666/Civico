import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useUser, SignInButton } from "@clerk/clerk-react";
import { 
  ChatBubbleBottomCenterTextIcon, 
  PhotoIcon, 
  MapPinIcon, 
  HashtagIcon,
  ShieldExclamationIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Dynamic API URL for Production/Development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ReportForm = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Roads & Pavement',
    priority: 'Medium Priority',
    landmark: '',
    description: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!isSignedIn) {
      toast.error("You must be signed in to report an issue!");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Uploading to Civico...");

    try {
      let imageUrl = "";

      // --- CLOUDINARY UPLOAD LOGIC ---
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "civico_preset");
        data.append("cloud_name", "dlvsmu0x3");

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dlvsmu0x3/image/upload",
          data
        );
        imageUrl = cloudRes.data.secure_url; 
      }

      const finalData = { 
        ...formData, 
        image: imageUrl, 
        reportedBy: user.fullName || user.primaryEmailAddress.emailAddress,
        userId: user.id 
      };

      // UPDATED TO USE API_URL
      const response = await axios.post(`${API_URL}/issues/add`, finalData);
      
      if (response.data.success) {
        toast.success("Issue Reported Successfully!", { id: toastId });
        
        setTimeout(() => {
            navigate('/issues');
        }, 1500);

        setFormData({ title: '', category: 'Roads & Pavement', priority: 'Medium Priority', landmark: '', description: '' });
        setPreview(null);
        setImage(null);
      }
    } catch (error) {
      toast.error("Upload failed. Check console.", { id: toastId });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (Keep the rest of your JSX exactly as it was)
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6">
        <div className="text-center p-10 bg-[#0b0f1a] border border-white/5 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
          <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm">Please sign in to report issues </p>
          <SignInButton mode="modal">
            <button className="bg-[#ff4d6d] hover:bg-[#ff3355] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-[#ff4d6d]/20">
              Sign In to Report
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6 py-20 relative">
      <div className="w-full max-w-4xl bg-[#0b0f1a] border border-white/5 rounded-[2rem] shadow-2xl relative z-10">
        <div className="p-8 md:p-12">
          <header className="mb-10 text-center md:text-left border-b border-white/5 pb-6">
            <h2 className="text-3xl font-bold text-white">Report an <span className="text-[#ff4d6d]">Issue</span></h2>
          </header>

          <form onSubmit={onSubmitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Issue Title</label>
              <div className="relative">
                <ChatBubbleBottomCenterTextIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600" />
                <input name="title" value={formData.title} onChange={onChangeHandler} type="text" placeholder="e.g. Pothole on main road" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-12 py-3.5 text-white focus:outline-none focus:border-[#ff4d6d]/40" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Category</label>
              <div className="relative">
                <HashtagIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600" />
                <select name="category" value={formData.category} onChange={onChangeHandler} className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-12 py-3.5 text-gray-400 focus:outline-none appearance-none cursor-pointer">
                  <option>Roads & Pavement</option>
                  <option>Waste & Cleaning</option>
                  <option>Street Lights</option>
                  <option>Public Safety</option>
                </select>
                <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-600 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Priority</label>
              <div className="relative">
                <ShieldExclamationIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600" />
                <select name="priority" value={formData.priority} onChange={onChangeHandler} className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-12 py-3.5 text-gray-400 focus:outline-none appearance-none cursor-pointer">
                  <option>Low Priority</option>
                  <option>Medium Priority</option>
                  <option>High Priority</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Landmark</label>
              <div className="relative">
                <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600" />
                <input name="landmark" value={formData.landmark} onChange={onChangeHandler} type="text" placeholder="e.g. Near DY Patil College" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-12 py-3.5 text-white focus:outline-none focus:border-[#ff4d6d]/40" required />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Description</label>
              <textarea name="description" value={formData.description} onChange={onChangeHandler} rows="3" placeholder="Describe the issue..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff4d6d]/40 resize-none" required></textarea>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Evidence Photo</label>
              <div className="relative group">
                <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
                {!preview ? (
                  <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-[#ff4d6d]/40 hover:bg-[#ff4d6d]/5 transition-all">
                    <PhotoIcon className="size-8 text-gray-600 mb-2" />
                    <p className="text-sm text-gray-500">Upload a photo of the problem</p>
                  </label>
                ) : (
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => {setPreview(null); setImage(null);}} className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-[#ff4d6d]">
                      <XMarkIcon className="size-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`md:col-span-2 py-4 rounded-xl font-bold transition-all mt-4 flex items-center justify-center gap-2 group shadow-lg ${isSubmitting ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-[#ff4d6d] hover:bg-[#ff3355] text-white shadow-[#ff4d6d]/20 hover:-translate-y-0.5'}`}
            >
              {isSubmitting ? 'Uploading to Cloudinary...' : 'Submit Report'}
              {!isSubmitting && <ArrowRightCircleIcon className="size-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;