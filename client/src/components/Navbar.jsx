import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon, PlusIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'; // Corrected import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const handleReportClick = () => {
    window.scrollTo(0, 0);
    setIsOpen(false);
    navigate('/createissue');
  };

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-4 bg-[#0a192f]/80 backdrop-blur-md border-b border-indigo-400/10">
      
      {/* Brand Name */}
      <Link to="/" className="max-md:flex-1 group">
        <span className="text-2xl font-black tracking-tighter text-white transition-colors group-hover:text-[#64ffda]">
          Civic<span className="text-[#64ffda]">o</span>
        </span>
      </Link>

      {/* Center Links */}
      <div className={`max-md:fixed max-md:top-0 max-md:left-0 z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 md:gap-6 py-2 px-8 max-md:h-screen md:rounded-full md:bg-[#112240]/50 md:border md:border-indigo-400/20 text-[#ccd6f6] font-medium transition-all duration-300 ${isOpen ? 'max-md:w-full opacity-100' : 'max-md:w-0 opacity-0 md:opacity-100'}`}>
        
        <XIcon className="md:hidden absolute top-6 right-6 w-8 h-8 cursor-pointer text-[#64ffda]" onClick={()=> setIsOpen(false) }  />

        <Link className="hover:text-[#64ffda] transition-colors" onClick={()=> {window.scrollTo(0,0); setIsOpen(false)} } to="/">Home</Link>
        <Link className="hover:text-[#64ffda] transition-colors" onClick={()=> {window.scrollTo(0,0); setIsOpen(false)} } to="/issues">Reports Feed</Link>
        <Link className="hover:text-[#64ffda] transition-colors" onClick={()=> {window.scrollTo(0,0); setIsOpen(false)} } to="/myissues">My Activity</Link>
        <Link className="hover:text-[#64ffda] transition-colors" onClick={()=> {window.scrollTo(0,0); setIsOpen(false)} } to="/about">About</Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        
        {user && (
          <button 
            onClick={handleReportClick}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-400/30 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:block">Report Issue</span>
          </button>
        )}

        {!user ? ( 
          <button 
            onClick={() => openSignIn()} 
            className="px-6 py-2 bg-[#64ffda] text-[#0a192f] hover:bg-[#45e6c0] transition rounded-full font-bold cursor-pointer text-sm shadow-[0_0_15px_rgba(100,255,218,0.2)]"
          >
            Login
          </button>
        ) : (
          <div className="border-2 border-[#64ffda] rounded-full p-0.5 hover:scale-105 transition-transform">
            <UserButton afterSignOutUrl="/"/>
          </div>
        )}
        
        <MenuIcon className="md:hidden w-8 h-8 cursor-pointer text-[#64ffda]" onClick={()=> setIsOpen(true)} />
      </div>
    </nav>
  );
};

export default Navbar;