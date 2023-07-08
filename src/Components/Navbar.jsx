import React from "react";
import "../Styles/navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          {/* <Link >Home</Link> */}
          Home
        </li>
        <li>Login</li>
        <li>
          {/* <Link >Register</Link> */}
          Register
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
