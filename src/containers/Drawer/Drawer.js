import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './drawer.css';
import {connect} from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import navigate from '../../navigation';

class Drawer extends Component {
    logOut = async () => {
      await this.props.signOut();
      navigate.signOut(this.props);
    }

    toCategoriesList = () => {
      navigate.categories(this.props);
    }

    toNewCategory = () => {
      navigate.newCategory(this.props);
    }

    render() {
      return (
        <div className={'page-drawer'} id={'drawer'}>
          <span className={'drawer-item'} onClick={this.toNewCategory}>New Category</span>
          <div className={'break-line'}/>
          <span className={'drawer-item'} onClick={this.toCategoriesList}>Manage Categories</span>
          <div className={'break-line'}/>
          <span className={'drawer-item'} onClick={this.logOut}>Logout</span>
        </div>
      );
    }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Drawer));
