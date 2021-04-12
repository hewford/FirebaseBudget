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
import selectPage from 'helpers/selectPage';
import { UserProvider, AuthContext } from 'utils/contexts/authProvider';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RouteContext } from 'utils/contexts/routeProvider';
import { ToastContext } from 'utils/contexts/toastProvider';
import { AuthCheck } from 'reactfire';

const Main = ({
  history: {
    push: route
  }}) => {
  const uid = useContext(AuthContext);
  const router = useContext(RouteContext);
  const { toast } = useContext(ToastContext);
  useEffect(() => {

    if (uid) {
      route('/');
      router.navigate('/');
      selectPage('slideone');
    } else {
      route('/signin');
      router.navigate('signin');
      selectPage('slidezero');
    }
  }, [route, uid]);

  const toggleDrawer = () => {
    selectPage('slideone');
  };

  return (
    <div className={'app-page dashboard'} id={'dashboard'} style={{ backgroundColor: '#aaa' }}>
      <div id={'close-drawer'} onClick={toggleDrawer}></div>
      <AuthCheck fallback={<RenderNull />}>
        {toast && <div className={'toasts'}>{toast}</div>}
        <Header />
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
      </AuthCheck>
    </div>
  );
};

const RenderNull = () => null;

Main.propTypes = {
  history: PropTypes.any,
};

export default withRouter(Main);