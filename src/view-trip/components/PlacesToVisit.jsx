import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  if (!trip?.tripData?.daily_itinerary) {
    return null; // Or a loading state
  }

  return (
    <div>
        <h2 className='font-bold text-xl'>Places to Visit</h2>
        <div>
            {trip.tripData.daily_itinerary.map((item, index) => (
                <div key={index} className='mt-5'>
                    <h2 className='font-bold text-lg'>{item.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                        {item.plan ? item.plan.map((place, placeIndex) => (
                            <div key={`${index}-${placeIndex}`} className='my-2'>
                                <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                                <PlaceCardItem place={place}/>
                            </div>
                        )) : (
                            <div className='my-2'>
                                <h2 className='font-medium text-sm text-orange-600'>{item.best_time_to_visit}</h2>
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
    </div>
  )
}

export default PlacesToVisit