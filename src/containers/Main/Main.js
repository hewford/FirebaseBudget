import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Dashboard from './Home/Dashboard';
import CategoryList from './Catagories/CategoryList';
import Category from './ManageCategory/Category';
import NewExpense from './ManageExpense/NewExpense';
import NewDeposit from './ManageExpense/NewDeposit';
import EditExpense from './ManageExpense/EditExpense';
import ExpenseList from './Expenses/ExpenseList';
import selectPage from '../../helpers/selectPage';
import { UserProvider, AuthContext } from '../../config/authProvider';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


const Main = ({
  history: {
    push: route
  }}) => {
  const uid = useContext(AuthContext);

  useEffect(() => {
    if (uid) {
      route('/');
      selectPage('slideone');
    } else {
      route('/signin');
      selectPage('slidezero');
    }
  }, [route, uid]);

  const toggleDrawer = () => {
    selectPage('slideone');
  };

  return (
    <div className={'app-page dashboard'} id={'dashboard'} style={{backgroundColor:'#aaa'}}>
      <div id={'close-drawer'} onClick={toggleDrawer}></div>

      <Header />
      { uid &&
        <UserProvider uid={uid}>
          <Switch>
            <Route exact component={Dashboard} path={'/'}/>
            <Route component={NewExpense} path={'/new-expense/:id'}/>
            <Route component={NewDeposit} path={'/new-deposit/:id'}/>
            <Route component={EditExpense} path={'/edit-expense/:id/:expenseId'}/>
            <Route component={ExpenseList} path={'/expenses/:id'}/>
            <Route exact component={CategoryList} path={'/categories'}/>
            <Route exact component={Category} path={'/new-category'}/>
            <Route
              component={(props) => <Category {...props} edit={true} />}
              path={'/edit-category/:id'}
            />
          </Switch>
        </UserProvider>
      }
    </div>
  );
};

Main.propTypes = {
  history: PropTypes.any,
};

export default withRouter(Main);