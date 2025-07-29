import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        try {
            const data = {
                textQuery: trip.userSelection.location.label
            }
            const result = await GetPlaceDetails(data);
            if (result?.data?.places?.[0]?.photos?.[0]?.name) {
                setPhotoUrl(result.data.places[0].photos[0].name);
            }
        } catch (error) {
            console.error('Error loading photo:', error);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-bl from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-pink-200 to-orange-200 dark:from-pink-800/30 dark:to-orange-800/30 rounded-full blur-2xl opacity-30"></div>
            
            {/* Main image container with enhanced styling */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                {loading ? (
                    <div className="h-[340px] w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                        {/* Loading overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                            <div className="flex flex-col items-center space-y-3">
                                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-gray-600 dark:text-gray-400 font-medium">Loading destination...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <img 
                            src={photoUrl} 
                            alt={trip?.userSelection?.location?.label || 'location'} 
                            className='h-[340px] w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105'
                            onError={() => setPhotoUrl('/placeholder.jpg')}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Floating destination label */}
                        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <span className="text-gray-800 dark:text-white font-semibold text-sm">
                                📍 {trip?.userSelection?.location?.label}
                            </span>
                        </div>
                    </>
                )}
            </div>

            {/* Content section with enhanced styling */}
            <div className="relative z-10">
                <div className='my-8 flex flex-col gap-4'>
                    {/* Enhanced destination title */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-sm">✈️</span>
                        </div>
                        <h2 className='font-bold text-3xl bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400'>
                            {trip?.userSelection?.location?.label}
                        </h2>
                    </div>
                    
                    {/* Enhanced trip details with modern badges */}
                    <div className='flex flex-wrap gap-3 mt-4'>
                        {/* Days badge */}
                        <div className='group relative'>
                            <h2 className='p-3 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl text-blue-700 dark:text-blue-400 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default'>
                                <span className="mr-2">📅</span>
                                {trip?.userSelection?.noOfDays} Day{trip?.userSelection?.noOfDays > 1 ? 's' : ''}
                            </h2>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Budget badge */}
                        <div className='group relative'>
                            <h2 className='p-3 px-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-2xl text-green-700 dark:text-green-400 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default'>
                                <span className="mr-2">💰</span>
                                {trip?.userSelection?.budget} Budget
                            </h2>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Travelers badge */}
                        <div className='group relative'>
                            <h2 className='p-3 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-2xl text-purple-700 dark:text-purple-400 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default'>
                                <span className="mr-2">👥</span>
                                {trip?.userSelection?.traveler} Traveler{trip?.userSelection?.traveler > 1 ? 's' : ''}
                            </h2>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>

                    {/* Decorative separator */}
                    <div className="flex items-center justify-center mt-6 mb-2">
                        <div className="flex space-x-2 opacity-40">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection