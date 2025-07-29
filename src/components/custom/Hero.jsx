import React from 'react'
import { Button } from '../ui/button.jsx'
import { Link } from 'react-router-dom'
import Footer from "@/components/Footer";

function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-white text-gray-900 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white transition-colors duration-500 flex flex-col">
      <main className="flex-1 flex flex-col items-center mx-auto gap-12 max-w-4xl py-20 px-6 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Enhanced title with gradient and animations */}
        <div className="relative text-center space-y-4 mt-10">
          <h1 className="font-extrabold text-6xl md:text-7xl leading-tight">
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl animate-fade-in">
              Discover Your Next Adventure
            </span>
            <span className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl animate-fade-in-delay">
              with  TripGenie
            </span>
          </h1>
          
          {/* Decorative elements around title */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60"></div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60"></div>
        </div>

        {/* Enhanced description */}
        <div className="relative">
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 text-center max-w-2xl leading-relaxed font-medium">
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
          </p>
          
          {/* Subtle accent dots */}
          <div className="absolute -left-4 top-1/2 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute -right-4 top-1/2 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
        </div>

        {/* Enhanced CTA button */}
        <Link to={'/create-trip'}>
          <Button className="relative group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 text-lg font-bold border-0 overflow-hidden transform hover:scale-105 hover:-translate-y-1">
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Get Started, It's Free
            </span>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
          </Button>
        </Link>

        {/* Enhanced image with multiple effects */}
        <div className="relative group w-full max-w-2xl">
          {/* Image glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 scale-110"></div>
          
          {/* Main image container */}
          <div className="relative bg-gradient-to-br from-white/10 to-transparent p-1 rounded-3xl backdrop-blur-sm">
            <img 
              src="/landing.png" 
              alt="Travel" 
              className="w-full rounded-2xl shadow-2xl border-2 border-white/20 dark:border-gray-700/50 transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl" 
            />
            
            {/* Image overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Corner accent elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-pink-400/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300"></div>
          </div>
          
          {/* Floating elements around image */}
          <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-lg animate-float"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-lg animate-float delay-1000"></div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          .animate-fade-in-delay {
            animation: fade-in 1s ease-out 0.3s both;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </main>
      <Footer />
    </div>
  )
}

export default Hero