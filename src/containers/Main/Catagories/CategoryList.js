import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CategoryListItem from './CategoryListItem'
import { categories } from '../../../tempStubs'

export class CategoryList extends Component {
    render() {
        return (
            <div className="dash center-list">
                {categories.map((category, index) => {
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

export default CategoryList

// route: manage category
// renders category list items
// gets category list from firebase
// requres auth to render

// click logic exists within each category list item (child component, not here)