import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './expenseList.css'
import * as moment from 'moment';


export class ExpenseListItem extends Component {
    handleClick = () => {
        if (this.loaded) {
            this.props.history.push(`/edit-expense/${this.props.categoryId}/${this.props.monthId}/${this.props.expense.id}`)
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.loaded = true
        }, 600)
    }

    render() { // TODO: handle spent being green for increases in balance
        const { date, location, amount, description } = this.props.expense
        console.log(this.props)
        return (
            <div onClick={this.handleClick} className={`card white`}>
                {/* <span className="float-right">...</span> */}
                <div className="card-content black-text">
                    <p className="category-summary"><span className="bold">Date: </span>${moment(date.seconds*1000).format('l')}</p>
                        <p className='summary-spent red-text text-darken-2'>${amount}</p>
                    <p className="category-summary"><span className="bold">Location: </span>${location}</p>
                    <p className="category-summary"><span className="bold">Description: </span>{description}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(ExpenseListItem)

// renders expense summary
// clicking routes to edit expense (parameters: category_uid and expense_id)