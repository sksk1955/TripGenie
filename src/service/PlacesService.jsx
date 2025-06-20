// Since Nominatim has API rate limits, let's use a simple fetch approach
export const searchPlaces = async (query) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
    );
    const results = await response.json();

    // Transform results to match expected format
    return results.map(place => ({
      label: place.display_name,
      value: {
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        displayName: place.display_name
      }
    }));
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
};