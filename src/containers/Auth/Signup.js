import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './signup.css';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
      }
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
      handleSubmit = (e) => {
        console.log('hi')
        e.preventDefault();
        // this.props.signUp(this.state)
      }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form white" action="#">
                    <h5 className="form-title grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input required={true} type="text" id='firstName' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id='lastName' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id='confirmPassword' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Submit</button>
                        <div className='red-text center'>
                        </div>
                    </div>
                    <div className="form-footer">
                    <p>Already have an Account?</p>
                    <Link to="/signin" className="signin-link">Login</Link>
                </div>
                </form>
            </div>
        )
    }
}

export default Signup

// route: signup
// copy logic from version 2, but route to manage categories immediately to set up categories
// const { auth } = this.props
// if (auth.uid) return <Redirect to="/" />
// and margin-left: -100vw