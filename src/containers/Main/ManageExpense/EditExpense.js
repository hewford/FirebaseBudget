import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import MomentUtils from '@date-io/moment';
import './expense.css';
import formatToDollar from '../../../helpers/formatToDollar';
import * as moment from 'moment';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { subitEditTransaction } from '../../../store/actions/budgetActions';


class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      amount: '',
      deposit: false,
      description: '',
      id: null,
      location: '',
      timestamp: Date.now()
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setStateWithTransaction(_.cloneDeep(nextProps.transaction));
  }

  componentDidMount() {
    this.setStateWithTransaction(_.cloneDeep(this.props.transaction));
  }

	setStateWithTransaction = (transaction) => {
	  if (transaction) this.setState(transaction);
	}

	handleSubmit = async(e) => {
	  await this.props.subitEditTransaction(this.props.auth.uid, this.props.category, this.state);
	  this.setState({submitted: true});
	}

	handleBack = (e) => {
	  e.preventDefault();
	  this.props.history.push('/');
	}

	handleAmountChange = (e) => {
	  e.preventDefault();
	  let value = (Number(e.target.value.replace(/[^0-9]+/g, ''))/100).toFixed(2);
	  this.setState({
	    amount: value
	  });
	}

	handleChange = (e) => {
	  e.preventDefault();
	  this.setState({
	    [e.target.id]: e.target.value
	  });
	}

	handleDepositCheck = e => {
	  e.preventDefault();
	  const deposit = (e.currentTarget.id === 'deposit_true');
	  this.setState({
	    deposit,
	  });
	}

	handleDateChange = (date) => {
	  this.setState({ timestamp: date.toDate().getTime() });
	}

	checkAuth = (props) => {
	  // 	const { auth, category } = this.props
	  // 	if (!auth.uid) return { render: <Redirect to='/signin' /> }
	  if (this.state.submitted) return { render: <Redirect to={'/'} /> };

	  if (!this.props.category) {
	    return { render:
					<div>
					</div>
	    };
	    // return { render: <Redirect to='/' /> }
	  }
	  return null;
	}

	render() { // TODO: CLEANUP
	  const checkAuth = this.checkAuth();
	  if (checkAuth) return checkAuth.render;

	  const { category } = this.props;

	  const value = formatToDollar(this.state.amount);

	  const date = new Date(this.state.timestamp);
	  const isDeposit = this.state.deposit === true;
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
	              onChange={this.handleDateChange}
	              value={moment(this.state.timestamp)}
	            />
	          </div> : <div>Could not load date</div>}

	          <div className={'input-field input-entry offset-s2 col s8'}>
	            <p className={'input-label left'}>Amount:</p>
	            <input className={'spent-input'} onChange={this.handleAmountChange} pattern={'[0-9]*'} step={'0.01'}
	              type={'text'}
	              value={value !== '0' ? value : ''}
	            />
	          </div>

	          <div className={'input-field input-entry offset-s2 col s8'}>
	            <p className={'input-label left'}>Description:</p>
	            <input className={'description-input'} id={'description'} onChange={this.handleChange}
	              onFocus={moveCursorToEnd}
	              placeholder={'Optional'}
	              type={'text'}
	              value={this.state.description}
	            />
	          </div>

	          <div className={'input-field input-entry offset-s2 col s8'}>
	            <p className={'input-label left'}>Location:</p>
	            <input className={'location-input'} id={'location'} onChange={this.handleChange}
	              onFocus={moveCursorToEnd}
	              placeholder={'Optional'}
	              type={'text'}
	              value={this.state.location}
	            />
	          </div>
	          <div className={'offset-s2 col s8 align-left'}>
	            <span >Deposit:</span>
	            <p className={'radio-btn-container'} data-name={'isDeposit'} id={'deposit_true'} onClick={this.handleDepositCheck}>
	              <label>
	                <input checked={isDeposit} className={'radio-btn'} name={'group1'}
	                  onChange={()=>{}} type={'radio'}/>
	                <span>True</span>
	              </label>
	            </p>
	            <p className={'radio-btn-container'} data-name={'isDeposit'} id={'deposit_false'} onClick={this.handleDepositCheck}>
	              <label>
	                <input checked={!isDeposit} className={'radio-btn'} name={'group1'}
	                  onChange={()=>{}} type={'radio'} />
	                <span>False</span>
	              </label>
	            </p>
	          </div>

	          <div className={'input-field col s12'}>
	            <button className={'mx-1 btn pink lighten-1 z-depth-0'} onClick={this.handleSubmit}>Submit</button>
	            <button className={'mx-1 btn pink lighten-1 z-depth-0'} onClick={this.handleBack}>Back</button>
	            <br />
	          </div>
	        </form>
	      </div>
	    </MuiPickersUtilsProvider>
	  );
	}
}

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

// renders new expense form:
// Amount
// Description (optional)
// Location (optional)
// remember location checkbox
// list of remembered locations as tags
// Back Button --> routes to Home
// Submit sends new expense list (with added expense) to firebase

const mapStateToProps = (state, props) => {
  const { expenseId } = props.match.params;
  const { auth } = state.firebase;

  const budgets = state.firestore.ordered.budgets;
  if (!budgets) return { auth };
  const budget = budgets.find(
    budget => budget.userId === auth.uid
  );
  if (!budget) return { auth };

  const category = budget.categories
    .find(
      category => category.id === props.match.params.id
    ) || {transactions:[]};

  const transaction = category.transactions
    .find(transaction => transaction.id === expenseId);
  console.log('MAPPING TRANSACTION', transaction);
  return { auth, category, transaction };
};

const mapDispatchToProps = dispatch => {
  return {
    subitEditTransaction: (uid, category, expense) => dispatch(subitEditTransaction(uid, category, expense))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect( props => {
    const user = props.auth;
    if (!user.uid) return [];
    return [
      {
        collection: 'budgets'
      }
    ];
  })
)((EditExpense));
// takes category_uid and expense id from params to find expense
// renders expense data in input fields
// Back Button --> routes to Expense List
// Submit sends new expense list (with modified expense) to firebase
