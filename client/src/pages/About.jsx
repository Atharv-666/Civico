import React from 'react';
import { 
  ChatBubbleBottomCenterTextIcon, 
  HeartIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const About = () => {
  const team = [
    { id: 1, name: "Atharv" },
    { id: 2, name: "Team Member 2" },
    { id: 3, name: "Team Member 3" },
    { id: 4, name: "Team Member 4" },
    { id: 5, name: "Team Member 5" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 md:pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
      
      {/* Background Orbs - Hidden on very small screens to improve performance */}
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="hidden sm:block absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 1. Our Mission Section */}
        <section className="text-center mb-16 md:mb-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            Cleaning up <span className="text-primary">Salokhenagar</span>, <br className="hidden sm:block" /> One Report at a Time.
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            We believe that every citizen has the power to improve their neighborhood. 
            Our platform bridges the gap between residents and authorities.
          </p>
        </section>

        {/* 2. Our Team Section */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-8 md:mb-10 justify-center md:justify-start">
            <UserGroupIcon className="size-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Our Team</h2>
          </div>
          {/* Responsive Grid: 1 col on mobile, 2 on small tablets, 5 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {team.map((member) => (
              <div 
                key={member.id} 
                className="bg-white/5 border border-white/10 py-5 md:py-6 px-4 rounded-2xl text-center hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group"
              >
                <p className="font-bold text-gray-300 group-hover:text-white text-sm md:text-base">{member.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Suggestion Form Section */}
        <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-xl relative">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <ChatBubbleBottomCenterTextIcon className="size-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center sm:text-left">Have a Suggestion?</h2>
            </div>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 text-sm"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 text-sm"
                />
              </div>
              <textarea 
                rows="4" 
                placeholder="Share your ideas with us..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-gray-600 text-sm"
              ></textarea>
              <button 
                type="submit" 
                className="bg-primary hover:bg-blue-600 text-white font-bold py-3 md:py-4 px-8 rounded-xl w-full transition-all shadow-lg active:scale-95 uppercase tracking-widest text-xs md:text-sm"
              >
                Send Suggestion
              </button>
            </form>
          </div>
        </section>

        {/* Footer Love */}
        <div className="mt-16 md:mt-20 text-center text-gray-600 text-[10px] md:text-xs flex items-center justify-center gap-2">
          Made with <HeartIcon className="size-3 text-primary animate-pulse" /> by Team DY Patil
        </div>

      </div>
    </div>
  );
};

export default About;