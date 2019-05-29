import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
// import { compose } from 'redux'
// import { firestoreConnect } from 'react-redux-firebase'
import { updateExpenses } from '../../store/actions/budgetActions'
// import moment from 'moment.js'

class ExpenseList extends React.Component {
	constructor(props) {
		super(props)
		this.state= {}
	}

	componentWillMount() {
		this.setState({expenses: this.props.expenses})
	}

	handleSpentChange = (e) => {
		e.preventDefault();
        let value = (Number(e.target.value.replace(/[^0-9]+/g, ''))/100).toFixed(2)
        const expenses = this.state.expenses
        expenses[this.state.edit].spent = value
		this.setState({
			expenses
		});
	}

	handleLocationChange = (e) => {
        e.preventDefault();
        const expenses = this.state.expenses
        expenses[this.state.edit].location = e.target.value
		this.setState({
			expenses
		});
	}

	submitEdit = () => {
        this.setState({edit: -1})
        this.props.updateExpenses(this.state.expenses, this.props.match.params.id)
	}

	editExpense = (e) => {
		this.setState({
            edit: e.target.dataset.id
        })
	}
	
	render() {
		let n = String(this.state.spent)
		let value = Number(n).toLocaleString('en');
		if(value === '0') {
			value = ''
		}
		else if(value.indexOf('.') === -1) {
			value += '.00'
		}
		else if(n[n.length-1] === '0' && value.length > 1) {
			value += 0
		}
		value = '$'+ value

		return(
            <div>
				{this.state.expenses.map((expense, index) => {
                    const date = new Date(expense.date.seconds * 1000).toDateString()
					if (this.state.edit === index) {
                        let n = String(expense.spent)
                        let value = Number(n).toLocaleString('en');
                        if(value === '0') {
                            value = ''
                        }
                        else if(value.indexOf('.') === -1) {
                            value += '.00'
                        }
                        else if(n[n.length-1] === '0' && value.length > 1) {
                            value += 0
                        }
                        value = '$'+ value

						return(
							<div key={`expense-list-${index}`} className="card">
                                <span onClick={this.submitEdit} data-id={index} className="grey-text text-darken-3 options-button">done</span>
                                <div className="card-content">
                                    <span className={`card-title`}>{date}</span>
                                    <div className="input-field input-entry offset-s3 col s6">
                                        <p className="input-label left">Amount:</p>
                                        <input type="text" pattern="[0-9]*" step="0.01" className="spent-input"
                                        value={value !== '0' ? value : ''}
                                        onChange={this.handleSpentChange}
                                        />
                                    </div>

                                    <div className="input-field input-entry offset-s3 col s6">
                                        <p className="input-label left">Location:</p>
                                        <input id='location-input' type="text" className="location-input"
                                        placeholder="Optional"
                                        value={expense.location}
                                        onFocus={moveCursorToEnd}
                                        onChange={this.handleLocationChange}
                                        />
                                    </div>
                                </div>
                            </div>
						)
					} else {
						return(
							<div key={`expense-list-${index}`} className="card">
							<span onClick={this.editExpense} data-id={index} className="grey-text text-darken-3 options-button">edit</span>
								<div className="card-content">
									<span className={`card-title`}>{date}</span>
									<span>Spent: ${(expense.spent)}</span>
									<br/>
									<span>{expense.location}</span>
								</div>
							</div>
						)
					}
				})}
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


const mapStateToProps = (state, props) => {
	// const { id } = props.match.params
	// const { categories } = state.firestore.data
	// const category = categories ? categories[id] : null
	// const expenses = category && category.expenses ? category.expenses.sort((a, b) => {return b.date.seconds - a.date.seconds}) : []
	// return {
	// 	auth: state.firebase.auth,
	// 	category,
	// 	expenses
	// }
}
  
const mapDispatchToProps = dispatch => {
	return {
		updateExpenses: (expenses, id) => dispatch(updateExpenses(expenses, id))
	}
}

export default connect(null, mapDispatchToProps)(withRouter(ExpenseList))