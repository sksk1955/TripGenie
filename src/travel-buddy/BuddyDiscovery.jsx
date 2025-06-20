import React, { useEffect, useState } from 'react'
import { db } from '@/service/firebaseConfig'
import { collection, getDocs } from "firebase/firestore"
import BuddyProfileModal from './BuddyProfileModal'
import ChatModal from './ChatModal' // (see below)

function getBestMatch(currentUser, buddies) {
  if (!currentUser) return null;
  let best = null;
  let maxShared = 0;
  for (const buddy of buddies) {
    const shared = buddy.interests.filter(i => currentUser.interests.includes(i)).length;
    if (shared > maxShared) {
      maxShared = shared;
      best = buddy;
    }
  }
  return best;
}

function BuddyDiscovery({ currentUser }) {
  const [buddies, setBuddies] = useState([])
  const [showBest, setShowBest] = useState(false)
  const [selectedBuddy, setSelectedBuddy] = useState(null)
  const [chatBuddy, setChatBuddy] = useState(null)
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    const fetchBuddies = async () => {
      const querySnapshot = await getDocs(collection(db, "TravelBuddies"))
      const allBuddies = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        if (data.userId !== currentUser.userId) {
          allBuddies.push(data)
        }
      })
      setBuddies(allBuddies)
    }
    fetchBuddies()
  }, [currentUser])

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center text-gray-500">
        Please set up your <b>Travel Buddy Profile</b> first.
      </div>
    );
  }

  const bestMatch = getBestMatch(currentUser, buddies);

  const filteredBuddies = searchId
    ? buddies.filter(b => b.userId.toLowerCase().includes(searchId.toLowerCase()))
    : (showBest && bestMatch ? [bestMatch] : buddies);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">Find Your Travel Buddy</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by User ID"
            className="border rounded px-3 py-1"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded-full shadow hover:bg-secondary transition-all"
            onClick={() => setShowBest(!showBest)}
          >
            {showBest ? "Show All" : "Find Best Match"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBuddies.map(buddy => (
          <div
            key={buddy.userId}
            className="cursor-pointer bg-white rounded-xl shadow p-6 flex gap-4 items-center hover:shadow-2xl transition-all"
            onClick={() => setSelectedBuddy(buddy)}
          >
            <img src={buddy.profilePic} alt={buddy.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{buddy.name}</h3>
                <span className="text-xs text-gray-400">({buddy.userId})</span>
              </div>
              <p className="text-gray-500 mb-1">{buddy.bio?.split(" ").slice(0, 15).join(" ")}...</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {buddy.interests.map(i => (
                  <span key={i} className="bg-accent text-xs px-2 py-1 rounded-full">{i}</span>
                ))}
              </div>
              {showBest && bestMatch && buddy.userId === bestMatch.userId && (
                <div className="mt-2 text-green-600 font-bold">Best Match!</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedBuddy && (
        <BuddyProfileModal
          buddy={selectedBuddy}
          onClose={() => setSelectedBuddy(null)}
          onChat={buddy => {
            setChatBuddy(buddy);
            setSelectedBuddy(null);
          }}
        />
      )}
      {chatBuddy && (
        <ChatModal
          currentUser={currentUser}
          buddy={chatBuddy}
          onClose={() => setChatBuddy(null)}
        />
      )}
      {buddies.length === 0 && (
        <div className="text-gray-400 mt-8 text-center">No other buddies found yet.</div>
      )}
    </div>
  )
}

export default BuddyDiscovery