import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import CategoryExpenseButton from './CategoryExpenseButton'
import { categories } from '../../../tempStubs'
import _ from 'lodash'

export class Dashboard extends Component {
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }
    render() {
        console.log(this.props)
        const email = _.get(this.props, 'auth.email')
        return (
            <div className="dash disable_text_highlighting">
                {/* {email || 'none'} */}
                {categories.map((category, index) => {
                    return (
                        <CategoryExpenseButton
                            key={`category-${index}`}
                            offset={index % 2 ? 'non' : ''}
                            category={category}
                        />
                    )
                })}

                {_.values(this.props.categories).map((category, index) => {
                    return (
                        <CategoryExpenseButton
                            key={`category-${index}`}
                            offset={index % 2 ? 'non' : ''}
                            category={category}
                        />
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state, other) => {
    console.log(state)
    const categories = _.get(state.firestore.ordered, 'budgets[0].categories')
    const history = _.get(categories, 'eatingOut.transactionHistory')

    const { auth } = state.firebase
    return {
        categories,
        auth
    }
}

//   const mapDispatchToProps = dispatch => {
//       return {
//       closePostAlert: (expense) => dispatch(closePostAlert(expense)),
//       updateForNewMonth: (data) => dispatch(updateForNewMonth(data))
//       }
//   }

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect( props => {
        const user = props.auth
        if (!user.uid) return []
        return [
            {
                collection: 'budgets'
            }
        ]
    })
)(Dashboard)
