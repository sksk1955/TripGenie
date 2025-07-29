import React from 'react'

function Footer() {
  return (
    <footer className="relative mt-20 mb-8">
      {/* Gradient divider line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60"></div>
      
      {/* Main footer content */}
      <div className="text-center pt-8 space-y-4">
        {/* Brand section with glow effect */}
        <div className="group">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-700 ease-in-out transform group-hover:scale-105">
            AI Trip Planner
          </h3>
          <div className="w-24 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        {/* Copyright and tagline */}
        <div className="space-y-2">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
          
          {/* Animated tagline */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/30 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 group cursor-default">
            <span className="text-amber-600 dark:text-amber-400 font-semibold text-sm group-hover:animate-pulse">
              ✈️ Bon Voyage!
            </span>
            <div className="w-1 h-1 bg-amber-400 rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="flex justify-center items-center space-x-6 pt-4 opacity-40">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      {/* Background glow effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-indigo-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>
    </footer>
  )
}

export default Footer