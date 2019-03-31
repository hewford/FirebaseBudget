import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import EntryForm from './components/entry/EntryForm'
import CreateCategory from './components/budget/CreateCategory'

class App extends Component {
  state = {
    splash: true,
  }

  render() {
    // if (this.state.splash) {
    //   setTimeout(() => {
    //     this.setState({splash: false})
    //   },1500)
    //   return(<h1>Test Splash</h1>)
    // }
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route path='/entry/:id' component={EntryForm} />
            <Route path='/createcategory' component={CreateCategory} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
