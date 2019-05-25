import React, { Component } from 'react'

export default class Drawer extends Component {
    render() {
        return (
            <div id="drawer" className="page-drawer">
                <h3 onclick="logout()"className="grey-text drawer-item">Logout</h3>
            </div>
        )
    }
}

// exists on all routes, but requires auth
// new category --> routes
// manage categories -> routes
// logout --> copy logic from version 1