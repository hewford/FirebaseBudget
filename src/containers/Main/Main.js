import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../Header'
import Dashboard from './Home/Dashboard'
import CategoryList from './Catagories/CategoryList'
import Category from './ManageCategory/Category'
import NewExpense from './ManageExpense/NewExpense'
import NewDeposit from './ManageExpense/NewDeposit'
import EditExpense from './ManageExpense/EditExpense'
import ExpenseList from './Expenses/ExpenseList'
import selectPage from '../../helpers/selectPage'

class Main extends Component {
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
                    <Route path='/new-deposit/:id' component={NewDeposit}/>
                    <Route path='/edit-expense/:id/:monthId/:expenseId' component={EditExpense}/>
                    <Route path='/expenses/:id' component={ExpenseList}/>
                    <Route exact path='/categories' component={CategoryList}/>
                    <Route exact path='/new-category' component={Category}/>
                    <Route
                        path='/edit-category/:id'
                        component={(props) => <Category {...props} edit={true} />}
                    />
                </Switch>
            </div>
        )
    }
}

export default Main