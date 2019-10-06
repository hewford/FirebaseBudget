import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import ExpenseListItem from './ExpenseListItem'
import { categories } from '../../../tempStubs'
import * as moment from 'moment'
import {
    getAllMonthsWithTransactions,
    getTransacationsWithinTimeframe
} from '../../../methods'

export class ExpenseList extends Component {
    state = {
        month: moment().format("MMMM"),
        year: moment().format("YYYY")
    }
    componentWillMount() {
        this.category = categories[Number(this.props.match.params.id) - 1]; // TODO: to mapStateToProps
		// this.setState({expenses: this.props.expenses})
    }

    handleClick = (e) => {
        this.setState({month: e.target.id})
    }

    render() {
        
        // const history = Object.values(this.category.transactionHistory || {})
        if (!this.props.category) return null
        const timeframes = getAllMonthsWithTransactions(this.props.category)
        // debugger
        const { category } = this.props
        console.log(timeframes)
        return (
            <div className='disable_text_highlighting'>
                {
                    Object.entries(timeframes).sort(([a], [b]) => b - a).map(([year, months], i) => {
                        if (year === this.state.year) {
                            return (
                                <div key={"year-list-"+i}>
                                    <div className='active-year'> {year} </div>
                                    {months.map(month => {
                                        if (month === this.state.month) {
                                            const transactions = getTransacationsWithinTimeframe(category.transactions, year, month)
                                                // .sort((a, b) => b.timestamp - a.timestamp)
                                            return (
                                                <div key={month}>
                                                    <div className='active-month'> {month} </div>
                                                    {
                                                        transactions.map((transaction, i) => {
                                                            return (
                                                                <ExpenseListItem
                                                                    key={`expense-${i}`}
                                                                    expense={transaction}
                                                                    month={month}
                                                                    categoryId={category.id}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div onClick={this.handleClick} key={month} id={month} className='non-active-month'> {month} </div>
                                            )
                                        }
                                        
                                    })}
                                </div>
                            )
                        } else {
                            return (
                                <div onClick={this.handleClick} key={"year-list-"+i} id={"non-active-"+year} className='non-active-year'> {year} </div>
                            )
                        }
                        
                        // return (<div>{k}<div>{v}</div></div>)
                    })
                    // history.map((data) => {
                    //     const month = data[1]
                    //     if (month.month === this.state.selected) {
                            // return (
                            //     <div key={month.month}>
                            //         <div className='active-month'> {month.month} </div>
                            //         {
                            //             month.transactions.map((transaction, i) => {
                            //                 return (
                            //                     <ExpenseListItem
                            //                         key={`expense-${i}`}
                            //                         expense={transaction}
                            //                         monthId={data[0]}
                            //                         categoryId={this.props.category.id}
                            //                     />
                            //                 )
                            //             })
                            //         }
                            //     </div>
                            // )
                    //     } else {
                            // return (
                            //     <div onClick={this.handleClick} key={month.month} id={month.month} className='non-active-month'> {month.month} </div>
                            // )
                    //     }
                    // })
                }
            </div>
        )
    }
}

// export default withRouter(ExpenseList)

const mapStateToProps = (state, props) => {
    const { auth } = state.firebase
	const budgets = state.firestore.ordered.budgets

	if (!budgets) return { auth }
	const budget = budgets.find(
		budget => budget.userId === auth.uid
	)
	if (!budget) return { auth }

	const category = budget.categories.find(
		category => category.id === props.match.params.id
    ) || null

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
