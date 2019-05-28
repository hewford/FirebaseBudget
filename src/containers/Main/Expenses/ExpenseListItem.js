import React, { Component } from 'react'

export class ExpenseListItem extends Component {
    render() {
        return (
            <div>
                {this.props.expense.location}
            </div>
        )
    }
}

export default ExpenseListItem

// renders expense summary
// clicking routes to edit expense (parameters: category_uid and expense_id)