import React, { useState } from 'react';
import axios from 'axios';

function FlightSearchForm() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    adults: 1,
    infants: 0,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { origin, destination, departureDate, adults, infants } = formData;

    const apiUrl = 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights/';

    try {
      const response = await axios.get(apiUrl, {
        params: {
          originEntityId: "27544008",
          destinationEntityId: "27537542",
          originSkyId: "", // You might need to map these to Sky Scrapper's specific IDs
          destinationSkyId: "NYCA",
          // ... other parameters based on your API requirements
          date: "2024-11-28",
          adults,
          infants,
          sortBy: 'best',
          currency: 'USD',
          market: 'en-US',
          countryCode: 'US',
        },
        headers: {
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
          'x-rapidapi-key': '8545130d9dmsha72607ea7389b3bp1a5b20jsna1c997c934f1' // Replace with your actual API key
        }
      });

      const data = response.data;
      console.log('Flight data:', data);
      // Handle the flight data as needed, e.g., display results, trigger further actions
    } catch (error) {
      console.error('Error fetching flight data:', error);
      // Handle errors, e.g., display error message to the user
    }
  };

  return (

    <>

      <form onSubmit={handleSubmit}>
        {/* ... form fields for origin, destination, departure date, adults, infants ... */}
        <button type="submit">Search Flights</button>
      </form>


    </>


  );
}

export default FlightSearchForm;