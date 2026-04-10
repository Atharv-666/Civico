import React from 'react';
import { useUser, SignInButton } from "@clerk/clerk-react";
import { LockClosedIcon } from '@heroicons/react/24/outline';
// 1. IMPORT YOUR ACTUAL FORM HERE
import ReportForm from '../components/ReportForm'; 

const CreateIssue = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white text-xl font-black italic">
        LOADING CIVICO...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6">
        <div className="text-center p-12 bg-[#0b0f1a] border border-white/5 rounded-[3rem] shadow-2xl max-w-md w-full">
          <div className="bg-[#ff4d6d]/10 size-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[#ff4d6d]/20">
            <LockClosedIcon className="size-10 text-[#ff4d6d]" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3 italic uppercase">
            Login <span className="text-[#ff4d6d]">Required</span>
          </h2>
          <p className="text-gray-400 mb-10 text-sm font-medium leading-relaxed italic px-4">
            "Please sign in to report and track civic issues in Salokhenagar."
          </p>
          <SignInButton mode="modal">
            <button className="w-full bg-[#ff4d6d] hover:bg-[#ff3355] text-white py-4 rounded-2xl font-black transition-all shadow-xl shadow-[#ff4d6d]/20 uppercase tracking-widest text-xs">
              Sign In to Report
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  // 2. THIS IS WHERE WE PUT THE COMPONENT
  return (
    <div className="min-h-screen bg-[#030712]">
        <ReportForm /> 
    </div>
  );
};

export default CreateIssue;