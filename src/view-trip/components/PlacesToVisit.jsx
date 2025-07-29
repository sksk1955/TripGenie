import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  if (!trip?.tripData?.daily_itinerary) {
    return null; // Or a loading state
  }

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -top-4 -right-8 w-24 h-24 bg-gradient-to-bl from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-2xl opacity-30"></div>
      
      {/* Header section with enhanced styling */}
      <div className="relative z-10 mb-10 mt-8">
        <div className="flex items-center space-x-3 mb-3">
          {/* Places icon with gradient background */}
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🗺️</span>
          </div>
          
          {/* Title with gradient text */}
          <h2 className='font-bold text-2xl bg-gradient-to-r from-gray-800 via-orange-600 to-red-600 bg-clip-text text-transparent dark:from-white dark:via-orange-400 dark:to-red-400'>
            Places to Visit
          </h2>
        </div>
        
        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-400 text-sm ml-13 font-medium">
          Discover amazing destinations on your journey
        </p>
        
        {/* Decorative line */}
        <div className="ml-13 mt-3 w-24 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {trip.tripData.daily_itinerary.map((item, index) => (
          <div key={index} className='mt-8 relative'>
            {/* Day header with enhanced styling */}
            <div className="flex items-center space-x-4 mb-6">
              {/* Day number badge */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                {/* Connecting line for next day */}
                {index < trip.tripData.daily_itinerary.length - 1 && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-blue-300 to-purple-300 opacity-40"></div>
                )}
              </div>
              
              {/* Day title */}
              <div className="flex-1">
                <h2 className='font-bold text-xl text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  {item.day}
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1"></div>
              </div>
            </div>

            {/* Places grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {item.plan ? item.plan.map((place, placeIndex) => (
                <div key={`${index}-${placeIndex}`} className='relative group'>
                  {/* Time badge with enhanced styling */}
                  <div className="mb-3 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white text-xs">🕐</span>
                    </div>
                    <h2 className='font-semibold text-sm text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-700'>
                      {place.time}
                    </h2>
                  </div>
                  
                  {/* Place card with connection indicator */}
                  <div className="relative">
                    <PlaceCardItem place={place}/>
                    {/* Connection line to next place */}
                    {placeIndex < item.plan.length - 1 && (
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-orange-300 to-red-300 opacity-30"></div>
                    )}
                  </div>
                </div>
              )) : (
                <div className='relative group'>
                  {/* Best time badge with enhanced styling */}
                  <div className="mb-3 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white text-xs">⏰</span>
                    </div>
                    <h2 className='font-semibold text-sm text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-700'>
                      {item.best_time_to_visit}
                    </h2>
                  </div>
                  
                  <PlaceCardItem place={{
                    place: item.place_name,
                    details: item.place_details,
                    ticket_pricing: item.ticket_pricing,
                    rating: item.rating,
                    time: item.estimated_time
                  }}/>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-12 flex justify-center">
        <div className="flex space-x-2 opacity-30">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  )
}

export default PlacesToVisit