import React, { useState, useEffect } from 'react';
import axios from 'axios';


import MyComponent from './Test';
import './App.css'






function App() {



  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const [selectedOption, setSelectedOption] = useState('option1'); // Initial selected option
  const [selectedOption2, setSelectedOption2] = useState('option2');
  const [showPanel, setShowPanel] = useState(false);
  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(0);
  const [total, setTotal] = useState(1); // Initial total is 1 (initial value of adults)

  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  const handleChange2 = (event) => {
    setSelectedOption2(event.target.value);

  };


  const handleToggle = () => {
    setShowPanel(!showPanel);
  };

  const handleAdultIncrement = () => {
    setAdults(adults + 1);
  };

  const handleAdultDecrement = () => {
    setAdults(Math.max(0, adults - 1));
  };

  const handleInfantIncrement = () => {
    setInfants(infants + 1);
  };

  const handleInfantDecrement = () => {
    setInfants(Math.max(0, infants - 1));
  };



  useEffect(() => {
    setTotal(adults + infants);
  }, [adults, infants]);


  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    adults: 1,
    infants: 0,
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    const
      { origin, destination, departureDate, adults, infants } = formData;

    const apiUrl = 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights';

    try {
      const response = await axios.get(apiUrl, {
        params: {
          originSkyId: "LON",
          destinationSkyId: destination,
          departureDate,
          adults: adults,
          infants: infants,
        },
        headers: {
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
          'x-rapidapi-key': '8545130d9dmsha72607ea7389b3bp1a5b20jsna1c997c934f1' // Replace with your actual API key
        }
      });
      console.log(formData)
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


      <div className='first-section'>

        <p className='flights'>
          Flights
        </p>

      </div>

      <form onSubmit={handleSubmit}>


        <div className='search-input'>


          <div className='search-input-one'>


            <div>

              <select
                className="input-one"
                value={selectedOption}
                onChange={handleChange}>
                <option
                  value="option1">Round Trip</option>
                <option value="option2">One way</option>
                <option value="option3">Multi way</option>
              </select>
              {/* <p>Selected Option: {selectedOption}</p> */}

            </div>

            <div>

              <p className='number-of-passengers' style={{ display: "inline" }} onClick={handleToggle}> {total} </p>

              {/* <input className='number-of-passengers' value={total} onClick={handleToggle} contentEditable="false" /> */}
              {showPanel && (
                <div>
                  <div>
                    <label>Adults:</label>
                    <button onClick={handleAdultDecrement}>-</button>
                    <input className='click-add' type="number" value={adults} onChange={(e) => setAdults(Math.max(0, parseInt(e.target.value)))} />
                    <button onClick={handleAdultIncrement}>+</button>
                  </div>
                  <div>
                    <label>Infants:</label>
                    <button onClick={handleInfantDecrement}>-</button>
                    <input className='click-add' type="number" value={infants} onChange={(e) => setInfants(Math.max(0, parseInt(e.target.value)))} />
                    <button onClick={handleInfantIncrement}>+</button>
                  </div>
                </div>
              )}
              {/* <MyComponent /> */}


            </div>

            <div>


              <select
                className="input-two"
                value={selectedOption2}
                onChange={handleChange2}>
                <option value="optionA">Option A</option>
                <option value="optionB">Option B</option>
                <option value="optionC">Option C</option>
              </select>


            </div>

          </div>






          <div className='search-input-two' >


            <input className='whereto-and-date' placeholder='From' />
            <input className='whereto-and-date' placeholder='T' />
            <input className='whereto-and-date' placeholder='Front' type='date' />


          </div>
          <button type="submit">Submit</button>




        </div>







      </form>

    </>
  )
}

export default App
