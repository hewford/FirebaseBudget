import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Main from './Main'
import CategorySummary from './CategorySummary'
import { closePostAlert } from '../../store/actions/budgetActions'

class Dashboard extends Component {
  render() {
    let alert
    const { auth, categories } = this.props;
    const { postMessage } = this.props.budgetInfo
    if (!auth.uid) return <Redirect to="/signin" />
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
  return {
    budgetInfo: state.budgetInfo,
    auth: state.firebase.auth,
    categories,
  }
}

const mapDispatchToProps = dispatch => {
	return {
		closePostAlert: (expense) => dispatch(closePostAlert(expense))
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