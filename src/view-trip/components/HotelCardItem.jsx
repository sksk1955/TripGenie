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

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel?.name + "," + hotel?.address)} target='_blank'>
            <div className='hover:scale-110 transition-all cursor-pointer mt-5 mb-8'>
                {loading ? (
                    <div className="h-[180px] w-full bg-gray-200 animate-pulse rounded-xl" />
                ) : (
                    <img 
                        src={photoUrl} 
                        alt={hotel?.name}
                        className='rounded-xl h-[180px] w-full object-cover'
                        onError={() => setPhotoUrl('/placeholder.jpg')}
                    />
                )}
                <div className='my-2'>
                    <h2 className='font-medium'>{hotel?.name}</h2>
                    <h2 className='text-xs text-gray-500'>📍{hotel?.address}</h2>
                    <h2 className='text-sm'>💰{hotel?.price}</h2>
                    <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;