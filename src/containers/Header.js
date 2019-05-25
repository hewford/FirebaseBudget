import React, { Component } from 'react'
import logo from '../budgetlogo.png'

export default class Header extends Component {
    render() {
        return (
            <div className="app-header">
                <div>
                    <img src={logo} alt="logo" className="header-logo" />
                </div>
                <div className='header-title'>
                App Title
                </div>
                <i className="material-icons header-menu" onclick="toggleDrawer()">menu</i>
            </div>
        )
    }
}

// exists on all routes, but requires auth
// logo for back button?
// Title for home
// drawer toggler (moves margin-left for app container)