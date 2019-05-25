
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

class Navbar extends Component {
  state = {
    dropdown: false,
    loading: true,
  }

  closeDropdown = (e) => {
    e.preventDefault();
    if(this.state.dropdown){
      this.setState({dropdown:false})
    }
    this.props.history.push('/')
  }

  handleToggle = (e) => {
    if (e) e.preventDefault();
    this.setState({dropdown:!this.state.dropdown})
  }

  componentDidMount() {
    if (this.state.loading) {
      this.setState({loading: false})
      this.props.history.push('/')
    }
  }

  render() {
    const { auth, profile } = this.props;
    const dropdown = this.state.dropdown ? 'drop-row row' : ''
    const links = auth.uid ? 
      <SignedInLinks handleToggle={this.handleToggle} dropdown={dropdown} profile={profile} /> : 
      <SignedOutLinks handleToggle={this.handleToggle} dropdown={dropdown}/>;

    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link onClick={this.closeDropdown} to='/' className="brand-logo">Simply Budget</Link>
          <div className="right">
            <i onClick={this.handleToggle} className="material-icons hide-on-large-only">menu</i>
            <div className={`${this.state.dropdown ? '' : 'hide'} dropdown-menu grey darken-3`}>
              {links}
            </div>
            <div className={`hide-on-small-only`}>
              {links}
            </div>
          </div>
          
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(withRouter(Navbar))