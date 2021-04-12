import React, { useState } from 'react';
import NonActiveButton from './NonActiveButton';
import CategoryExpenseButton from './CategoryExpenseButton';
import _ from 'lodash';
import { useCategories } from 'utils/hooks/useCategories';
import PropTypes from 'prop-types';

export const Dashboard = ({
  history,
}) => {
  const [activeButton, setActiveButton] = useState(null);
  const [categories] = useCategories();

  const undoTouchActive = () => {
    if (activeButton) {
      setTimeout(() => {
        if (!history.location.pathname.match('new-deposit')) {
          const cards = document.getElementsByClassName('card');
          for (let item of cards) {
            item.className = item
              .className
              .replace('active', '');
          }
          setActiveButton(null);
        }
      }, 400);
    }
  };

  const setTouchActive = (id) => {
    setActiveButton(id);
  };

  let background = activeButton
    ? ' white '
    : '';
  return (
    <div
      className={`${background} dash disable_text_highlighting`}
      onTouchStart={undoTouchActive}>
      {_
        .values(categories)
        .map((category, index) => {
          if (activeButton) {
            if (activeButton === category.id) {
              return (
                <CategoryExpenseButton
                  active={true}
                  category={category}
                  key={`category-${index}`}
                  offset={index % 2
                    ? 'non'
                    : ''}
                  setTouchActive={setTouchActive}
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
                setTouchActive={setTouchActive}
              />
            );
          }
        })}
    </div>
  );
};

NonActiveButton.propTypes = {
  history: PropTypes.any,
};

export default Dashboard;
