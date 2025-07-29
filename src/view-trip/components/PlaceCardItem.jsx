import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

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
  <Link to={'https://www.google.com/maps/search/?api=1&query=' +place?.place} target='_blank' className="block group">
    <div className='relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 rounded-2xl p-6 mt-4 flex flex-col gap-6 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer transition-all duration-500 ease-out overflow-visible min-h-[220px]'>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Enhanced image container */}
      <div className="relative w-full h-48 flex-shrink-0 overflow-hidden rounded-xl shadow-md mb-4">
        {loading && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                {/* Loading icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        )}
        <img
            src={photoUrl}
            alt={place?.place}
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
            onError={() => setPhotoUrl('/placeholder.jpg')}
        />
        
        {/* Image overlay with map icon */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <FaMapLocationDot className="text-blue-600 text-sm" />
            </div>
        </div>
      </div>

      {/* Enhanced content section */}
      <div className="flex-1 flex flex-col justify-between relative z-10 py-1">
        {/* Title and description */}
        <div className="space-y-3">
          <h2 className='font-bold text-xl text-gray-800 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight'>
            {place.place}
          </h2>
          <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
            {place.details}
          </p>
        </div>

        {/* Ticket pricing with enhanced styling */}
        <div className="space-y-4 mt-4">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs">🏷️</span>
                </div>
                <h2 className='text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-200 dark:border-green-700'>
                    Ticket: {place.ticket_pricing}
                </h2>
            </div>

            
        </div>
      </div>

      {/* Hover state indicator */}
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
      
      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  </Link>
  )
}

export default PlaceCardItem