import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import logo from '../../budgetlogo.png'

export default class Auth extends Component {
    render() {
        return (
          <div className="app-page">
            <img src={logo} alt="logo" className="landing-logo" />

            <div className="container">
              <Switch>
                <Route path='/signin' component={Login}/>
                <Route path='/signup' component={Signup}/>
              </Switch>
            </div>
          </div>
        )
    }
}
