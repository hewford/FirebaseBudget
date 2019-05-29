import React, { Component } from 'react'
import CategoryExpenseButton from './CategoryExpenseButton'
import { categories } from '../../../tempStubs'

export class Dashboard extends Component {
    render() {
        return (
            <div className="dash disable_text_highlighting">
                {categories.map((category, index) => {
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

export default Dashboard

// route: Home
// takes categories array and renders a list of CatergoryExpenseButtons