import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './expenseList.css';

export const Applesauce = ({
  children,
  handleClick,
  handleTouchHold,
}) => {
  let touching = false;
  let doNotHandleClick = false;
  const [hasLoaded, setHasLoaded] = useState(false);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasLoaded(true);
    }, 250);
  });

  const handleMouseDown = (e) => {
    doNotHandleClick = false;
    touching = true;
    const currentTarget = e.currentTarget;
    if (hasLoaded) {
      currentTarget.className += ' active';
      setTimeout(() => {
        if (moving) return;
        if (touching) {
          currentTarget.className = currentTarget.className.replace(/active/g, '');
          doNotHandleClick = true;
          touching = false;
          handleTouchHold();
        }
      }, 250);
      return false;
    }
  };

  const handleTouchMove = () => {
    setMoving(true);
  };

  const handleMouseUp = (e) => {
    e.currentTarget.className = e.currentTarget.className.replace(/active/g, '');
    if (moving) {
      setMoving(false);
      return;
    }
    if (hasLoaded) {
      setTimeout(() => {
        touching = false;
      }, 100);
      if (!doNotHandleClick) {
        handleClick();
      }
    }
  };

  return (
    <div className={'card white'} onTouchEnd={handleMouseUp} onTouchMove={handleTouchMove} onTouchStart={handleMouseDown}>
      {children}
    </div>
  );
};

Applesauce.propTypes = {
  children: PropTypes.any,
  handleClick: PropTypes.func,
  handleTouchHold: PropTypes.func,
};

export default Applesauce;
