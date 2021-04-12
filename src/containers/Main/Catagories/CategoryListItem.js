import React from 'react';
import { withRouter } from 'react-router-dom';
import './category.css';
import PropTypes from 'prop-types';

export const CategoryListItem = ({
  history,
  category: {
    id, color, name, budget, balanceLogic
  }
}) => {
  const handleClick = () => {
    history.push(`/edit-category/${id}`);
  };

  return (
    <div className={'card white'} onClick={handleClick}>
      <div className={'card-content black-text'}>
        <div className={`${color} card-title`}>
          { name }
        </div>
        <p className={'category-summary'}><span className={'bold'}>Budget: </span>${budget}</p>
        <p className={'category-summary'}><span className={'bold'}>Balance Logic: </span>{balanceLogic}</p>
      </div>
    </div>
  );
};

CategoryListItem.propTypes = {
  category: PropTypes.any,
  history: PropTypes.any,
};

export default withRouter(CategoryListItem);
