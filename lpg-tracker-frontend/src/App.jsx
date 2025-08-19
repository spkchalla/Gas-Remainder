import {Routes, Route, Navigate} from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));


  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
      <Route path = '/' element={<Home/>}/>
      <Route path = '/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path = '/register' element={<Register/>}/>
      <Route path = '/dashboard' element={isLoggedIn ? <Dashboard/> : <Navigate to = "/login"/>}/>
      <Route path = '*' element={<NotFound/>}/>
    </Routes>
    </div>
    
  )
}

export default App
