import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import EntryForm from './components/entry/EntryForm'
import CreateCategory from './components/budget/CreateCategory'
import Auth from './containers/Auth/Auth'
import Main from './containers/Main/Main'
import Drawer from './containers/Drawer/Drawer'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

class App extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div id="page-container">
            <div className="row">
              <Auth/>
              <Main/>
              <Drawer/>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
