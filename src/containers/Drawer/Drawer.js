import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import './drawer.css';
import selectPage from '../../helpers/selectPage'

class Drawer extends Component {
    logOut = () => {
        this.props.history.push('/signin')
        selectPage('slidezero')
    }

    toCategoriesList = () => {
        this.props.history.push('/categories')
        selectPage('slideone')
    }

    toNewCategory = () => {
        this.props.history.push('/new-category')
        selectPage('slideone')
    }

    render() {
        return (
            <div id="drawer" className="page-drawer">
                <span onClick={this.toNewCategory}  className="drawer-item">New Category</span>
                <div className="break-line"/>
                <span onClick={this.toCategoriesList} className="drawer-item">Manage Categories</span>
                <div className="break-line"/>
                <span onClick={this.logOut} className="drawer-item">Logout</span>
            </div>
        )
    }
}

export default withRouter(Drawer)

// exists on all routes, but requires auth
// new category --> routes
// manage categories -> routes
// logout --> copy logic from version 1