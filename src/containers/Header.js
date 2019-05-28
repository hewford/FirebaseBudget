import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from '../budgetlogo.png'
import selectPage from '../helpers/selectPage'

export default class Header extends Component {
    toggleDrawer = () => {
        selectPage('slideone', 'slidetwo')
    }

    render() {
        return (
            <div className="app-header">
                <div>
                    <img src={logo} alt="logo" className="header-logo" />
                </div>
                <Link to='/' className='header-title'>
                    App Title
                </Link>
                <i className="material-icons header-menu" onClick={this.toggleDrawer}>menu</i>
            </div>
        )
    }
}

// exists on all routes, but requires auth
// logo for back button?
// Title for home
// drawer toggler (moves margin-left for app container)