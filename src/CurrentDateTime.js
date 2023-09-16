import React, { useState, useEffect } from "react";
import venkateswaraswamylogo from '../src/images/venkateswaraswamy.png';

import '../src/App.css'

function CurrentDateTime() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="current-date-time-container">
            <div className="scrolling-text">
            Current Date and Time: {currentDateTime.toLocaleString()} &nbsp;&nbsp;
            <img src={venkateswaraswamylogo} alt="logo" className="venkateswaraswamy"></img>&nbsp;&nbsp;
            Om Namo Venkateshaya &nbsp;&nbsp;
            <img src={venkateswaraswamylogo} alt="logo" className="venkateswaraswamy"></img>
            </div>
        </div>
    );
}

export default CurrentDateTime;
