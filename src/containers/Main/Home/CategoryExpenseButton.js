import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './categoryExpenseButton.css';
import { getCategoryBalance } from '../../../methods/index';

export class CategoryExpenseButton extends Component {
  constructor(props) {
    super(props);

    this.touching = false;
    this.hovering = false;
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.state = {
      tips: false
    };
  }

    handleMouseDown = (e) => {
      this.touching = true;
      this.doNotNavigate = false;
      e.currentTarget.className += 'active';

      setTimeout(() => {
        if (this.touching) {
          if(!this.stopEverything){
            this.doNotNavigate = true;
            this.props.setTouchActive(this.props.category.id);
          }
        }
      }, 250);
      return false;
    }

    handleMouseUp = (e) => {
      this.touching = false;

      if (!this.doNotNavigate) {
        this.props.history.push(`/new-expense/${this.props.category.id}`);
      } else {
        // e.currentTarget.className = e.currentTarget.className.replace("active", "")
        this.doNotNavigate = false;
      }

      document.getElementsByClassName('dash')[0].className += ' active_card';
    }

    goToDeposit = () => {
      this.stopEverything = true;
      this.props.history.push(`/new-deposit/${this.props.category.id}`);
    }

    goToTransactions = () => {
      this.stopEverything = true;
      this.props.history.push(`/expenses/${this.props.category.id}`);
    }

    renderTips = () => {
      if (this.props.active) {
        return (
          <div className={`card_tooltip ${this.props.offset}offset-vertical`}>
            <i className={'material-icons test_deposit'} id={'add-deposit'} onTouchStart={this.goToDeposit}>add_circle_outline</i>
            <i className={'material-icons test_deposit'} id={'view-transactions-icon'} onTouchStart={this.goToTransactions}>view_list</i>
          </div>
        );
      } else {
        return null;
      }

    }

    render() {
      const balance = getCategoryBalance(this.props.category);
      const { color, name } = this.props.category;
      return (
        <div className={'col s6'}>
          {this.renderTips()}
          <div
            className={`card white ${this.props.offset}offset-vertical `}
            onTouchEnd={this.handleMouseUp}
            onTouchStart={this.handleMouseDown}>
            <div className={'card-content black-text'}>
              <div className={`card-title ${color}`}>
                { name }
              </div>
              <p className={'card-body'}>${balance}</p>
            </div>
          </div>
        </div>
      );
    }
}

export default withRouter(CategoryExpenseButton);
