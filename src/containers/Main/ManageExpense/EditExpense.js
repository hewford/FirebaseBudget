import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { withRouter, Redirect } from 'react-router-dom'
import _ from 'lodash'
import MomentUtils from '@date-io/moment';
import './expense.css'
import formatToDollar from '../../../helpers/formatToDollar'
import { categories } from '../../../tempStubs'
import * as moment from 'moment';
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

class EditExpense extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			amount: '',
            location: '',
            description: '',
            date: '',
			rememberLocation: false
		}
	}

	componentWillReceiveProps(nextProps) {
		const { expense } = _.cloneDeep(nextProps)
		if (expense) {
			expense.date = new Date(expense.date.seconds * 1000)
			this.setState(expense)
		}
	}

	componentDidMount() {
		const { expense } = _.cloneDeep(this.props)
		if (expense) {
			expense.date = new Date(expense.date.seconds * 1000)
			this.setState(expense)
		}
    }

	handleSubmit = async(e) => {
        console.log(document.getElementById('date').M_Datepicker.date)
		// e.preventDefault();
		// const {id} = this.props.match.params
		// await this.props.addExpense({id, ...this.state})
		this.setState({submitted: true})
	}

	handleBack = (e) => {
		e.preventDefault();
        this.props.history.push('/')
	}

	handleSpentChange = (e) => {
		e.preventDefault();
		let value = (Number(e.target.value.replace(/[^0-9]+/g, ''))/100).toFixed(2)
		this.setState({
			amount: value
		});
	}

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
            [e.target.id]: e.target.value
        })
	}

	handleDateChange = (date) => {
		this.setState({ date })
	}

	checkAuth = (props) => {
		const { auth, category } = this.props
		if (!category) return { render: (<div></div>)}
	// 	if (!auth.uid) return { render: <Redirect to='/signin' /> }
		if (this.state.submitted) return { render: <Redirect to='/' /> }
		return null
	}

	render() { // TODO: CLEANUP
		// console.log(this.state)
		// return(<div></div>)
		const checkAuth = this.checkAuth()
		if (checkAuth) return checkAuth.render

		const { category } = this.props;

		const value = formatToDollar(this.state.amount)

        // const style = {color: category.color}
        const today = new Date().toJSON().replace(/T.*/, '')
		// TODO: date picker max
		console.log(this.state)
		return(
			<MuiPickersUtilsProvider utils={MomentUtils}>
			<div className="container center main-section" >
				<form className="form white row relative overflow-scroll">
					<h5 className={`${category.color}`}> Edit Entry: <span>{category.name}</span></h5>

                    <div className="input-field input-entry offset-s2 col s8">
						<p className="input-label left relative">Date:</p>
						<br />
						<DatePicker
							disableFuture
							autoOk
							className="custom-date-picker"
							value={this.state.date}
							onChange={this.handleDateChange}
							animateYearScrolling
						/>
					</div>

					<div className="input-field input-entry offset-s2 col s8">
						<p className="input-label left">Amount:</p>
						<input type="text" pattern="[0-9]*" step="0.01" className="spent-input"
						value={value !== '0' ? value : ''}
						onChange={this.handleSpentChange}
						/>
					</div>

                    <div className="input-field input-entry offset-s2 col s8">
						<p className="input-label left">Description:</p>
						<input id='description' type="text" className="description-input"
                            placeholder="Optional"
                            value={this.state.description}
                            onFocus={moveCursorToEnd}
                            onChange={this.handleChange}
						/>
					</div>

					<div className="input-field input-entry offset-s2 col s8">
						<p className="input-label left">Location:</p>
						<input id='location' type="text" className="location-input"
                            placeholder="Optional"
                            value={this.state.location}
                            onFocus={moveCursorToEnd}
                            onChange={this.handleChange}
						/>
					</div>

					<div className="input-field col s12">
						<button onClick={this.handleSubmit} className="mx-1 btn pink lighten-1 z-depth-0">Submit</button>
						<button onClick={this.handleBack} className="mx-1 btn pink lighten-1 z-depth-0">Back</button>
						<br />
					</div>
				</form>
			</div>
			</MuiPickersUtilsProvider>
		)
	}
}

function moveCursorToEnd(e) {
	const el = e.currentTarget
    if (typeof el.selectionStart === "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange !== "undefined") {
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
	const { id, monthId, expenseId } = props.match.params
	const category = _.get(state.firestore.ordered, `budgets[0].categories.${id}`, null)
	const expense = _.get(
		state.firestore.ordered,
		`budgets[0].categories.${id}.transactionHistory.${monthId}.transactions`,
	[]).find(expense => expense.id === expenseId)

	// console.log(history)
	const { auth } = state.firebase
	console.log(expense)
    return { auth, category, expense }
}

//   const mapDispatchToProps = dispatch => {
//       return {
//       closePostAlert: (expense) => dispatch(closePostAlert(expense)),
//       updateForNewMonth: (data) => dispatch(updateForNewMonth(data))
//       }
//   }

export default compose(
    connect(mapStateToProps, null, null),
    firestoreConnect( props => {
        const user = props.auth
        if (!user.uid) return []
        return [
            {
                collection: 'budgets'
            }
        ]
    })
)((EditExpense))
// takes category_uid and expense id from params to find expense
// renders expense data in input fields
// Back Button --> routes to Expense List
// Submit sends new expense list (with modified expense) to firebase
