import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import ShareTripBar from "@/view-trip/components/ShareTripBar";
import TripMap from "@/view-trip/components/TripMap";

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([])

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

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />

            {/* Recommended Hotels */}
            <Hotels trip={trip} />

            {/* Daily Plan */}
            <PlacesToVisit trip={trip} />

            {/* Map Section */}
            <TripMap
                places={
                    Array.isArray(trip.tripData?.daily_itinerary)
                        ? trip.tripData.daily_itinerary
                            .map(p => {
                                // Try to parse coordinates safely
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
                        : []
                }
            />

            {/* Footer */}
            <Footer trip={trip} />
            <ShareTripBar />
        </div>
    )
}

export default Viewtrip