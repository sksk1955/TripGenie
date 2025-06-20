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
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { app, db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import PlacesAutocomplete from '@/components/PlacesAutocomplete';
import BudgetSlider from '@/components/BudgetSlider';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false)
  const [budgetPerDay, setBudgetPerDay] = useState(5000);

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

      if (formData.noOfDays > 10) {
        toast.error('Maximum trip duration is 10 days');
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
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
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

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.4'} type='number' onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>


        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget Per Day?</h2>
          <BudgetSlider
            value={budgetPerDay}
            min={1000}
            max={1000000}
            onChange={val => {
              setBudgetPerDay(val);
              handleInputChange('budget', val);
            }}
          />
          <div className="mt-2">
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
              className="border rounded p-2 w-40"
              placeholder="Enter custom budget"
            />
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
        </Button>
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
  )
}

export default CreateTrip