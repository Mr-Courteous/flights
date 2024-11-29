import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Sample(props) {
    return (
        <div className="card">
            <a style={{ textDecoration: 'none', fontSize: '20px', }} href={props.location}>
                {/* <img className="projects-image" src={props.img} alt="project" /> */}
                <h3 className="toFro"> FROM:{props.from}  AIRPOT {props.airpotFROM}</h3>
                <h3 className="toFro"> TO:{props.to} AIRPOT {props.airpotTo}</h3>



                <p className="project-description">{props.arrivalTime}</p>
            </a>
        </div>
    );
}

// const apiKey = process.env.ApiKey;

function FetchFlightData() {
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        date: '',
        // type:'',
        // type2: '',
    }); // State for form inputs (origin and destination)

    const [flightDataRes, setFlightDataRes] = useState(null); // State to store flight data
    const [error, setError] = useState(null); // State to store any errors
    // const [origin1, setOrigin1] = useState(''); // State to store flight data
    // const [destination1, setDestination1] = useState(''); // State to store flight data





    const [selectedOption, setSelectedOption] = useState('Economy'); // Initial selected option
    const [selectedOption2, setSelectedOption2] = useState('option2');
    const [showPanel, setShowPanel] = useState(false);
    const [adults, setAdults] = useState(1);
    const [infants, setInfants] = useState(0);
    const [total, setTotal] = useState(1); // Initial total is 1 (initial value of adults)
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(null);





    const handleChange1 = (event) => {
        setSelectedOption(event.target.value);
    };

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





    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setIsLoading(true)
        try {
            const { origin, destination } = formData; // Destructure form data

            // Fetch airport data (combined logic for both searches)
            const airportResponse = await fetch(
                `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${origin}&locale=en-US`,
                {
                    headers: {
                        // 'x-rapidapi-key': '8545130d9dmsha72607ea7389b3bp1a5b20jsna1c997c934f1',
                        'x-rapidapi-key': " 51d3b8a827msh5b1afc2b1d13e6fp1b9b6ajsne9f17c319f5b",

                        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
                    },
                }
            );
            const airportData = await airportResponse.json();
            const originEntity = airportData.data[0].entityId;
            // setOrigin1(originEntity)

            const airportResponse2 = await fetch(
                `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${destination}&locale=en-US`,
                {
                    headers: {
                        // 'x-rapidapi-key': '8545130d9dmsha72607ea7389b3bp1a5b20jsna1c997c934f1',

                        'x-rapidapi-key':  "51d3b8a827msh5b1afc2b1d13e6fp1b9b6ajsne9f17c319f5b",

                        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
                    },
                }
            );
            const airportData2 = await airportResponse2.json();
            const destinationEntity = airportData2.data[0].entityId;
            // setDestination1(destinationEntity)

            // Fetch flight data with extracted airport IDs
            const apiUrl = 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights/';
            const flightResponse = await axios.get(apiUrl, {
                params: {
                    originEntityId: originEntity,
                    destinationEntityId: destinationEntity,
                    originSkyId: origin,
                    destinationSkyId: destination,
                    date: formData.date,
                    adults: adults,
                    infants: infants,
                    sortBy: 'best',
                    currency: 'USD',
                    // market: 'en-US',
                    // countryCode: 'US',
                    // ... other parameters based on your API requirements
                },
                headers: {
                    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
                    'x-rapidapi-key': " 51d3b8a827msh5b1afc2b1d13e6fp1b9b6ajsne9f17c319f5b",

                    // 'x-rapidapi-key': '8545130d9dmsha72607ea7389b3bp1a5b20jsna1c997c934f1',
                },
            });

            const flightDataR = flightResponse.data.data.itineraries;
            setFlightDataRes(flightDataR);
            console.log(flightDataR)
            // console.log(originEntity, destinationEntity)
            // console.log(origin1, destination1)
            console.log(origin, destination, selectedOption, selectedOption2, adults, infants, formData.date)
            setIsLoading(false)

        } catch (error) {
            setError(error);
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>


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
                                name='type'
                                id='type'
                                onChange={handleChange1}
                            >
                                <option value="Economy">Economy</option>
                                <option value="Premium Economy">Premium Economy</option>
                                <option value="Premium Economy Plus">Premium Economy Plus</option>
                                <option value="Business">Business</option>
                                <option value="First">First</option>
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
                        {/* 
                        <div>


                            <select
                                className="input-two"
                                name='type2'
                                id='type2'
                                value={selectedOption2}
                                onChange={handleChange2}>
                                <option value="1">Option A</option>
                                <option value="2">Option B</option>
                                <option value="3">Option C</option>
                            </select>


                        </div> */}

                    </div>






                    <div className='search-input-two' >

                        <input
                            className='whereto-and-date'
                            type="text"
                            id="origin"
                            name="origin"
                            value={formData.origin}
                            onChange={handleChange}
                            placeholder="Enter origin city or airport code"
                        />

                        <input
                            className='whereto-and-date'
                            type="text"
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            placeholder="Enter destination city or airport code"
                        />

                        <input
                            className='whereto-and-date'
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />





                    </div>

                    <div className='submit-button'>
                        <button style={{
                            backgroundColor: "blue",
                            color: "white",
                            border: "none",
                            padding: "15px",
                            borderRadius: "5px",
                            fontSize: "15px"


                        }} type="submit">Submit</button>

                    </div>




                </div>







            </form>


            {isLoading && <p>Loading flights... Please wait</p>}
            {error && <p>Error: {error}</p>}
            {flightDataRes && (
                <div>

                    {/* <p>
                        {flightDataRes.timestamp}
                    </p>
           

                    <p>
                        {flightDataRes.timestamp}
                    </p> */}


                    <div className='props'>
                        {error && <p>Error: {error.message}</p>}
                        {flightDataRes.length > 0 && (
                            <ul className='props-list'>
                                {flightDataRes.map((flightDataRes) => (
                                    <Sample
                                        // img={flightDataRes}
                                        from={flightDataRes.legs[0].origin.country}
                                        airpotFROM={flightDataRes.legs[0].origin.name}
                                        airpotTo={flightDataRes.legs[0].destination.name}

                                        to={flightDataRes.legs[0].destination.country}

                                        arrivalTime={flightDataRes.legs[0].arrival}
                                    // location={flightDataRes.location}
                                    />))}
                            </ul>
                        )}
                        {/* {flights.length === 0 && !isLoading && <p>No flights found.</p>} */}
                    </div>

                </div>


            )}




        </div>

    );
}

export default FetchFlightData;