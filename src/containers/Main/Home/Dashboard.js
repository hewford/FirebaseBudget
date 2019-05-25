import React, { Component } from 'react'
import CategoryExpenseButton from './CategoryExpenseButton'

const categories = [{color:"#FF6F00", name: "Personal1"}, {color:"#00D9C5", name: "Personal2"}, {color:"#FF00A2", name: "Personal3"}, {color:"#007AFF", name: "Personal4"}, {color:"#00B309", name: "Personal5"}, {color:"#6D4322", name: "Personal6"}]
export class Dashboard extends Component {
    render() {
        return (
            <div onclick="setDash()" className="dash">
                {categories.map((category, index) => {
                    return (
                        <CategoryExpenseButton
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