import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import './drawer.css';

class Drawer extends Component {
    logOut = () => {
        this.props.history.push('/signin')
        const el = document.getElementById('page-container')
        el.className = 'slidezero'
        // this.props.signOut()
    }

    render() {
        return (
            <div id="drawer" className="page-drawer">
                <Link to="new-category" className="drawer-item">New Category</Link>
                <div className="break-line"/>
                <Link to="categories" className="drawer-item">Manage Categories</Link>
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