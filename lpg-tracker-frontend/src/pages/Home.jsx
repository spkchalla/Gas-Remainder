import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Home() {

  const userId = localStorage.getItem('userId');

  const [cylinderCount, setCylinderCount] = useState('');
  const [lastBookedDate, setLastBookedDate] = useState('');
  const [frequency, setFrequency] = useState(45);
  const navigate = useNavigate();
   useEffect(()=>{
    const fetchUserData = async ()=>{
      try{
        const response = await axios.get(`http://localhost:5000/api/user-data/${userId}`);
        const data = response.data;

        setCylinderCount(data.cylinderCount);
        setFrequency(data.frequency);
        setLastBookedDate(data.lastBookedDate);


      }catch(error){
        console.error("Failed to fetch user data", error);
      }
    };
    if(userId){
      fetchUserData();
    }
  }, [userId]);
  const handleNewBooking =  ()=>{
     navigate('/dashboard');    
  };
  return (
    <div>
        <h1>Welcome User name here.</h1>

      <div>
          <h3>Updated Details:</h3>
          <ul>
            <li>
              Your New Cylinder Count is : {cylinderCount}.
            </li>
            <li>
              Cylinder Latest Booked on: {lastBookedDate && lastBookedDate.split("T")[0]}
            </li>
            <li>
              You will be notified in {frequency} days.
            </li>
          </ul>
        </div> 
        <div>
          <button onClick={handleNewBooking}>New Booking</button>
        </div>
    </div>
  )
}
