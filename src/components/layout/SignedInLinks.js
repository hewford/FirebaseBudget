import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  const handleClick = () => {
    props.handleToggle();
    props.history.push('/signin')
    props.signOut()
  }
  return (
      <ul className={`${props.dropdown}`}>
        <li onClick={props.handleToggle} className="col s12"><NavLink to='/createcategory'>Add New Category</NavLink></li>
        <li className="col s12"><a onClick={handleClick}>Log Out</a></li>
        <li onClick={props.handleToggle} className="col s12"><NavLink to='/' className="btn btn-floating pink lighten-1">
          {props.profile.initials}
        </NavLink></li>
      </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(withRouter(SignedInLinks))