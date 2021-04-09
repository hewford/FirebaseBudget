import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './category.css';

export class CategoryListItem extends Component {
    handleClick = () => {
      this.props.history.push(`/edit-category/${this.props.category.id}`);
    }

    render() {
      const { color, name, budget, balanceLogic } = this.props.category;
      return (
        <div className={'card white'} onClick={this.handleClick}>
          <div className={'card-content black-text'}>
            <div className={`${color} card-title`}>
              { name }
            </div>
            <p className={'category-summary'}><span className={'bold'}>Budget: </span>${budget}</p>
            <p className={'category-summary'}><span className={'bold'}>Balance Logic: </span>{balanceLogic}</p>
          </div>
        </div>
      );
    }
}

export default withRouter(CategoryListItem);
