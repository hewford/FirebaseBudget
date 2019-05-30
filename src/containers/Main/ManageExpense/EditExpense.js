import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import formatToDollar from '../../../helpers/formatToDollar'
import { categories } from '../../../tempStubs'
import * as moment from 'moment';

class EditExpense extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			spent: '',
            location: '',
            description: '',
            date: '',
			rememberLocation: false
		}
	}

	componentWillMount() {
        this.category = categories[Number(this.props.match.params.id) - 1]; // TODO: to mapStateToProps
		this.expense = _.values(this.category.transactionHistory).find(month => {
			return month.expenses.find(expense => expense.id === this.props.match.params.expense)
		}).expenses.find(expense => expense.id === this.props.match.params.expense)

		this.setState(this.expense)
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

	toggleRememberLocation = (e) => {
		e.preventDefault();
		this.setState({
			rememberLocation: !this.state.rememberLocation
		})
	}

	handleSpentChange = (e) => {
		e.preventDefault();
		let value = (Number(e.target.value.replace(/[^0-9]+/g, ''))/100).toFixed(2)
		this.setState({
			spent: value
		});
	}

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
            [e.target.id]: e.target.value
        })
	}

	setLocation = (e) => {
		this.setState({
			location: e.target.id
		})
    }
    
    removeLocation = (e) => {
        console.log(`removing ${e.target.id}`)
    }

	checkAuth = (props) => {
	// 	const { auth, category } = this.props
	// 	if (!auth.uid) return { render: <Redirect to='/signin' /> }
		if (this.state.submitted || !this.category) return { render: <Redirect to='/' /> }
		return null
	}

	render() { // TODO: CLEANUP
		const checkAuth = this.checkAuth()
		if (checkAuth) return checkAuth.render

		const { category } = this;

		const value = formatToDollar(this.state.spent)

        const style = {color: category.color}
        const today = new Date().toJSON().replace(/T.*/, '')
		// TODO: date picker max

		return(
			<div className="container center main-section" >
				<form className="form white row relative overflow-scroll">
					<h5 className={`${category.color}`}> Edit Entry: <span style={style}>{category.name}</span></h5>

                    <div className="input-field input-entry offset-s2 col s8">
						<p className="input-label left">Date:</p>
                        <input type="text" id="date" className="datepicker"
                            value={this.state.date}
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

export default withRouter(EditExpense)
// takes category_uid and expense id from params to find expense
// renders expense data in input fields
// Back Button --> routes to Expense List
// Submit sends new expense list (with modified expense) to firebase
