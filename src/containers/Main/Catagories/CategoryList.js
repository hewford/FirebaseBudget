import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import _ from 'lodash'
import CategoryListItem from './CategoryListItem'
import { categories } from '../../../tempStubs'

export class CategoryList extends Component {
    render() {
        return (
            <div className="dash center-list relative overflow-scroll">
                {categories.map((category, index) => {
                    return (
                        <CategoryListItem
                            key={`category-${index}`}
                            category={category}
                        />
                    )
                })}
                {_.values(this.props.categories).map((category, index) => {
                    return (
                        <CategoryListItem
                            key={`category-${index}`}
                            category={category}
                        />
                    )
                })}
                <div className="center-item">
                    <Link to="new-category" className="btn pink lighten-1 z-depth-0 center">New Category</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const categories = _.get(state.firestore.ordered, 'budgets[0].categories')
    const { auth } = state.firebase

    return { categories, auth }
}

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
)(CategoryList)
// TODO: requres auth to render
