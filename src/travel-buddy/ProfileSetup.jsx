import React, { useState, useEffect } from 'react'
import { db } from '@/service/firebaseConfig'
import { doc, setDoc } from "firebase/firestore"
import { toast } from 'sonner'
import { nanoid } from "nanoid"; // npm install nanoid

const INTEREST_OPTIONS = [
  "Beach", "Mountains", "Adventure", "Culture", "Food", "Wildlife", "Road Trips", "Luxury", "Budget", "Backpacking"
]

function ProfileSetup({ user }) {
  const [bio, setBio] = useState('')
  const [description, setDescription] = useState('');
  const [interests, setInterests] = useState([])
  const [customInterest, setCustomInterest] = useState('')
  const [email, setEmail] = useState(user?.email || '')
  const [instagram, setInstagram] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(
    user?.userId?.slice(0, 15) ||
    user?.id?.slice(0, 15) ||
    Math.random().toString().slice(2, 17)
  );
  const [profilePic, setProfilePic] = useState(user?.picture || "");
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('travelBuddyProfile');
    if (stored) {
      setProfile(JSON.parse(stored));
      setEditing(false);
    } else {
      setEditing(true);
    }
  }, []);

  const handleInterestToggle = (interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleAddCustomInterest = () => {
    const tag = customInterest.trim()
    if (tag && !interests.includes(tag)) {
      setInterests([...interests, tag])
      setCustomInterest('')
    }
  }

  const handlePicChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setProfilePic(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const canSave =
    email.trim() &&
    (instagram.trim() || phone.trim()) &&
    interests.length > 0

  const handleSave = async () => {
    if (!canSave) return
    setLoading(true)
    try {
      const profile = {
        userId,
        name: user.name,
        email,
        profilePic: user.picture,
        interests,
        bio,
        instagram: instagram.trim(),
        phone: phone.trim(),
        upcomingTrips: []
      }
      await setDoc(doc(db, "TravelBuddies", user.id), profile)
      localStorage.setItem('travelBuddyProfile', JSON.stringify(profile))
      toast.success("Profile saved!")
      window.location.href = "/travel-buddy/discover"
    } catch (e) {
      toast.error("Error saving profile")
    }
    setLoading(false)
  }

  if (!editing && profile) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
        <div className="flex items-center gap-4 mb-4">
          <img src={profile.profilePic} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          <div>
            <h2 className="text-2xl font-bold text-primary">{profile.name}</h2>
            <div className="text-xs text-gray-400">User ID: {profile.userId}</div>
          </div>
        </div>
        <div className="mb-2"><b>Bio:</b> {profile.bio}</div>
        <div className="mb-2"><b>Description:</b> {profile.description}</div>
        <div className="mb-2"><b>Email:</b> {profile.email}</div>
        <div className="mb-2"><b>Instagram:</b> {profile.instagram}</div>
        <div className="mb-2"><b>Phone:</b> {profile.phone}</div>
        <div className="mb-2"><b>Interests:</b> {profile.interests.join(", ")}</div>
        <button
          className="bg-secondary text-white px-6 py-2 rounded-full shadow hover:bg-primary transition-all mt-4"
          onClick={() => setEditing(true)}
        >
          Edit Profile
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-primary">Set Up Your Travel Buddy Profile</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Email <span className="text-red-500">*</span></label>
        <input
          type="email"
          className="w-full border rounded p-2 mb-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Instagram</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={instagram}
            onChange={e => setInstagram(e.target.value)}
            placeholder="e.g. @yourhandle"
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="tel"
            className="w-full border rounded p-2"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="e.g. +91XXXXXXXXXX"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Bio</label>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Short bio (max 20 words)"
          value={bio}
          onChange={e => setBio(e.target.value.split(" ").slice(0, 20).join(" "))}
        />
        <textarea
          className="w-full border rounded p-2 mt-2"
          placeholder="Detailed description (max 100 words)"
          value={description}
          onChange={e => setDescription(e.target.value.split(" ").slice(0, 100).join(" "))}
        />
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Your Interests <span className="text-red-500">*</span></h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {INTEREST_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              className={`px-4 py-2 rounded-full border ${interests.includes(opt) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => handleInterestToggle(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="border rounded p-2 flex-1"
            placeholder="Add your own interest"
            value={customInterest}
            onChange={e => setCustomInterest(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomInterest(); } }}
          />
          <button
            type="button"
            className="bg-accent text-white px-4 py-2 rounded-full"
            onClick={handleAddCustomInterest}
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {interests.map(i => (
            <span key={i} className="bg-secondary text-xs px-2 py-1 rounded-full flex items-center gap-1">
              {i}
              <button
                type="button"
                className="ml-1 text-red-500"
                onClick={() => handleInterestToggle(i)}
                title="Remove"
              >×</button>
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Profile Picture</label>
        <input type="file" accept="image/*" onChange={handlePicChange} />
        {profilePic && <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full mt-2 object-cover" />}
      </div>
      <button
        className={`bg-secondary text-white px-6 py-2 rounded-full shadow hover:bg-primary transition-all w-full mt-4 ${!canSave ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleSave}
        disabled={!canSave || loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
      <div className="text-xs text-gray-400 mt-2">
        * Email and at least one of Instagram or Phone is required. <br />
        * Add at least one interest.
      </div>
    </div>
  )
}

export default ProfileSetup