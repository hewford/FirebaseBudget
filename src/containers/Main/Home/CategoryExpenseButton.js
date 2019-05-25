import React, { Component } from 'react'
import './categoryExpenseButton.css';

export class CategoryExpenseButton extends Component {
    render() {
        const { color, name } = this.props.category
        const style = { color }
        return (
            <div className="col s6">
                <div className={`card white ${this.props.offset}offset-vertical`}>
                    {/* <span className="float-right">...</span> */}
                    <div className="card-content black-text">
                        <div className="card-title" style={style}>
                            { name }
                        </div>
                        <p className="card-body">$data</p>
                    </div>
                </div>
            </div>
        )
    }
}
// renders category title, budget balance
// short press routes to NewExpense (with params: category id)
// long press routes to ExpenseList (with params: category id)
export default CategoryExpenseButton
