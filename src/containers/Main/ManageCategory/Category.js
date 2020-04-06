import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './category.css'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import formatToDollar from '../../../helpers/formatToDollar'
import { carryoverText, resetMonthlyText, text_colors } from '../../../helpers/contants'
import { createCategory, submitEdittedCategory } from '../../../store/actions/budgetActions'
import { connect } from 'react-redux'


export class Category extends Component {
    state = {
        name: '',
        color: '',
        budget: 0,
        balanceLogic: 'Carryover',
        locations: [],
        colorPicker: false,
    }

    componentWillMount() {
        console.log(this.props)
        if (this.props.category) {
            this.setState(this.props.category)
        }
    }

    componentWillReceiveProps(nextProps, props) {
        if (!props.category && nextProps.category) {
            this.setState(nextProps.category)
        }
    }

    handleSubmit = async(e) => {
        console.log(`submitting ${this.state.name}`)
        if (this.props.category) {
            await this.props.submitEdittedCategory(this.props.auth.uid, this.state)
        } else {
            await this.props.createCategory(this.props.auth.uid, this.state)
        }
        this.setState({submitted: true})
    }

    handleChange = (e) => {
        if (e.currentTarget.dataset.name) {
            this.setState({[e.currentTarget.dataset.name]: e.currentTarget.id})
        } else {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
    }

    handleNumberChange = (e) => {
        let value = (Number(e.target.value.replace(/[^0-9]+/g, ''))/100).toFixed(2)
		this.setState({
			budget: value
		});
    }

    removeLocation = (e) => {
        console.log(`removing ${e.target.id}`)
    }

    toggleColorPicker = (e) => {
        e.preventDefault();
        this.setState({
            colorPicker: !this.state.colorPicker
        })
    }

    setColor = (e) => {
        this.setState({
            color: e.target.dataset.color,
            colorPicker: false
        })
    }

    renderColorPicker = (colors) => {
        return (
          <div className="">
            {colors.map((color, index) => {
                const shade = color.split(' ')
                return (
                    <div key={color[0][0]+'-'+index} className="color-picker-button">
                        <div key={shade[0] + index} onClick={this.setColor} data-color={`${shade[0]}-text text-${shade[1] || shade[0]}`} className={`${shade[0]} ${shade[1]} white-text bold-text my-1`}>
                            {shade[0]}
                        </div>
                    </div>
                )
            })}
          </div>
        )
    }

    checkAuth = (props) => {
        // 	const { auth, category } = this.props
        // 	if (!auth.uid) return { render: <Redirect to='/signin' /> }
        if (this.state.submitted || (!this.category && this.state.edit)) return { render: <Redirect to='/' /> }
        return null
    }

    render() {
        const checkAuth = this.checkAuth()
        if (checkAuth) return checkAuth.render

        const { colorPicker, budget } = this.state

        const value = formatToDollar(budget)

        const { category } = this.props

        console.log(this.props.category ? true:false)

        return (
            <div className="container center main-section overflow-scroll relative" >
                <div className={`color-pick form overflow-scroll relative ${colorPicker ? '' : 'hide'}`}>
                    <div className="input-field col s12 center">
                        <button onClick={this.toggleColorPicker} className="my-2 btn black white-text lighten-1 z-depth-0">Close</button>
                        {this.renderColorPicker(text_colors)}
                    </div>
                </div>

				<form className="form white row">
					<h5>{category ? 'Edit' : 'New'} Category</h5>

                    <div className="input-field input-entry offset-s2 col s8">
						<p className="input-label left">Category Name:</p>
                        <input className={`${this.state.color} category-name`} type="text" id="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
					</div>

					<div className="input-field input-entry offset-s2 col s8">
						<p className="input-label left">Budget Amount:</p>
                        <input type="text" pattern="[0-9]*" step="0.01" className="spent-input"
                            id="budget"
                            value={value !== '0' ? value : ''}
                            onChange={this.handleNumberChange}
						/>
					</div>

                    <div className="offset-s2 col s8">
                        <button onClick={this.toggleColorPicker} className="mx-1 btn pink lighten-1 z-depth-0">
                            Pick Color
                        </button>
					</div>
                    {/* <div className="offset-s3 col s8">
                        <p id="Carryover" data-name="balanceLogic" onClick={this.handleChange} className="radio-btn-container">
                            <label>
                                <input name="group1" className="radio-btn"
                                    type="radio" defaultChecked={this.state.balanceLogic === "Carryover"} />
                                <span>Carryover</span>
                            </label>
                        </p>
                        <p id="Reset Monthly" data-name="balanceLogic" onClick={this.handleChange} className="radio-btn-container">
                            <label>
                                <input name="group1" className="radio-btn"
                                    type="radio" defaultChecked={this.state.balanceLogic === "Reset Monthly"} />
                                <span>Reset Monthly</span>
                            </label>
                        </p>
                    </div> */}

                    {/* {this.state.locations.length ? <div className="col s12 collection-overflow">
                        <ul class="collection">
						{this.state.locations.map((location, index) => {
                            return (
                                <li class="collection-item">
                                    <div className="align-left">{location}
                                        <span class="secondary-content">
                                            <i id={location} onClick={this.removeLocation} class="material-icons black-text">delete</i>
                                        </span>
                                    </div>
                                </li>
                            )
                        })}
                        </ul>
					</div> : null } */}

					<div className="input-field my-2 col s12">
						<button onClick={this.handleSubmit} className="mx-1 btn pink lighten-1 z-depth-0">Submit</button>
                        <br />
					</div>
				</form>

                <div onClick={this.handleClick} className={`card white`}>
                    <div className="card-content balance-logic-description align-left">
                        <p className="category-summary"><span className="bold">{this.state.balanceLogic}</span></p>
                        <p className="category-summary">
                            { this.state.balanceLogic === 'Carryover' ?
                                carryoverText :
                                resetMonthlyText }
                        </p>
                    </div>
                </div>
			</div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const { auth } = state.firebase
	const budgets = state.firestore.ordered.budgets
	if (!budgets || !props.match) return { auth }
	const budget = budgets.find(
		budget => budget.userId === auth.uid
	)
	if (!budget) return { auth }
	const category = budget.categories.find(
		category => category.id === props.match.params.id
    ) || null

    return { auth, category }
}

const mapDispatchToProps = dispatch => {
	return {
        createCategory: (uid, category) => dispatch(createCategory(uid, category)),
        submitEdittedCategory: (uid, category) => dispatch(submitEdittedCategory(uid, category))
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(props => {
    const user = props.auth
    if (!user.uid)
      return []
    return [
      {
        collection: 'budgets'
      },
      {collection:"categories"}
    ]
  }))(Category)

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Category))

// reads params (params: edit & category_uid)
// if edit and category_uid, render category data to be edited
// else render blank form for new category
// copy from version 1
