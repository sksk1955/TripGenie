import { useEffect, useState } from 'react'
import './App.css'
import Hero from './components/custom/Hero'
import ChatBotButton from "@/components/ChatBotButton";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem('travelBuddyProfile');
    if (!profile && location.pathname !== '/travel-buddy/profile') {
      navigate('/travel-buddy/profile');
    }
  }, [location, navigate]);

  return (
    <>
      {/* Hero */}
      <Hero/>
      <ChatBotButton />
    </>
  )
}

export default App
