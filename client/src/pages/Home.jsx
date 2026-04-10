import React from 'react';
import { useNavigate } from 'react-router-dom';
import HowItWorks from '../components/HowItWorks';
import { PlusCircleIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30">
      
      {/* SECTION 1: HERO */}
      {/* Changed: px-6 for mobile, h-auto with padding-top for mobile to avoid content cutting */}
      <section className="relative min-h-screen md:h-screen w-full flex flex-col justify-center px-6 md:px-16 overflow-hidden pt-32 md:pt-0">
        
        {/* Background Glows - Scaled for mobile */}
        <div className="absolute top-[-5%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="max-w-2xl text-center md:text-left flex flex-col items-center md:items-start">
            
            {/* Subtle Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
              </span>
              Community Network
            </div>

            {/* ADJUSTED MAIN HEADING: Scaled for phone screens */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.2] md:leading-[1.1] mb-6">
              Empowering Voices,<br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
                Building Standards.
              </span>
            </h1>

            {/* ADJUSTED SUB-HEADING */}
            <p className="text-gray-400 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
              Join a network of proactive citizens using <span className="text-gray-200 font-medium">high-integrity reporting</span> to ensure infrastructure belongs to everyone. Your observation is the first step toward a fix.
            </p>

            {/* Action Buttons: Stack on mobile, side-by-side on tablet+ */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => navigate('/createissue')}
                className="group flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg active:scale-95 w-full sm:w-auto"
              >
                <PlusCircleIcon className="size-5 group-hover:rotate-90 transition-transform" />
                <span className="uppercase tracking-wider text-xs">Initiate Report</span>
              </button>

              <button 
                onClick={() => navigate('/issues')}
                className="flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 px-8 rounded-xl transition-all backdrop-blur-md w-full sm:w-auto"
              >
                <span className="uppercase tracking-wider text-xs text-gray-300">Public Feed</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on very small screens to save space */}
        <div className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-gray-500">Scroll</span>
          <ArrowDownIcon className="size-3 animate-bounce" />
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <div className="relative z-10 bg-[#030712]">
        <div className="max-w-7xl mx-auto py-12 md:py-20 border-t border-white/5 px-6">
           <HowItWorks />
        </div>
      </div>

    </div>
  );
}

export default Home;