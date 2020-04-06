import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './drawer.css';
import {connect} from 'react-redux'
import selectPage from '../../helpers/selectPage'
import { signOut } from '../../store/actions/authActions'


class Drawer extends Component {
    logOut = async() => {
        await this.props.signOut();
        selectPage('slidezero')
        // this.props.history.push('/signin')
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

const mapDispatchToProps = dispatch => {
	return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Drawer))
