import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class Category extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                
            </div>
        )
    }
}

export default withRouter(Category)

// reads params (params: edit & category_uid)
// if edit and category_uid, render category data to be edited
// else render blank form for new category
// copy from version 1
