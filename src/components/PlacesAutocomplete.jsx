import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { searchPlaces } from '../service/PlacesService';

const PlacesAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create a memoized debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery.length > 2) {
        setLoading(true);
        try {
          const results = await searchPlaces(searchQuery);
          setSuggestions(results);
        } catch (error) {
          console.error('Search error:', error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 1000),
    [] // Empty dependencies array since this function doesn't depend on any props or state
  );

  // Handle input changes
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a place..."
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
      
      {loading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(suggestion);
                setQuery(suggestion.label);
                setSuggestions([]);
              }}
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;