import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button.jsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import NotificationsButton from '@/travel-buddy/NotificationsButton';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user)
  })

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }

  // Persist dark mode preference
  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <header className="relative bg-gray-900 text-white shadow-xl border-b border-white/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"></div>
      
      <div className="relative backdrop-blur-sm bg-white/10 dark:bg-black/10 border border-white/20 dark:border-gray-700/50 rounded-xl mx-4 my-3 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/logo.svg" alt="Logo" className="h-8 w-auto filter drop-shadow-lg" />
          </div>

          {/* Navigation and User Section */}
          <div className='flex items-center gap-4'>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative group p-3 bg-white/20 hover:bg-white/30 dark:bg-gray-800/50 dark:hover:bg-gray-700/60 rounded-full shadow-lg backdrop-blur-sm border border-white/30 dark:border-gray-600/50 transition-all duration-300 hover:scale-110 hover:shadow-xl"
              aria-label="Toggle dark mode"
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-300" role="img" aria-label="theme">🌓</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {user ? (
              <div className='flex items-center gap-3'>
                {/* Navigation Buttons */}
                <a href="/create-trip">
                  <Button 
                    variant="outline" 
                    className="relative group rounded-full px-4 py-2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/50 dark:hover:bg-gray-700/60 border border-white/30 dark:border-gray-600/50 text-white hover:text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Trip
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </a>

                <a href="/my-trips">
                  <Button 
                    variant="outline" 
                    className="relative group rounded-full px-4 py-2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/50 dark:hover:bg-gray-700/60 border border-white/30 dark:border-gray-600/50 text-white hover:text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      My Trips
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </a>

                <a href="/travel-buddy/profile">
                  <Button 
                    variant="outline" 
                    className="relative group rounded-full px-4 py-2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/50 dark:hover:bg-gray-700/60 border border-white/30 dark:border-gray-600/50 text-white hover:text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Travel Buddy Profile
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </a>

                <a href="/travel-buddy/discover">
                  <Button 
                    variant="outline" 
                    className="relative group rounded-full px-4 py-2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/50 dark:hover:bg-gray-700/60 border border-white/30 dark:border-gray-600/50 text-white hover:text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Find Buddies
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/20 to-rose-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </a>

                {/* User Profile Dropdown */}
                <Popover>
                  <PopoverTrigger>
                    <div className="relative group">
                      <img 
                        src={user?.picture} 
                        alt="" 
                        className='h-[40px] w-[40px] rounded-full border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:border-white/80' 
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-xl shadow-xl">
                    <h2 
                      className='cursor-pointer p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold transition-colors duration-200' 
                      onClick={()=>{
                        googleLogout();
                        localStorage.clear();
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </h2>
                    <h2 
                      className='cursor-pointer p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-200 mt-1' 
                      onClick={()=>{
                        window.location.href = "/travel-buddy/profile";
                      }}
                    >
                      Edit Profile
                    </h2>
                  </PopoverContent>
                </Popover>

                <NotificationsButton currentUser={user} />
              </div>
            ) : (
              <Button 
                onClick={()=>setOpenDialog(true)}
                className="relative group bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full px-6 py-3 font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Dialog */}
      <Dialog open={openDialog}>
        <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl max-w-md">
          <DialogHeader>
            <DialogDescription className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <img src="/logo.svg" alt="logo" width="80px" className='filter drop-shadow-lg' />
              </div>
              <h2 className='font-bold text-2xl text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                Sign In to check out your travel plan
              </h2>
              <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                Sign in to the App with Google authentication securely
              </p>
              <Button
                onClick={login}
                className="relative group w-full mt-6 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex gap-3 items-center justify-center font-semibold">
                  <FcGoogle className="h-6 w-6" />
                  Sign in With Google
                </span>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  )
}

export default Header