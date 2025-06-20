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
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
    <header className="fancy-gradient p-4 shadow-lg">
      <div className="fancy-glass flex items-center justify-between px-6 py-3">
        <img src="/logo.svg" alt="Logo" />
        <div className='flex items-center gap-4'>
          {/* <LanguageSwitcher /> */}
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 bg-gray-200 hover:bg-gray-300"
            aria-label="Toggle dark mode"
          >
            <span role="img" aria-label="theme">🌓</span>
          </button>
          {user ?
            <div className='flex items-center gap-3'>
              <a href="/create-trip">
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
              </a>
              <a href="/my-trips">
              <Button variant="outline" className="rounded-full">My Trips</Button>
              </a>
              <a href="/travel-buddy/profile">
                <Button variant="outline" className="rounded-full">Travel Buddy Profile</Button>
              </a>
              <a href="/travel-buddy/discover">
                <Button variant="outline" className="rounded-full">Find Buddies</Button>
              </a>
              <Popover>
                <PopoverTrigger>             
                  <img src={user?.picture} alt="" className='h-[35px] w-[35px] rounded-full' />
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className='cursor-pointer' onClick={()=>{
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>Logout</h2>
                  <h2 className='cursor-pointer mt-2' onClick={()=>{
                    window.location.href = "/travel-buddy/profile";
                  }}>Edit Profile</h2>
                </PopoverContent>
              </Popover>
              <NotificationsButton currentUser={user} />

            </div> : <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>}
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="logo" width="100px" className='items-center' />
                <h2 className='font-bold text-lg'>Sign In to check out your travel plan</h2>
                <p>Sign in to the App with Google authentication securely</p>
                <Button
                  onClick={login}
                  className="w-full mt-6 flex gap-4 items-center">
                  <FcGoogle className="h-7 w-7" />Sign in With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
    </header>
  )
}

export default Header