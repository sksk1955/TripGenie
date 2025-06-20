import axios from "axios";

export const GetPlaceDetails = async (data) => {
  try {
    if (!import.meta.env.VITE_UNSPLASH_ACCESS_KEY) {
      console.warn('Missing Unsplash API key');
      return {
        data: {
          places: [{
            photos: [{
              name: '/placeholder.jpg'
            }]
          }]
        }
      };
    }

    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: data.textQuery,
        per_page: 4,
        orientation: 'landscape'
      },
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      }
    });

    if (!response.data?.results?.length) {
      throw new Error('No images found');
    }

    return {
      data: {
        places: [{
          photos: response.data.results.map(result => ({
            name: result.urls.regular
          }))
        }]
      }
    };
  } catch (error) {
    console.error('Error fetching place details:', error);
    return {
      data: {
        places: [{
          photos: [{
            name: '/placeholder.jpg'
          }]
        }]
      }
    };
  }
};

export const PHOTO_REF_URL = '{NAME}';