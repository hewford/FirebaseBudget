import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import logo from '../../budgetlogo.png';

export const Auth = (props) => {
  return (
    <div className={'app-page'}>
      <img alt={'logo'} className={'landing-logo'} src={logo} />

      <div className={'container'}>
        <Switch>
          <Route component={Login} path={'/signin'}/>
          <Route component={Signup} path={'/signup'}/>
        </Switch>
      </div>
    </div>
  );
};

export default Auth;