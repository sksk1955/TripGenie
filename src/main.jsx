import './i18n'; // <-- Make sure this is at the top
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from './components/custom/Header.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips/index.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Add these imports:
import ProfileSetup from './travel-buddy/ProfileSetup.jsx'
import BuddyDiscovery from './travel-buddy/BuddyDiscovery.jsx'

// Update your router:
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
  {
    path: '/view-trip/:tripId',
    element: <Viewtrip />
  },
  {
    path: '/my-trips',
    element: <MyTrips />
  },
  // Add these routes for Travel Buddy:
  {
    path: '/travel-buddy/profile',
    element: <ProfileSetup user={JSON.parse(localStorage.getItem('user'))} />
  },
  {
    path: '/travel-buddy/discover',
    element: <BuddyDiscovery currentUser={JSON.parse(localStorage.getItem('travelBuddyProfile') || 'null')} />
  }
]);

useEffect(() => {
  AOS.init({ once: true });
}, []);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Header />
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

<section className="fancy-gradient min-h-[300px] py-12">
  <div className="container mx-auto fancy-glass p-8">
    {/* Section content */}
  </div>
</section>
