import React, {useState} from 'react';
import formatToDollar from '../../../helpers/formatToDollar';
import { useCategory } from 'utils/hooks/useCategories';
import PropTypes from 'prop-types';

const NewDeposit = ({
  match,
  history,
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, { addExpense }] = useCategory(match.params.id);

  if (!category) return null;

  const handleSubmit = async() => {
    await addExpense({
      amount,
      location: '',
      description,
      name: category.name,
      deposit: true,
    });
    history.push('/');
  };

  const handleBack = () => history.push('/');

  const handleAmountChange = (e) => {
    let value = (Number(e.target.value.replace(/[^0-9]+/g, '')) / 100).toFixed(2);
    setAmount(value);
  };

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const value = formatToDollar(amount);

  return(
    <div className={'container center'}>
      <form className={'form white row relative'}>
        <h5 className={`${category.color}`}> <span className={'underline-text bold'}>Deposit</span> Entry: <span>{category.name}</span></h5>

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

        <div className={'input-field col s12'}>
          <button className={'mx-1 btn pink lighten-1 z-depth-0'} onClick={handleSubmit}>Submit</button>
          <button className={'mx-1 btn pink lighten-1 z-depth-0'} onClick={handleBack}>Back</button>
          <br />
        </div>
      </form>
    </div>
  );
};

NewDeposit.propTypes = {
  match: PropTypes.any,
  history: PropTypes.any,
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

export default NewDeposit;
