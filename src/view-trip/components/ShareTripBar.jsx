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
    <div className="flex gap-4 my-4">
      <Button onClick={handleCopy} className="bg-secondary text-white rounded-full shadow hover:bg-primary">
        Share Link
      </Button>
      <Button onClick={handleDownloadPDF} className="bg-accent text-white rounded-full shadow hover:bg-primary">
        Download PDF
      </Button>
    </div>
  );
}

export default ShareTripBar;