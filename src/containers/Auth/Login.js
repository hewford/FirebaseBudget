import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import './login.css';
import selectPage from '../../helpers/selectPage'

export class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        selectPage('slideone')
        this.setState({auth: true}) // TODO: hook up firebase
        // this.props.signIn(this.state)
    }
    test = (e) => {
    }

    render() {
        if (this.state.auth) return <Redirect to="/" />

        return (
            <form onSubmit={this.handleSubmit} className="form white" action="#">
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Submit</button>
                    <div className='red-text center'>
                        {/* {this.props.authError ? <p>{this.props.authError}</p> : null} */}
                    </div>
                </div>
                <div className="form-footer">
                    <p>Don't have an Account?</p>
                    <Link to="/signup" className="signup-link">Signup</Link>
                </div>
            </form>
        )
    }
}

export default Login

// route: login
// copy logic from version 1
// const { auth } = this.props
// if (auth.uid) return <Redirect to="/" />
// and margin-left: -100vw
