import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import formatToDollar from '../../../helpers/formatToDollar';
import { useCategory } from 'utils/hooks/useCategories';

const NewExpense = ({
  match,
  history,
  auth
}) => {
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [rememberLocation, setRememberLocation] = useState(false);

  const [category, {addExpense}] = useCategory(match.params.id);

  const toggleRememberLocation = (e) => setRememberLocation(!rememberLocation);

  const handleSubmit = async (e) => {
    // add push notification...
    await addExpense({
      amount,
      location,
      description,
      rememberLocation,
      name: category.name
    });
    history.push('/');
  };

  const handleBack = (e) => history.push('/');

  const handleAmountChange = (e) => {
    let value = (Number(e.target.value.replace(/[^0-9]+/g, '')) / 100).toFixed(2);
    setAmount(value);
  };

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleLocationChange = (e) => setLocation(e.target.value || e.target.id);

  if (!category) return null;

  const value = formatToDollar(amount);

  return(
    <div className={'container center'}>
      <form className={'form white row relative'}>
        <h5 className={`${category.color}`}> <span className={'underline-text bold'}>Expense</span> Entry: <span>{category.name}</span></h5>

        <div className={'input-field input-entry offset-s3 col s6'}>
          <p className={'input-label left'}>Amount:</p>
          <input className={'spent-input'} onChange={handleAmountChange} pattern={'[0-9]*'} step={'0.01'}
            type={'text'}
            value={value !== '0' ? value : ''}
          />
        </div>

        <div className={'input-field input-entry offset-s3 col s6'}>
          <p className={'input-label left'}>Description:</p>
          <input className={'description-input'} id={'description'} onChange={handleDescriptionChange}
            onFocus={moveCursorToEnd}
            placeholder={'Optional'}
            type={'text'}
            value={description}
          />
        </div>

        <div className={'input-field input-entry offset-s3 col s6'}>
          <p className={'input-label left'}>Location:</p>
          <input className={'location-input'} id={'location'} onChange={handleLocationChange}
            onFocus={moveCursorToEnd}
            placeholder={'Optional'}
            type={'text'}
            value={location}
          />
        </div>

        <p>
          <label>
            <input checked={rememberLocation} className={'filled-in'} onChange={toggleRememberLocation} type={'checkbox'} />
            <span>Remember Location</span>
          </label>
        </p>

        <div className={'col s10 offset-s1'}>
          {category.locations ? category.locations.map((location, index) => {
            return(
              <div className={'chip'} id={location} key={`location${index}`} onClick={handleLocationChange}>
                {location}
              </div>
            );
          }) : null}
        </div>

        <div className={'input-field col s12'}>
          <button className={'mx-1 btn pink lighten-1 z-depth-0'} onClick={handleSubmit}>Submit</button>
          <button className={'mx-1 btn pink lighten-1 z-depth-0'} onClick={handleBack}>Back</button>
          <br />
        </div>
      </form>
    </div>
  );
};

function moveCursorToEnd(e) {
  const el = e.currentTarget;
  if (typeof el.selectionStart === 'number') {
    el.selectionStart = el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange !== 'undefined') {
    el.focus();
    var range = el.createTextRange();
    range.collapse(false);
    range.select();
  }
}

export default withRouter(NewExpense);