import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import { Redirect } from 'react-router-dom';
import NonActiveButton from './NonActiveButton';
import CategoryExpenseButton from './CategoryExpenseButton';
import { closePostAlert, forceUpdateFirestore } from '../../../store/actions/budgetActions';
import _ from 'lodash';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: null
    };
  }

  componentWillMount(){
    this.props.forceUpdateFirestore();
  }

  undoTouchActive = (e) => {
    if (this.state.activeButton) {
      setTimeout(() => {
        if (!this.props.history.location.pathname.match('new-deposit')) {
          const cards = document.getElementsByClassName('card');
          for (let item of cards) {
            item.className = item
              .className
              .replace('active', '');
          }
          this.setState({activeButton: null});
        }
      }, 400);
    }
  }

  setTouchActive = (id) => {
    this.setState({activeButton: id});
  }

  checkAuth = (props) => {
    	const { auth } = this.props;
    	if (!auth.uid) return { render: <Redirect to={'/signin'} /> };
    return null;
  }

  render() {
    const checkAuth = this.checkAuth();
    if (checkAuth) return checkAuth.render;

    let alert;
    const { postMessage } = this.props.budgetInfo;
    if (postMessage) {
      alert = () => {
        return (
          <div className={'col white s12 red-text center alert-message'}>
            <span>{this.props.budgetInfo.postMessage}</span>
            <span className={'close-message'} onClick={this.props.closePostAlert}> Close </span>
          </div>
        );
      };
    } else alert = () => null;

    let background = this.state.activeButton
      ? ' white '
      : '';
    return (
      <div
        className={`${background} dash disable_text_highlighting`}
        onTouchStart={this.undoTouchActive}>
        {alert()}
        {_
          .values(this.props.categories)
          .map((category, index) => {
            if (this.state.activeButton) {
              if (this.state.activeButton === category.id) {
                return (
                  <CategoryExpenseButton
                    active={true}
                    category={category}
                    key={`category-${index}`}
                    offset={index % 2
                      ? 'non'
                      : ''}
                    setTouchActive={this.setTouchActive}
                  />
                );
              } else {
                return (
                  <NonActiveButton
                    key={`category-${index}`}
                    offset={index % 2
                      ? 'non'
                      : ''}
                  />
                );
              }
            } else {
              return (
                <CategoryExpenseButton
                  category={category}
                  key={`category-${index}`}
                  offset={index % 2
                    ? 'non'
                    : ''}
                  setTouchActive={this.setTouchActive}
                />
              );
            }
          })}
      </div>
    );
  }
}

const mapStateToProps = (state, other) => {
  const { budgetInfo } = state;
  const { auth } = state.firebase;

  const budgets = state.firestore.ordered.budgets;
  if (!budgets) return { auth, budgetInfo };
  const budget = budgets.find(
    budget => budget.userId === auth.uid
  );
  if (!budget) return { auth, budgetInfo };

  const { categories } = budget;

  return {budget, categories, auth, budgetInfo};
};

const mapDispatchToProps = dispatch => {
  return {
    closePostAlert: (expense) => dispatch(closePostAlert(expense)),
    forceUpdateFirestore: () => dispatch(forceUpdateFirestore())
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(props => {
  const user = props.auth;
  if (!user.uid)
    return [];
  return [
    {
      collection: 'budgets'
    }
  ];
}))(Dashboard);
