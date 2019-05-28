import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../Header'
import Dashboard from './Home/Dashboard'
import CategoryList from './Catagories/CategoryList'
import Category from './ManageCategory/Category'

export default class Main extends Component {
    render() {
        return (
            <div id="dashboard" className="app-page dashboard" style={{backgroundColor:"#aaa"}}>
                <Header />

                <Switch>
                    <Route exact path='/' component={Dashboard}/>
                    <Route exact path='/categories' component={CategoryList}/>
                    <Route exact path='/new-category' component={Category}/>
                    <Route
                        path='/edit-category/:id'
                        component={() => <Category edit={true} />}
                    />
                </Switch>
            </div>
        )
    }
}
