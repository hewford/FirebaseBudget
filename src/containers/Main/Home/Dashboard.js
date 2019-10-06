import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import NonActiveButton from './NonActiveButton'
import CategoryExpenseButton from './CategoryExpenseButton'
import { closePostAlert } from '../../../store/actions/budgetActions'
import _ from 'lodash'

export const turnOffTouchHold = () => {
  const cards = document.getElementsByClassName("card")
  const tooltips = document.getElementsByClassName("card_tooltip")
  for (let item of cards) {
    item.className = item
      .className
      .replace("active", "")
  }
  for (let item of tooltips) {
    if (!item.className.match(" hidden")) {
      item.className += "hidden"
    }
  }
}
export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeButton: null
    }
  }
  undoTouchActive = (e) => {
    if (this.state.activeButton) {
      setTimeout(() => {
        if (!this.props.history.location.pathname.match("new-deposit")) {
          this.setState({activeButton: null})
        }
      }, 100)
    }
  }

  setTouchActive = (id) => {
    this.setState({activeButton: id})
  }

  render() {
    const { postMessage } = this.props.budgetInfo
    if (postMessage) {
      alert = () => {
        return (
          <div className='col white s12 red-text center alert-message'>
          <span>{this.props.budgetInfo.postMessage}</span>
          <span className="close-message" onClick={this.props.closePostAlert}> Close </span>
        </div>
        )
      }
    } else alert = () => null

    let background = this.state.activeButton
      ? " white "
      : ''
    return (
      <div
        onTouchStart={this.undoTouchActive}
        className={`${background} dash disable_text_highlighting`}>
          {alert()}
        {_
          .values(this.props.categories)
          .map((category, index) => {
            if (this.state.activeButton) {
              if (this.state.activeButton === category.id) {
                return (
                  <CategoryExpenseButton
                    active={true}
                    key={`category-${index}`}
                    offset={index % 2
                    ? 'non'
                    : ''}
                    category={category}
                    setTouchActive={this.setTouchActive}
                  />
                )
              } else {
                return (
                  <NonActiveButton
                    key={`category-${index}`}
                    offset={index % 2
                    ? 'non'
                    : ''}
                  />
                )
              }
            } else {
              return (
                <CategoryExpenseButton
                  key={`category-${index}`}
                  offset={index % 2
                  ? 'non'
                  : ''}
                  category={category}
                  setTouchActive={this.setTouchActive}
                />
              )
            }
          })}
      </div>
    )
  }
}

const mapStateToProps = (state, other) => {
  const { budgetInfo } = state
  const budget = _.get(state.firestore.ordered, 'budgets[0]')
  const categories = _.get(state.firestore.ordered, 'budgets[0].categories')
  const { auth } = state.firebase
  return {budget, categories, auth, budgetInfo}
}

const mapDispatchToProps = dispatch => {
	return {
    closePostAlert: (expense) => dispatch(closePostAlert(expense))
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(props => {
  const user = props.auth
  if (!user.uid) 
    return []
  return [
    {
      collection: 'budgets'
    }
  ]
}))(Dashboard)
