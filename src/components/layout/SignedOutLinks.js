import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = (props) => {
  return (
    <div>
      <ul className={`${props.dropdown}`}>
        <li onClick={props.handleToggle} className="col s12"><NavLink to='/signup'>Signup</NavLink></li>
        <li onClick={props.handleToggle} className="col s12"><NavLink to='/signin'>Login</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks