import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Home from './pages/Home'
import Issues from './pages/Issues'
import IssueDetails from './pages/IssueDetails'
import About from './pages/About'
import MyIssues from './pages/MyIssues'
import EditIssue from './pages/EditIssue'
import CreateIssue from './pages/CreateIssue'
import Admin from './pages/Admin' 
import Footer from './components/Footer'

const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white font-black italic animate-pulse uppercase tracking-widest text-xs">
        Verifying Credentials...
      </div>
    );
  }

  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress === "ghostbusterss0666@gmail.com";

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col overflow-x-hidden">
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/issues' element={<Issues />} />
          <Route path='/issues/:id' element={<IssueDetails />} />
          <Route path='/about' element={<About />} />
          <Route path='/myissues' element={<MyIssues />} />
          <Route path='/edit/:id' element={<EditIssue />} />
          <Route path='/createissue' element={<CreateIssue />} />

          {/* Secure Admin Route */}
          <Route 
            path='/admin' 
            element={isAdmin ? <Admin /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App