import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router-dom'
import './expenseList.css'
import * as moment from 'moment';
import { submitDeleteTransaction } from '../../../store/actions/budgetActions'



export class ExpenseListItem extends Component {
    constructor(props){
        super(props)
        this.state={delete:false}
    }

    componentDidMount() {
        setTimeout(() => {
            this.loaded = true
        }, 600)
    }

    handleClick = (e) => {
        // if (this.isActive) {
        //     console.log('undoing')
        //     e.currentTarget.className = e.currentTarget.className.replace('active', "");
        // }
        // if (this.loaded) {
        //     this.props.history.push(`/edit-expense/${this.props.categoryId}/${this.props.monthId}/${this.props.expense.id}`)
        // }
    }

    handleCancel = e => {
        if (!this.touching) this.setState({delete: false})
    }

    handleDelete = async(e) => {
        if (!this.touching) {
            await this.props.submitDeleteTransaction(this.props.categoryId, this.props.expense.id)
            this.setState({submitted: true})
        }
    }

    handleMouseDown = (e) => {
        this.doNotNavigate = false
        this.touching = true;
        if (this.loaded) {
            
            e.currentTarget.className += ' active'
            console.log()
            setTimeout(() => {
                if (this.touching) {
                    console.log(this)
                    this.doNotNavigate = true
                }
            }, 250)
            return false;
        }
    }

    handleMouseUp = (e) => {
        if (this.loaded) {
            setTimeout(() => {
                this.touching = false
            }, 100)
            console.log(!this.doNotNavigate)
            if (!this.doNotNavigate) {
                this.props.history.push(`/edit-expense/${this.props.categoryId}/${this.props.monthId}/${this.props.expense.id}`)
            } else {
                this.setState({delete: true})
                e.currentTarget.className = e.currentTarget.className.replace('active', "");
            }
        }
    }

    render() {
        if (this.state.submitted) return ( <Redirect to='/' /> )
        console.log(this.props)
        const deleteButton = (<i onTouchStart={this.goToTransactions} id="view-transactions-icon" className="material-icons test_deposit">delete</i>);
        const { timestamp, location, amount, description, deposit } = this.props.expense
        if (this.state.delete) {
            return (
                <div className={`card white`}>
                    <div className="card-content black-text">
                        <div className={`card-title red-text`}>
                            Delete Transaction?
                        </div>
                        <p className={`summary-spent ${deposit ? "green-text" : "red-text" } text-darken-2`}>${amount}</p>
                        <p className="delete_options">
                            <span onClick={this.handleDelete} className="bold delete_yes">Yes</span >
                            <span onClick={this.handleCancel} className="bold delete_no">No</span>
                        </p>
                    </div>
                </div>
            )
        }
        return (
            <div onTouchStart={this.handleMouseDown} onTouchEnd={this.handleMouseUp} onClick={this.handleClick} className={`card white`}>
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

const mapDispatchToProps = dispatch => {
	return {
    submitDeleteTransaction: (categoryId, transactionId) => dispatch(submitDeleteTransaction(categoryId, transactionId)),
  }
}

export default compose(connect(null, mapDispatchToProps), firestoreConnect(() => {
    return []
}))(withRouter(ExpenseListItem))
  
