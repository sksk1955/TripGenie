import React from "react";

function BuddyProfileModal({ buddy, onClose, onChat }) {
  if (!buddy) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fancy-glass p-8 w-full max-w-md mx-auto">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-primary" onClick={onClose}>×</button>
        <div className="flex flex-col items-center">
          <img src={buddy.profilePic} alt={buddy.name} className="w-24 h-24 rounded-full object-cover mb-4" />
          <h2 className="text-2xl font-bold text-primary">{buddy.name}</h2>
          <p className="text-gray-600 mb-2">{buddy.bio}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {buddy.interests.map(i => (
              <span key={i} className="bg-accent text-xs px-2 py-1 rounded-full">{i}</span>
            ))}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            <div>Email: {buddy.email}</div>
            {buddy.instagram && <div>Instagram: {buddy.instagram}</div>}
            {buddy.phone && <div>Phone: {buddy.phone}</div>}
          </div>
          <button
            className="bg-primary text-white px-6 py-2 rounded-full shadow hover:bg-secondary transition-all mt-4"
            onClick={() => onChat(buddy)}
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuddyProfileModal;