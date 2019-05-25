import React, { Component } from 'react'
import logo from '../budgetlogo.png'

export default class Header extends Component {
    toggleDrawer = () => {
        const el = document.getElementById('page-container')
        if (el.className === 'slidetwo') {
          el.className = 'slideone'
        } else {
          el.className = 'slidetwo'
        }
    }

    render() {
        return (
            <div className="app-header">
                <div>
                    <img src={logo} alt="logo" className="header-logo" />
                </div>
                <div className='header-title'>
                App Title
                </div>
                <i className="material-icons header-menu" onClick={this.toggleDrawer}>menu</i>
            </div>
        )
    }
}

// exists on all routes, but requires auth
// logo for back button?
// Title for home
// drawer toggler (moves margin-left for app container)