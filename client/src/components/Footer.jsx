import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030712] border-t border-white/5 pt-16 pb-8 px-6 md:px-16 lg:px-36">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-12">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-black tracking-tighter text-white">
                Civic<span className="text-[#64ffda]">o</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Empowering citizens to build a better, cleaner, and safer community through transparent reporting.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-[#64ffda] transition-colors">Home</Link>
            <Link to="/issues" className="hover:text-[#64ffda] transition-colors">Reports Feed</Link>
            <Link to="/MyIssues" className="hover:text-[#64ffda] transition-colors">My Activity</Link>
            <Link to="/about" className="hover:text-[#64ffda] transition-colors">About Us</Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-gray-600 uppercase tracking-widest font-bold">
          <p>© {currentYear} Civico. All rights reserved.</p>
          
          <div className="flex items-center gap-1.5">
            Built with <HeartIcon className="size-3 text-red-500/60" /> by 
            <span className="text-gray-400">Team  GhostBusters</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;