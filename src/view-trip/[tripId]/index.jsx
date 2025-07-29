import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from "@/components/Footer";
import ShareTripBar from "@/view-trip/components/ShareTripBar";
import WeatherWidget from '../components/WeatherWidget';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        tripId && GetTripData()
    }, [tripId])

    // used to get trip info from firebase
    const GetTripData = async () => {
        try {
            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (!data.tripData?.hotel_options || !data.tripData?.daily_itinerary) {
                    toast.error("Invalid trip data format");
                    return;
                }
                setTrip(data);
            } else {
                toast.error("No trip found");
            }
        } catch (error) {
            console.error('Error fetching trip:', error);
            toast.error("Error loading trip");
        }
    }

    // Prepare places array
    const places = Array.isArray(trip?.tripData?.daily_itinerary)
        ? trip.tripData.daily_itinerary
            .map(p => {
                if (!p.geo_coordinates) return null;
                const [latStr, lonStr] = p.geo_coordinates.split(",");
                const lat = parseFloat(latStr);
                const lon = parseFloat(lonStr);
                if (isNaN(lat) || isNaN(lon)) return null;
                return {
                    name: p.place_name,
                    lat,
                    lon
                };
            })
            .filter(Boolean)
        : [];

    // Get main location coordinates
    const mainLat = trip?.userSelection?.location?.coordinates?.lat;
    const mainLon = trip?.userSelection?.location?.coordinates?.lng;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-white text-gray-900 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white transition-colors duration-500 flex flex-col">
            <div className="p-6 md:p-10 lg:px-44 xl:px-56 flex-1">
                {/* Information Section */}
                <InfoSection trip={trip} />

                {/* --- Add this: Week Weather Forecast for Main Location --- */}
                {mainLat && mainLon && (
                    <div className="my-8">
                        <h2 className="font-bold text-xl mb-4 text-blue-300">7-Day Weather Forecast</h2>
                        <WeatherWidget lat={mainLat} lon={mainLon} />
                    </div>
                )}

                {/* Recommended Hotels */}
                <Hotels trip={trip} />

                {/* Daily Plan */}
                <PlacesToVisit trip={trip} />

                {/* Footer */}
                <Footer trip={trip} />
                <ShareTripBar />
            </div>
        </div>
    )
}

export default Viewtrip