import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './login.css';

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
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render() {
        return (
            <form className="form white">
                <h5 className="form-title grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label className="active" htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label className="active" htmlFor="password">Password</label>
                    <input type="password" id='password' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <button onClick="handleSubmit()"className="btn pink lighten-1 z-depth-0">Login</button>
                    <div className='red-text center'>
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
