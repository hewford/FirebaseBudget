import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import logo from '../budgetlogo.png';
import selectPage from '../helpers/selectPage';

class Header extends Component {
    toggleDrawer = () => {
      selectPage('slideone', 'slidetwo');
    }

    goBack = () => {
      if (this.props.location.pathname !== '/') {
        this.props.history.goBack();
      }
    }

    // componentDidMount() {
    //   const auth = this.props.auth || {};
    //   if (auth.uid) {
    //     this.props.history.push('/');
    //   } else {
    //     this.props.history.push('/signin');
    //   }
    // }

    render() {
      return (
        <div className={'app-header'}>
          <div>
            <img alt={'logo'} className={'header-logo'} onClick={this.goBack} src={logo} />
          </div>
          <Link className={'header-title'} to={'/'}>
                    Simply Budget
          </Link>
          <i className={'material-icons header-menu'} onClick={this.toggleDrawer}>menu</i>
        </div>
      );
    }
}

const mapStateToProps = (state, props) => {
  const { auth } = state.firebase;
  return { auth };
};

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect( props => {
    const user = props.auth;
    if (!user.uid) return [];
    return [
      {
        collection: 'budgets'
      }
    ];
  })
)(withRouter(Header));

// exists on all routes, but requires auth
// logo for back button?
// Title for home
// drawer toggler (moves margin-left for app container)