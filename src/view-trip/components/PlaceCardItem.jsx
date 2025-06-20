import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import WeatherWidget from "@/view-trip/components/WeatherWidget";

function PlaceCardItem({place}) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      place?.place && GetPlacePhoto();
  }, [place])

  const GetPlacePhoto = async () => {
      try {
          const data = {
              textQuery: `${place.place} tourist attraction`
          }
          const result = await GetPlaceDetails(data);
          setPhotoUrl(result.data.places[0].photos[0].name);
      } catch (error) {
          console.error('Error loading image:', error);
          setPhotoUrl('/placeholder.jpg');
      } finally {
          setLoading(false);
      }
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' +place?.place} target='_blank'>
    <div className='shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
        {loading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={photoUrl}
          alt={place?.place}
          className="w-full h-48 object-cover rounded-xl"
          onError={() => setPhotoUrl('/placeholder.jpg')}
        />
        <div>
            <h2 className='font-bold text-lg'>{place.place}</h2>
            <p className='text-sm text-gray-500'>{place.details}</p>
            {/* <h2>place.timetoTravel</h2> */}
            <h2 className='text-xs font-medium mt-2 mb-2'>🏷️Ticket: {place.ticket_pricing}</h2>
            {/* <Button size="sm"><FaMapLocationDot /></Button> */}
            <WeatherWidget lat={place.lat} lon={place.lon} />
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem