import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../Header'
import Dashboard from './Home/Dashboard'
import CategoryList from './Catagories/CategoryList'
import Category from './ManageCategory/Category'
import NewExpense from './ManageExpense/NewExpense'
import selectPage from '../../helpers/selectPage'

export default class Main extends Component {
    toggleDrawer = () => {
        selectPage('slideone')
    }

    render() {
        return (
            <div id="dashboard" className="app-page dashboard" style={{backgroundColor:"#aaa"}}>
                <div id="close-drawer" onClick={this.toggleDrawer}></div>

                <Header />

                <Switch>
                    <Route exact path='/' component={Dashboard}/>
                    <Route path='/new-expense/:id' component={NewExpense}/>
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
