export const SelectTravelList = [
    {
        id:1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people:'1 person'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people:'2 people'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget',
        desc: 'Under ₹5000/day',
        icon: '💰',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: '₹5000-₹15000/day',
        icon: '💰💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Above ₹15000/day',
        icon: '💸',
    }
]

export const AI_PROMPT = `Generate a detailed travel plan for Location: {location}, Duration: {totalDays} Days, Travelers: {traveler}, Budget: ₹{budget} per day.

Provide the response in the following JSON format:
{
  "hotel_options": [
    {
      "hotel_name": "Example Hotel",
      "hotel_address": "Full address",
      "price_range": "₹XXXX - ₹XXXX per night",
      "rating": "X.X stars",
      "description": "Detailed description",
      "geo_coordinates": "XX.XXXX° N/S, XX.XXXX° E/W"
    }
  ],
  "daily_itinerary": [
    {
      "day": "Day X",
      "place_name": "Place name",
      "place_details": "Detailed description",
      "best_time_to_visit": "Morning/Afternoon/Evening",
      "ticket_pricing": "₹XXX per person or Free",
      "estimated_time": "X-X hours",
      "rating": "X.X stars",
      "geo_coordinates": "XX.XXXX° N/S, XX.XXXX° E/W"
    }
  ]
}

Ensure all prices are in Indian Rupees (₹).`;