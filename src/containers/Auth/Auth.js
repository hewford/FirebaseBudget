import React, { Component } from 'react'
import logo from '../../budgetlogo.png'

export default class Auth extends Component {
    render() {
        return (
            <div className="app-page" style={{backgroundColor:"#ccc;"}}>
                {/* First Page */}
                <img src={logo} alt="logo" className="landing-logo" />
                  
                <div className="container">

                  <div className="form white">
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
                      <button onclick="handleSubmit()"className="btn pink lighten-1 z-depth-0">Login</button>
                      <div className='red-text center'>
                      </div>
                    </div>

                  </div>

                </div>
                
              </div>
        )
    }
}
