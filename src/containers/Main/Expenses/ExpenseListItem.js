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

    render() {
        const { timestamp, location, amount, description, deposit } = this.props.expense
        return (
            <div onClick={this.handleClick} className={`card white`}>
                <div className="card-content black-text">
                    <p className="category-summary"><span className="bold">Date: </span>{moment(timestamp).format('l')}</p>
                        <p className={`summary-spent ${deposit ? "green-text" : "red-text" } text-darken-2`}>${amount}</p>
                    <p className="category-summary"><span className="bold">Location: </span>{location}</p>
                    <p className="category-summary"><span className="bold">Description: </span>{description}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(ExpenseListItem)
