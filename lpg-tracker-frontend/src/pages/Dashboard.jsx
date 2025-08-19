import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [cylinderCount, setCylinderCount] = useState('');
  const [lastBookedDate, setLastBookedDate] = useState('');
  const [frequency, setFrequency] = useState(45);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const trimmedCount = cylinderCount.trim();
    const trimmedDate = lastBookedDate.trim();
    const trimmedfreq = frequency.toString().trim();

    // Need to write the handle submit function here.
    if(!userId){
      alert("User not logged in");
      navigate('/login');
      return;
    }

    const bookingData = {
      userId : userId,
      cylinderCount : trimmedCount,
      lastBookedDate : trimmedDate,
      frequency : trimmedfreq || 45
    };

    try{
      const response = await axios.post('http://localhost:5000/api/submit', bookingData);
      console.log('Booking succesful',response.data);
      alert('Booking Successful');
      navigate('/');


    }
    catch(error){
      console.error("Booking failed:", error.response.data?.message || error.message);
      alert(error.response?.data?.message || 'Booking Failed. Please try again');
    }
    setCylinderCount("");
    setFrequency("");
    setLastBookedDate("");

  };
  return (
    <div>
      <h2>Book your Cylinder</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Cylinder Count">Cylinder Count: </label>
          
          <input
            type="text"
            placeholder="Enter cylinder count"
            id="countBox"
            value={cylinderCount}
            onChange={(e) => setCylinderCount(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label htmlFor="Last Booked Date">Last Booked Date: </label>
          
          <input type="date" 
          placeholder="Last booked Date" 
          id="dateBox" 
          value={lastBookedDate && lastBookedDate.split("T")[0]}
          onChange={(e) => setLastBookedDate(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label htmlFor="Remainder Frequency">Remainder Frequency: </label>
          
          <input type="text" 
          placeholder="Default is 45 days. Enter to change" 
          id="freqBox" 
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          />
        </div>

        <br />

        <div>
          <button type="submit">Submit</button>
        </div>

        
      </form>
    </div>
  );
}
