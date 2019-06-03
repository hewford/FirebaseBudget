import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
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
        // const history = Object.values(this.category.transactionHistory || {})
        if (!this.props.category) return null
        const history = _.toPairs(this.props.category.transactionHistory)
        return (
            <div className='disable_text_highlighting'>
                {
                    history.map((data) => {
                        const month = data[1]
                        if (month.month === this.state.selected) {
                            return (
                                <div key={month.month}>
                                    <div className='active-month'> {month.month} </div>
                                    {
                                        month.transactions.map((transaction, i) => {
                                            return (
                                                <ExpenseListItem
                                                    key={`expense-${i}`}
                                                    expense={transaction}
                                                    monthId={data[0]}
                                                    categoryId={this.props.category.id}
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

// export default withRouter(ExpenseList)

const mapStateToProps = (state, props) => {
    // debugger
    const category = _.get(state.firestore.ordered, `budgets[0].categories.${props.match.params.id
    }`, null)
    // const history = _.get(categories, 'eatingOut.transactionHistory')

    const { auth } = state.firebase
    return { auth, category }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect( props => {
        const user = props.auth
        if (!user.uid) return []
        return [
            {
                collection: 'budgets'
            }
        ]
    })
)(withRouter(ExpenseList))


// route: Expense List
// renders Current Month Title not as button
// renders list of transactions for the current month as ExpenseListItem
// renders month buttons to view previous transactions
