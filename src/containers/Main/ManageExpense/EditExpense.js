import React, { useEffect, useState } from 'react';
import MomentUtils from '@date-io/moment';
import './expense.css';
import formatToDollar from '../../../helpers/formatToDollar';
import * as moment from 'moment';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import { subitEditTransaction } from '../../../store/actions/budgetActions';
import { useTransaction } from 'utils/hooks/useCategories';
import PropTypes from 'prop-types';

const EditExpense = ({
  match,
  history,
  ...props
}) => {
  const [timestamp, setTimestamp] = useState('');
  const [deposit, setDeposit] = useState(false);
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [transaction = {}, category, actions] = useTransaction(match.params.id, match.params.expenseId);

  useEffect(() => {
    setAmount(transaction.amount || '');
    setDeposit(transaction.deposit || '');
    setLocation(transaction.location || '');
    setDescription(transaction.description || '');
    setTimestamp(transaction.timestamp);
  }, [transaction]);

  if (!category || !transaction) return null;

  const handleSubmit = async () => {
    await actions.subitEditTransaction({
      timestamp,
      deposit,
      amount,
      location,
      description,
      id: transaction.id,
      name: category.name
    });
    history.push('/');
  };

  const handleBack = () => history.push('/');

  const handleAmountChange = (e) => {
    let value = (Number(e.target.value.replace(/[^0-9]+/g, '')) / 100).toFixed(2);
    setAmount(value);
  };

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleLocationChange = (e) => setLocation(e.target.value || e.target.id);

  const handleDepositCheck = e => setDeposit(e.currentTarget.id === 'deposit_true');

  const handleDateChange = (date) => setTimestamp(date.toDate().getTime());

  const value = formatToDollar(amount);

  const date = new Date(timestamp);
  return(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={'container center main-section'} >
        <form className={'form white row relative overflow-scroll'}>
          <h5 className={`${category.color}`}> Edit Entry: <span>{category.name}</span></h5>
          {date ? <div className={'input-field input-entry offset-s2 col s8'}>
            <p className={'input-label left relative'}>Date:</p>
            <br />
            <DatePicker
              animateYearScrolling
              autoOk
              disableFuture
              className={'custom-date-picker'}
              onChange={handleDateChange}
              value={moment(timestamp)}
            />
          </div> : <div>Could not load date</div>}

          <div className={'input-field input-entry offset-s2 col s8'}>
            <p className={'input-label left'}>Amount:</p>
            <input className={'spent-input'} onChange={handleAmountChange} pattern={'[0-9]*'} step={'0.01'}
              type={'text'}
              value={value !== '0' ? value : ''}
            />
          </div>

          <div className={'input-field input-entry offset-s2 col s8'}>
            <p className={'input-label left'}>Description:</p>
            <input className={'description-input'} id={'description'} onChange={handleDescriptionChange}
              onFocus={moveCursorToEnd}
              placeholder={'Optional'}
              type={'text'}
              value={description}
            />
          </div>

          <div className={'input-field input-entry offset-s2 col s8'}>
            <p className={'input-label left'}>Location:</p>
            <input className={'location-input'} id={'location'} onChange={handleLocationChange}
              onFocus={moveCursorToEnd}
              placeholder={'Optional'}
              type={'text'}
              value={location}
            />
          </div>
          <div className={'offset-s2 col s8 align-left'}>
            <span >Deposit:</span>
            <p className={'radio-btn-container'} data-name={'isDeposit'} id={'deposit_true'} onClick={handleDepositCheck}>
              <label>
                <input checked={deposit} className={'radio-btn'} name={'group1'}
                  onChange={()=>{}} type={'radio'}/>
                <span>True</span>
              </label>
            </p>
            <p className={'radio-btn-container'} data-name={'isDeposit'} id={'deposit_false'} onClick={handleDepositCheck}>
              <label>
                <input checked={!deposit} className={'radio-btn'} name={'group1'}
                  onChange={()=>{}} type={'radio'} />
                <span>False</span>
              </label>
            </p>
          </div>

          <div className={'input-field col s12'}>
            <button className={'mx-1 btn pink lighten-1 z-depth-0'} onClick={handleSubmit}>Submit</button>
            <button className={'mx-1 btn pink lighten-1 z-depth-0'} onClick={handleBack}>Back</button>
            <br />
          </div>
        </form>
      </div>
    </MuiPickersUtilsProvider>
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

export default EditExpense;
// takes category_uid and expense id from params to find expense
// renders expense data in input fields
// Back Button --> routes to Expense List
// Submit sends new expense list (with modified expense) to firebase
