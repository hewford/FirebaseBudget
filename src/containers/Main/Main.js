import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../Header'
import Dashboard from './Home/Dashboard'

export default class Main extends Component {
    render() {
        return (
            <div id="dashboard" className="app-page dashboard" style={{backgroundColor:"#aaa;"}}>
                <Header />

                <Switch>
                    <Route exact path='/' component={Dashboard}/>
                </Switch>
            </div>
        )
    }
}
