import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import formatToDollar from '../../../helpers/formatToDollar'
import { categories } from '../../../tempStubs'
import { addExpense } from '../../../store/actions/budgetActions'


class NewExpense extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			amount: '',
            location: '',
            description: '',
			rememberLocation: false
		}
	}

	componentWillMount() {
        this.category = categories[Number(this.props.match.params.id) - 1]; // TODO: to mapStateToProps
	}

	handleSubmit = async(e) => {
		await this.props.addExpense(this.props.auth.uid, this.props.category, this.state)
		this.setState({submitted: true})
	}

	handleBack = (e) => {
		e.preventDefault();
        this.props.history.push('/')
	}

	toggleRememberLocation = (e) => {
		e.preventDefault();
		this.setState({
			rememberLocation: !this.state.rememberLocation
		})
	}

	handleAmountChange = (e) => {
		e.preventDefault();
		let value = (Number(e.target.value.replace(/[^0-9]+/g, ''))/100).toFixed(2)
		this.setState({
			amount: value
		});
	}

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
            [e.target.id]: e.target.value
        })
	}

	setLocation = (e) => {
		this.setState({
			location: e.target.id
		})
	}

	checkAuth = (props) => {
	// 	const { auth, category } = this.props
	// 	if (!auth.uid) return { render: <Redirect to='/signin' /> }
		if (this.state.submitted) return { render: <Redirect to='/' /> }

		if (!this.props.category) {
			return { render:
				<div>
				</div>
			}
			// return { render: <Redirect to='/' /> }
		}
		return null
	}

	render() {
		const checkAuth = this.checkAuth()
		if (checkAuth) return checkAuth.render

		const { category } = this.props || this;

		const value = formatToDollar(this.state.amount)

		return(
			<div className="container center">
				<form className="form white row relative">
					<h5 className={`${category.color}`}> <span className="underline-text bold">Expense</span> Entry: <span>{category.name}</span></h5>

					<div className="input-field input-entry offset-s3 col s6">
						<p className="input-label left">Amount:</p>
						<input type="text" pattern="[0-9]*" step="0.01" className="spent-input"
						value={value !== '0' ? value : ''}
						onChange={this.handleAmountChange}
						/>
					</div>

                    <div className="input-field input-entry offset-s3 col s6">
						<p className="input-label left">Description:</p>
						<input id='description' type="text" className="description-input"
                            placeholder="Optional"
                            value={this.state.description}
                            onFocus={moveCursorToEnd}
                            onChange={this.handleChange}
						/>
					</div>

					<div className="input-field input-entry offset-s3 col s6">
						<p className="input-label left">Location:</p>
						<input id='location' type="text" className="location-input"
                            placeholder="Optional"
                            value={this.state.location}
                            onFocus={moveCursorToEnd}
                            onChange={this.handleChange}
						/>
					</div>

					<p>
						<label onClick={this.toggleRememberLocation}>
							<input type="checkbox" onChange={this.toggleRememberLocation} className="filled-in" checked={this.state.rememberLocation} />
							<span>Remember Location</span>
						</label>
					</p>

                    <div className="col s10 offset-s1">
						{category.locations ? category.locations.map((location, index) => {
							return(
								<div key={`location${index}`} id={location} onClick={this.setLocation} className="chip">
									{location}
								</div>
							)
						}) : null}
					</div>

					<div className="input-field col s12">
						<button onClick={this.handleSubmit} className="mx-1 btn pink lighten-1 z-depth-0">Submit</button>
						<button onClick={this.handleBack} className="mx-1 btn pink lighten-1 z-depth-0">Back</button>
						<br />
					</div>
				</form>
			</div>
		)
	}
}

function moveCursorToEnd(e) {
	const el = e.currentTarget
    if (typeof el.selectionStart === "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange !== "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

const mapStateToProps = (state, props) => {
	const { auth } = state.firebase
	const budgets = state.firestore.ordered.budgets

	if (!budgets) return { auth }
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
		addExpense: (uid, category, expense) => dispatch(addExpense(uid, category, expense))
	}
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect( props => {
        const user = props.auth
        if (!user.uid) return []
        return [
            {
                collection: 'budgets'
            }
        ]
    })
)(withRouter(NewExpense))