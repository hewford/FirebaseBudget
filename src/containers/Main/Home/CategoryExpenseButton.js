import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './categoryExpenseButton.css'

export class CategoryExpenseButton extends Component {
    constructor(props) {
        super(props)

        this.holding = false
        this.handleClick = this.handleClick.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    handleClick = (e) => {
        this.holding = true
        setTimeout(() => {
            if (this.holding) {
                this.props.history.push(`/expenses/${this.props.category.id}`)
            } else {
                this.props.history.push(`/new-expense/${this.props.category.id}`)
            }
        }, 400)
    }

    handleMouseUp = () => {
        this.holding = false
    }


    render() {
        const { color, name } = this.props.category
        const style = { color }
        return (
            <div className="col s6">
                <div onTouchStart={this.handleClick} onTouchEnd={this.handleMouseUp} className={`card white ${this.props.offset}offset-vertical`}>
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

export default withRouter(CategoryExpenseButton)
