import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './categoryExpenseButton.css'
import { getCategoryBalance } from "../../../methods/index"
import { turnOffTouchHold } from "./Dashboard";

export class CategoryExpenseButton extends Component {
    constructor(props) {
        super(props)

        this.touching = false
        this.hovering = false
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)

        this.state = {
            tips: false
        }
    }

    handleMouseDown = (e) => {
        turnOffTouchHold()
        this.touching = true
        this.doNotNavigate = false
        e.currentTarget.className += 'active'
 
        const tool_tips = e.currentTarget.parentNode.firstChild
        setTimeout(() => {
            if (this.touching) {
                this.doNotNavigate = true
                this.props.setTouchActive(this.props.category.id)
                // tool_tips.className = tool_tips.className.replace("hidden", "")
            }
        }, 250)
        return false;
    }

    handleMouseUp = (e) => {
        this.touching = false

        if (!this.doNotNavigate) {
            this.props.history.push(`/new-expense/${this.props.category.id}`)
        } else {
            this.doNotNavigate = false;
        }
        
        document.getElementsByClassName('dash')[0].className += " active_card"
    }

    goToDeposit = () => {
        this.props.history.push(`/new-deposit/${this.props.category.id}`)
    }

    goToTransactions = () => {
        this.props.history.push(`/expenses/${this.props.category.id}`)
    }

    renderTips = () => {
        if (this.props.active) {
            return (
                <div className={`card_tooltip ${this.props.offset}offset-vertical`}>
                    <i onClick={this.goToDeposit} id="add-deposit" className="material-icons test_deposit">add_circle_outline</i>
                    <i onClick={this.goToTransactions} id="view-transactions-icon" className="material-icons test_deposit">view_list</i>
                </div>
            )
        } else {
            return null
        }
        
    }

    render() {
        // if (this.props.category.name === "Rachel") {
        //     debugger
        // }
        const balance = getCategoryBalance(this.props.category)
        const { color, name } = this.props.category
        return (
            <div className="col s6">
                {this.renderTips()}
                <div onTouchStart={this.handleMouseDown} onTouchEnd={this.handleMouseUp} className={`card white ${this.props.offset}offset-vertical `}>
                    <div className="card-content black-text">
                        <div className={`card-title ${color}`}>
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
