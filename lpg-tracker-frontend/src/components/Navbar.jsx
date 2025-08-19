import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({isLoggedIn, setIsLoggedIn}) {
  const handleLogout = ()=>{
    setIsLoggedIn(false);
  };
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link className="nav-link" to="/">
          Home
        </Link>
        {isLoggedIn && (
          <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
        )}
      </div>
      <div className="nav-right">
        {!isLoggedIn ? (
          <>
          <Link className="nav-link" to="/login">
          Login
        </Link>
        <Link className="nav-link" to="/register">
          Register
        </Link>
          </>
        ):(
          <Link className="nav-link" to="/"
          onClick={handleLogout}
          >
            Logout
          </Link>
        )}
        
      </div>
    </nav>
  );
}
