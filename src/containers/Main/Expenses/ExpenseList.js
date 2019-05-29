import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ExpenseListItem from './ExpenseListItem'
import { categories } from '../../../tempStubs'
import * as moment from 'moment'

export class ExpenseList extends Component {
    state = {
        selected: moment().format("MMMM")
    }
    componentWillMount() {
        this.category = categories[Number(this.props.match.params.id) - 1]; // TODO: to mapStateToProps
		// this.setState({expenses: this.props.expenses})
    }

    handleClick = (e) => {
        this.setState({selected: e.target.id})
    }

    render() {
        // debugger
        const history = Object.values(this.category.transactionHistory || {})
        return (
            <div className='disable_text_highlighting'>
                {
                    history.map((month) => {
                        if (month.month === this.state.selected) {
                            return (
                                <div key={month.month}>
                                    <div className='active-month'> {month.month} </div>
                                    {
                                        month.expenses.map((expense, i) => {
                                            return (
                                                <ExpenseListItem
                                                    key={`expense-${i}`}
                                                    expense={expense}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            )
                        } else {
                            return (
                                <div onClick={this.handleClick} key={month.month} id={month.month} className='non-active-month'> {month.month} </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

export default withRouter(ExpenseList)

// route: Expense List
// renders Current Month Title not as button
// renders list of transactions for the current month as ExpenseListItem
// renders month buttons to view previous transactions
