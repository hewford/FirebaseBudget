import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class CategorySummary extends Component {
    handleCategorySelect = (e) => {
        e.preventDefault();
        const { category } = this.props
        this.props.history.push(`/entry/${category.id}`)
    }

    render() {
        const { category } = this.props
        const spent = category.expenses ? category.expenses.reduce((spent, item) => {
            spent += Number(item.spent)
            return spent
        }, 0) : 0
        const { color } = category

          return (
            <div className="col m6 s6">
                <div key={category.id} id={category.id} onClick={this.handleCategorySelect} className="card">
                    <div className="card-content">
                        <span className={`card-title ${color} bold-text`}>{category.category}</span>
                        <span>Remaining: <br/> ${(category.budget - spent).toFixed(2)}</span>
                    </div>
                </div>
            </div>
          )
    }
}

export default withRouter(CategorySummary)
