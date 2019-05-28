import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './category.css';

export class CategoryListItem extends Component {
    handleClick = () => {
        this.props.history.push(`/edit-category/${this.props.category.id}`)
    }
    render() {
        const { color, name, budget, balanceLogic } = this.props.category
        const style = { color }

        return (
            <div onClick={this.handleClick} className={`card white`}>
                {/* <span className="float-right">...</span> */}
                <div className="card-content black-text">
                    <div className="card-title" style={style}>
                        { name }
                    </div>
                    <p className="category-summary"><span className="bold">Budget: </span>${budget}</p>
                    <p className="category-summary"><span className="bold">Balance Logic: </span>{balanceLogic}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(CategoryListItem)

// renders category summary: title, budget amount, balance logic
// handle click routes to category (params: edit & category_uid)