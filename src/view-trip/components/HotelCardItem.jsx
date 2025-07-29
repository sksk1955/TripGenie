import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (hotel?.name) {
            GetPlacePhoto();
        }
    }, [hotel]);

    const GetPlacePhoto = async () => {
        try {
            const data = {
                textQuery: `${hotel.name} hotel building`
            };
            const result = await GetPlaceDetails(data);
            if (result?.data?.places?.[0]?.photos?.[0]?.name) {
                setPhotoUrl(result.data.places[0].photos[0].name);
            }
        } catch (error) {
            console.error('Error loading hotel photo:', error);
        } finally {
            setLoading(false);
        }
    }

    // Parse rating to render stars
    const renderStars = (rating) => {
        const numRating = parseFloat(rating) || 0;
        const fullStars = Math.floor(numRating);
        const hasHalfStar = numRating % 1 !== 0;
        
        return (
            <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${
                        i < fullStars 
                            ? 'text-yellow-400' 
                            : i === fullStars && hasHalfStar 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'
                    }`}>
                        {i < fullStars ? '★' : i === fullStars && hasHalfStar ? '★' : '☆'}
                    </span>
                ))}
                <span className="text-xs text-gray-600 ml-1">({numRating})</span>
            </div>
        );
    };

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel?.name + "," + hotel?.address)} target='_blank' className="block group">
            <div className='relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden border border-gray-100 dark:border-gray-700 mt-5 mb-8'>
                {/* Image container with overlay effects */}
                <div className="relative overflow-hidden rounded-t-2xl">
                    {loading ? (
                        <div className="h-[200px] w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                        </div>
                    ) : (
                        <>
                            <img 
                                src={photoUrl} 
                                alt={hotel?.name}
                                className='h-[200px] w-full object-cover transition-transform duration-700 group-hover:scale-110'
                                onError={() => setPhotoUrl('/placeholder.jpg')}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Floating rating badge */}
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="flex items-center space-x-1">
                                    <span className="text-yellow-500 text-sm">★</span>
                                    <span className="text-xs font-semibold text-gray-800">{hotel?.rating || 'N/A'}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Content section */}
                <div className='p-5 space-y-3'>
                    {/* Hotel name with gradient hover effect */}
                    <h2 className='font-bold text-lg text-gray-800 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight'>
                        {hotel?.name}
                    </h2>
                    
                    {/* Address with icon */}
                    <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
                        <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-white text-xs">📍</span>
                        </div>
                        <p className='text-sm leading-relaxed'>{hotel?.address}</p>
                    </div>
                    
                    {/* Price and rating row */}
                    <div className="flex items-center justify-between pt-2">
                        {/* Price */}
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">💰</span>
                            </div>
                            <span className='text-sm font-semibold text-green-600 dark:text-green-400'>
                                {hotel?.price}
                            </span>
                        </div>
                        
                        {/* Rating stars */}
                        <div className="flex items-center">
                            {renderStars(hotel?.rating)}
                        </div>
                    </div>
                </div>

                {/* Hover overlay with "View on Maps" text */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 via-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-white font-medium text-sm">🗺️ View on Maps</span>
                    </div>
                </div>

                {/* Premium card indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
        </Link>
    );
}

export default HotelCardItem;