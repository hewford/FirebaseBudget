import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import CategoryListItem from './CategoryListItem';
import { Object } from 'core-js';

export class CategoryList extends Component {
    checkAuth = (props) => {
      const { auth, categories } = this.props;
      if (!categories) return {render: <div></div>};
    	if (!auth.uid) return { render: <Redirect to={'/signin'} /> };
      return null;
    }

    render() {
      const checkAuth = this.checkAuth(this.props);
      if (checkAuth) return checkAuth.render;

      const categories = this.props.categories;

      return (
        <div className={'dash center-list relative overflow-scroll'}>
          {Object.values(categories).map((category, index) => {
            return (
              <CategoryListItem
                category={category}
                key={`category-${index}`}
              />
            );
          })}
          <div className={'center-item'}>
            <Link className={'btn pink lighten-1 z-depth-0 center'} to={'new-category'}>New Category</Link>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  const { auth } = state.firebase;

  const budgets = state.firestore.ordered.budgets;
  if (!budgets) return { auth };
  const budget = budgets.find(
    budget => budget.userId === auth.uid
  );
  if (!budget) return { auth };

  const categories = budget.categories || {};

  return {categories, auth};
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
)(CategoryList);
// TODO: requres auth to render
