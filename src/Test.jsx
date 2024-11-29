import React, { useState, useEffect } from 'react';

function MyComponent() {
    const [showPanel, setShowPanel] = useState(false);
    const [adults, setAdults] = useState(1);
    const [infants, setInfants] = useState(0);
    const [total, setTotal] = useState(1); // Initial total is 1 (initial value of adults)


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

    return (
        <>
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
        </>
    );
}

export default MyComponent;