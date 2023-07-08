import React from 'react'
import "../Styles/NavBar.css"
const NavBar = () => {
  return (
    <div className='navbar'>

      <ul>
        {/* <li>{logo}</li> */}
        <li>
          <a href="#">Login</a>
        </li>
        <li>
          <a href="#">Register</a>
        </li>
        <li>
          <a href="#">Info</a>
        </li>
      </ul>

    </div>
  )
}

export default NavBar
