import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
    if (!trip?.tripData?.hotel_options) {
        return null;
    }

    return (
        <div className="relative">
            {/* Background decoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -top-2 -right-8 w-32 h-32 bg-gradient-to-bl from-pink-100 to-orange-100 dark:from-pink-900/20 dark:to-orange-900/20 rounded-full blur-3xl opacity-30"></div>
            
            {/* Header section with enhanced styling */}
            <div className="relative z-10 mb-8 mt-12">
                <div className="flex items-center space-x-3 mb-2">
                    {/* Hotel icon with gradient background */}
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-lg">🏨</span>
                    </div>
                    
                    {/* Title with gradient text */}
                    <h2 className='font-bold text-2xl bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400'>
                        Hotel Recommendations
                    </h2>
                </div>
                
                {/* Subtitle */}
                <p className="text-gray-600 dark:text-gray-400 text-sm ml-13 font-medium">
                    Handpicked accommodations for your perfect stay
                </p>
                
                {/* Decorative line */}
                <div className="ml-13 mt-3 w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            {/* Grid container with enhanced spacing */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10'>
                {trip.tripData.hotel_options.map((hotel, index) => (
                    <div key={index} className="group">
                        {/* Card number indicator */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        
                        <HotelCardItem hotel={{
                            name: hotel.hotel_name || hotel.name,
                            address: hotel.hotel_address || hotel.address,
                            price: hotel.price_range || hotel.price,
                            rating: hotel.rating,
                            description: hotel.description
                        }} />
                    </div>
                ))}
            </div>

            {/* Bottom decoration */}
            <div className="mt-8 flex justify-center">
                <div className="flex space-x-2 opacity-30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
            </div>
        </div>
    )
}

export default Hotels