import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import { generateAIResponse } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from "firebase/firestore";
import { app, db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import PlacesAutocomplete from '@/components/PlacesAutocomplete';
import BudgetSlider from '@/components/BudgetSlider';
import { MapPin, Calendar, Users, Wallet } from 'lucide-react';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false)
  const [budgetPerDay, setBudgetPerDay] = useState(5000);
  const [destination, setDestination] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const onGenerateTrip = async () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        setOpenDialog(true);
        return;
      }

      if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
        toast.error('Please fill all the details');
        return;
      }

      if (formData.noOfDays > 30) {
        toast.error('Maximum trip duration is 30 days');
        return;
      }

      setLoading(true);

      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData.location.label)
        .replace('{totalDays}', formData.noOfDays)
        .replace('{traveler}', formData.traveler)
        .replace('{budget}', formData.budget);

      const responseText = await generateAIResponse(FINAL_PROMPT);
      
      if (!responseText) {
        throw new Error('No response from AI');
      }

      await SaveAiTrip(responseText);

    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error(error.message || 'Failed to generate trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  function optimizeItinerary(itinerary) {
    // Example: Group places within 5km and prioritize by 'significance' (add this property in AI response if possible)
    // This is a placeholder; for real use, integrate a geolocation library and significance scoring.
    return itinerary.sort((a, b) => (b.significance || 0) - (a.significance || 0));
  }

  const SaveAiTrip = async (tripData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const parsedData = JSON.parse(tripData);

      // Optimize itinerary
      if (parsedData.daily_itinerary) {
        parsedData.daily_itinerary = optimizeItinerary(parsedData.daily_itinerary);
      }

      if (!parsedData.hotel_options || !parsedData.daily_itinerary) {
        throw new Error('Invalid trip data format');
      }

      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedData,
        userEmail: user?.email,
        id: docId,
        createdAt: new Date().toISOString()
      });

      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Error saving trip. Please try again.');
    }
  };

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    })
    .then(response => response.json())
    .then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp));
      setOpenDialog(false);
      onGenerateTrip();
    })
    .catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-white text-gray-900 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-white transition-colors duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className='relative z-10 sm:px-10 md:px-32 lg:px-56 px-5 pt-10 pb-20'>
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl shadow-blue-500/25">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-300">
            Plan Your Dream Trip
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Tell us your travel preferences and our AI-powered planner will create a personalized itinerary just for you 🏕️🌴
          </p>
        </div>

        {/* Form Container */}
        <div className='max-w-4xl mx-auto'>
          <div className='backdrop-blur-xl bg-gray/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl'>
            <div className='space-y-12'>
              
              {/* Destination Section */}
              <div className='group'>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-300 transition-colors duration-300">
                    What is your destination of choice?
                  </h2>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 hover:border-blue-500/50 transition-all duration-300">
                  <PlacesAutocomplete
                    onSelect={(place) => {
                      setPlace(place);
                      handleInputChange('location', {
                        label: place.label,
                        coordinates: {
                          lat: place.value.lat,
                          lng: place.value.lng
                        }
                      });
                    }}
                  />
                </div>
              </div>

              {/* Duration Section */}
              <div className='group'>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className='text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-green-300 transition-colors duration-300'>
                    How many days are you planning your trip?
                  </h2>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 hover:border-green-500/50 transition-all duration-300">
                  <Input 
                    placeholder='Ex. 4' 
                    type='number' 
                    onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    className="bg-transparent border-0 text-blue-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 text-lg focus:ring-2 focus:ring-green-500/50 rounded-xl"
                  />
                </div>
              </div>

              {/* Budget Section */}
              <div className='group'>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <h2 className='text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-300 transition-colors duration-300'>
                    What is your budget per day?
                  </h2>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                  <BudgetSlider
                    value={budgetPerDay}
                    min={1000}
                    max={1000000}
                    onChange={val => {
                      setBudgetPerDay(val);
                      handleInputChange('budget', val);
                    }}
                  />
                  <div className="mt-4">
                    <input
                      type="number"
                      min={1000}
                      max={1000000}
                      value={budgetPerDay}
                      onChange={e => {
                        const val = Math.min(1000000, Math.max(1000, Number(e.target.value)));
                        setBudgetPerDay(val);
                        handleInputChange('budget', val);
                      }}
                      className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-3 w-full md:w-48 text-white placeholder-gray-400 focus:ring-2  focus:border-transparent transition-all duration-300"
                      placeholder="Enter custom budget"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Companions Section */}
              <div className='group'>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h2 className='text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-300 transition-colors duration-300'>
                    Who do you plan on traveling with?
                  </h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {SelectTravelList.map((item, index) => (
                    <div 
                      key={index}
                      onClick={() => handleInputChange('traveler', item.people)}
                      className={`group/card relative overflow-hidden p-6 border cursor-pointer rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                        formData?.traveler == item.people 
                          ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-blue-400/50 shadow-xl shadow-blue-500/20' 
                          : 'bg-slate-800/30 border-slate-700/50 hover:border-orange-500/50 hover:bg-slate-700/40'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-4xl mb-3 transform group-hover/card:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <h3 className='font-bold text-lg text-white mb-2 group-hover/card:text-orange-300 transition-colors duration-300'>
                          {item.title}
                        </h3>
                        <p className='text-sm text-gray-600 group-hover/card:text-gray-300 transition-colors duration-300'>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className='mt-12 flex justify-center'>
            <Button 
              disabled={loading} 
              onClick={onGenerateTrip}
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-semibold py-4 px-12 rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300 text-lg min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative z-10 flex items-center gap-3">
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className='h-6 w-6 animate-spin' />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Create Itinerary</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </>
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Dialog */}
      <Dialog open={openDialog}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-md mx-auto shadow-2xl">
          <DialogHeader>
            <DialogDescription className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                <img src="/logo.svg" alt="logo" className="w-12 h-12" />
              </div>
              <h2 className='font-bold text-2xl text-white mb-3'>
                Sign In to Continue
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Sign in with Google to access your personalized travel plans and save your preferences
              </p>
              <Button
                onClick={login}
                className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 rounded-2xl flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <FcGoogle className="w-6 h-6" />
                <span>Continue with Google</span>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip