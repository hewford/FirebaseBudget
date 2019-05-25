import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import CategorySummary from './CategorySummary'
import { closePostAlert, updateForNewMonth } from '../../store/actions/budgetActions'

class Dashboard extends Component {
  constructor() {
    super()
    this.updateMonth = this.updateMonth.bind(this)
  }
  updateMonth() {
    this.props.updateForNewMonth(this.props.auth)
  }

  render() {
    let alert
    const { auth, profile, categories } = this.props;
    const { postMessage } = this.props.budgetInfo
    if (!auth.uid) return <Redirect to="/signin" />
    if (profile.budgetMonth) {
      const currentMonth = new Date().getMonth()
      if (profile.budgetMonth !== currentMonth) {
        this.props.updateForNewMonth(auth)
      }
    }
    if (postMessage) {
      alert = (
        <div className='col white s12 red-text center alert-message'>
          <span>{this.props.budgetInfo.postMessage}</span>
          <span className="close-message" onClick={this.props.closePostAlert}> Close </span>
        </div>
      )
    }
    
    if (!categories) return null
    return (
      <div className="dashboard">
        <div className="row">
          {alert}
          { categories.map((category) => {
            return(
              <CategorySummary key={category.id} category={category}/>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const categories = state.firestore.ordered.categories
  const { auth, profile } = state.firebase
  return {
    budgetInfo: state.budgetInfo,
    auth,
    profile,
    categories,
  }
}

const mapDispatchToProps = dispatch => {
	return {
    closePostAlert: (expense) => dispatch(closePostAlert(expense)),
    updateForNewMonth: (data) => dispatch(updateForNewMonth(data))
	}
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect( props => {
    const user = props.auth
    if (!user.uid) return []
    return[
      {
        collection: 'categories', where:[['userId', '==', user.uid]]
      }
    ]
  })
)(Dashboard)