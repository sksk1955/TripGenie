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
        <div>
            {loading ? (
                <div className="h-[340px] w-full bg-gray-200 animate-pulse rounded-xl" />
            ) : (
                <img 
                    src={photoUrl} 
                    alt={trip?.userSelection?.location?.label || 'location'} 
                    className='h-[340px] w-full object-cover rounded-xl'
                    onError={() => setPhotoUrl('/placeholder.jpg')}
                />
            )}
            <div>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md '>
                            📅{trip?.userSelection?.noOfDays} Day
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                            💰{trip?.userSelection?.budget} Budget
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                            👥No. of traveler/s: {trip?.userSelection?.traveler}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection