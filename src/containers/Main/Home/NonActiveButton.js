import React from 'react';
import PropTypes from 'prop-types';

export const NonActiveButton = ({offset}) => {
  return (
    <div className={'col s6'}>
      <div className={`empty-card white ${offset}offset-vertical `}>
        <div className={'card-content black-text'}>
          <div className={'card-title'}>
          </div>
          <p className={'card-body'}></p>
        </div>
      </div>
    </div>
  );
};

NonActiveButton.propTypes = {
  offset: PropTypes.string,
};

export default NonActiveButton;
