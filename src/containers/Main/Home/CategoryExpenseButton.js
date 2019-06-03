import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './categoryExpenseButton.css'

export class CategoryExpenseButton extends Component {
    constructor(props) {
        super(props)

        this.holding = false
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    handleMouseDown = (e) => {
        this.holding = true
        e.currentTarget.className += 'active'
        setTimeout(() => {
            if (this.holding) {
                this.props.history.push(`/expenses/${this.props.category.id}`)
            }
        }, 400)
        return false;
    }

    handleMouseUp = (e) => {
        e.currentTarget.className = e.currentTarget.className.replace('active', '')
        this.holding = false
        this.props.history.push(`/new-expense/${this.props.category.id}`)
    }


    render() {
        const { color, name, balance } = this.props.category
        const style = { color }
        return (
            <div className="col s6">
                <div onTouchStart={this.handleMouseDown} onTouchEnd={this.handleMouseUp} className={`card white ${this.props.offset}offset-vertical `}>
                    <div className="card-content black-text">
                        <div className="card-title" style={style}>
                            { name }
                        </div>
                        <p className="card-body">${balance}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CategoryExpenseButton)
