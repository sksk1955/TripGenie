import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
    if (!trip?.tripData?.hotel_options) {
        return null;
    }

    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl-grid-cols-4 gap-5'>
                {trip.tripData.hotel_options.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={{
                        name: hotel.hotel_name || hotel.name,
                        address: hotel.hotel_address || hotel.address,
                        price: hotel.price_range || hotel.price,
                        rating: hotel.rating,
                        description: hotel.description
                    }} />
                ))}
            </div>
        </div>
    )
}

export default Hotels