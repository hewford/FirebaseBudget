import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import logo from '../budgetlogo.png'
import selectPage from '../helpers/selectPage'

class Header extends Component {
    toggleDrawer = () => {
        selectPage('slideone', 'slidetwo')
    }

    goBack = () => {
        if (this.props.location.pathname !== "/") {
            this.props.history.goBack()
        }
    }

    render() {
        return (
            <div className="app-header">
                <div>
                    <img onClick={this.goBack} src={logo} alt="logo" className="header-logo" />
                </div>
                <Link to='/' className='header-title'>
                    Simply Budget
                </Link>
                <i className="material-icons header-menu" onClick={this.toggleDrawer}>menu</i>
            </div>
        )
    }
}

export default withRouter(Header)

// exists on all routes, but requires auth
// logo for back button?
// Title for home
// drawer toggler (moves margin-left for app container)