import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Login'
import logo from '../../budgetlogo.png'

export default class Auth extends Component {
    render() {
        return (
          <div className="app-page" style={{backgroundColor:"#ccc;"}}>
            <img src={logo} alt="logo" className="landing-logo" />

            <div className="container">
              <Switch>
                <Route path='/signin' component={Login}/>
              </Switch>
            </div>
          </div>
        )
    }
}
