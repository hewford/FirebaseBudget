import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import logo from '../budgetlogo.png';
import selectPage from '../helpers/selectPage';

const Header = ({history, ...props}) => {
  const toggleDrawer = () => {
    selectPage('slideone', 'slidetwo');
  };

  const goBack = () => {
    if (props.location.pathname !== '/') {
      history.goBack();
    }
  };

  return (
    <div className={'app-header'}>
      <div>
        <img alt={'logo'} className={'header-logo'} onClick={goBack} src={logo} />
      </div>
      <Link className={'header-title'} to={'/'}>
                Simply Budget
      </Link>
      <i className={'material-icons header-menu'} onClick={toggleDrawer}>menu</i>
    </div>
  );
};

export default withRouter(Header);

// exists on all routes, but requires auth
// logo for back button?
// Title for home
// drawer toggler (moves margin-left for app container)