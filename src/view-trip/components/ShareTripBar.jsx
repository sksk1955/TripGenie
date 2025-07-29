import React from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

function ShareTripBar() {
  const { tripId } = useParams();
  const shareUrl = `${window.location.origin}/view-trip/${tripId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Trip link copied!");
  };

  const handleDownloadPDF = () => {
    window.print(); // For MVP, use browser print to PDF
  };

  return (
    <div className="relative flex gap-4 my-6 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg backdrop-blur-sm">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
      
      {/* Enhanced Share Link Button */}
      <Button 
        onClick={handleCopy} 
        className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 border-0 overflow-hidden"
      >
        {/* Button background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Button content */}
        <div className="relative flex items-center gap-2">
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span>Share Link</span>
        </div>
      </Button>

      {/* Enhanced Download PDF Button */}
      <Button 
        onClick={handleDownloadPDF} 
        className="relative group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 border-0 overflow-hidden"
      >
        {/* Button background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Button content */}
        <div className="relative flex items-center gap-2">
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download PDF</span>
        </div>
      </Button>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl opacity-60"></div>
    </div>
  );
}

export default ShareTripBar;