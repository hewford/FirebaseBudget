import React, { useState, useEffect } from 'react';
import './category.css';
import formatToDollar from '../../../helpers/formatToDollar';
import { carryoverText, resetMonthlyText, text_colors } from '../../../helpers/contants';
import { useCategory } from 'utils/hooks/useCategories';

export const Category = ({ match, history }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [budget, setBudget] = useState(0);
  const [balanceLogic, setBalanceLogic] = useState('Carryover');
  const [locations, setLocations] = useState([]);
  const [colorPicker, setColorPicker] = useState(false);

  const [category, { createCategory, submitEdittedCategory }] = useCategory(match.params.id);

  const state = {
    ...(category || {}),
    name,
    color,
    budget,
    balanceLogic,
    locations,
  };

  useEffect(() => {
    if (category) {
      setName(category.name);
      setColor(category.color);
      setBudget(category.budget);
      setBalanceLogic(category.balanceLogic);
      setLocations(category.locations);
    }
  }, [category]);

  const handleSubmit = async(e) => {
    console.log(`submitting ${name}`);
    if (category) {
      await submitEdittedCategory(state);
    } else {
      await createCategory(state);
    }
    history.push('/');
  };

  const handleCategoryNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    let value = (Number(e.target.value.replace(/[^0-9]+/g, '')) / 100).toFixed(2);
    setBudget(value);
  };

  //   const removeLocation = (e) => {
  //     console.log(`removing ${e.target.id}`);
  //   };

  const toggleColorPicker = () => setColorPicker(!colorPicker);

  const handleColorChange = (e) => {
    setColor(e.target.dataset.color);
    setColorPicker(false);
  };

  const renderColorPicker = (colors) => {
    return (
      <div className={''}>
        {colors.map((color, index) => {
          const shade = color.split(' ');
          return (
            <div className={'color-picker-button'} key={color[0][0]+'-'+index}>
              <div
                className={`${shade[0]} ${shade[1]} white-text bold-text my-1`}
                data-color={`${shade[0]}-text text-${shade[1] || shade[0]}`}
                key={shade[0] + index}
                onClick={handleColorChange}>
                {shade[0]}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const value = formatToDollar(budget);

  if (colorPicker)
    return (
      <div className={'container center main-section overflow-scroll relative'} >
        <div className={`color-pick form overflow-scroll relative ${colorPicker ? '' : 'hide'}`}>
          <div className={'input-field col s12 center'}>
            <button className={'my-2 btn black white-text lighten-1 z-depth-0'} onClick={toggleColorPicker}>Close</button>
            {renderColorPicker(text_colors)}
          </div>
        </div>
      </div>
    );

  return (
    <div className={'container center main-section overflow-scroll relative'} >
      <form className={'form white row'}>
        <h5>{category ? 'Edit' : 'New'} Category</h5>

        <div className={'input-field input-entry offset-s2 col s8'}>
          <p className={'input-label left'}>Category Name:</p>
          <input className={`${color} category-name`} id={'name'} onChange={handleCategoryNameChange}
            type={'text'}
            value={name}
          />
        </div>

        <div className={'input-field input-entry offset-s2 col s8'}>
          <p className={'input-label left'}>Budget Amount:</p>
          <input className={'spent-input'} id={'budget'} onChange={handleNumberChange} pattern={'[0-9]*'}
            step={'0.01'}
            type={'text'}
            value={value !== '0' ? value : ''}
          />
        </div>

        <div className={'offset-s2 col s8'}>
          <button className={'mx-1 btn pink lighten-1 z-depth-0'} onClick={toggleColorPicker}>
                            Pick Color
          </button>
        </div>
        <div className={'input-field my-2 col s12'}>
          <button className={'mx-1 btn pink lighten-1 z-depth-0'} onClick={handleSubmit}>Submit</button>
          <br />
        </div>
      </form>

      <div className={'card white'}>
        <div className={'card-content balance-logic-description align-left'}>
          <p className={'category-summary'}><span className={'bold'}>{balanceLogic}</span></p>
          <p className={'category-summary'}>
            { balanceLogic === 'Carryover' ?
              carryoverText :
              resetMonthlyText }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Category;

// reads params (params: edit & category_uid)
// if edit and category_uid, render category data to be edited
// else render blank form for new category
// copy from version 1
