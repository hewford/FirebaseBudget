import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
// import { compose } from 'redux'
// import { firestoreConnect } from 'react-redux-firebase'
import { addExpense } from '../../store/actions/budgetActions'
// import moment from 'moment.js'
import ExpenseList from './ExpenseList'

class EntryForm extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			spent: '',
			location: '',
			rememberLocation: false
		}
	}

	componentWillMount() {
		this.setState({expenses: this.props.expenses})
	}
	
	handleSubmit = async(e) => {
		e.preventDefault();
		const {id} = this.props.match.params
		await this.props.addExpense({id, ...this.state})
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
	
	handleSpentChange = (e) => {
		e.preventDefault();
		let value = (Number(e.target.value.replace(/[^0-9]+/g, ''))/100).toFixed(2)
		this.setState({
			spent: value
		});
	}

	handleLocationChange = (e) => {
		e.preventDefault();
		this.setState({location: e.target.value})
	}

	setLocation = (e) => {
		this.setState({
			location: e.target.id
		})
	}

	checkAuth = (props) => {
		const { auth, category } = this.props
		if (!auth.uid) return { render: <Redirect to='/signin' /> }
		if (this.state.submitted || !category) return { render: <Redirect to='/' /> }
		return null
	}

	editCategory = () => {
		this.props.history.push(`/createcategory/${this.props.match.params.id}`)
	}

	editExpense = (e) => {
		this.setState({edit:e.target.dataset.id})
	}
	
	render() {
		const checkAuth = this.checkAuth()
		if (checkAuth) return checkAuth.render
		
		const { category } = this.props;	
		
		let n = String(this.state.spent)
		let value = Number(n).toLocaleString('en');
		if(value === '0') {
			value = ''
		}
		else if(value.indexOf('.') === -1) {
			value += '.00'
		}
		else if(n[n.length-1] === '0' && value.length > 1) {
			value += 0
		}
		value = '$'+ value

		return(
			<div className="container center">
				<form className="white row relative">
					<span onClick={this.editCategory} className="grey-text text-darken-3 options-button">edit</span>
					<h5 className={`${category.color}`}>Expense Entry: {category.category}</h5>

					<div className="input-field input-entry offset-s3 col s6">
						<p className="input-label left">Amount:</p>
						<input type="text" pattern="[0-9]*" step="0.01" className="spent-input"
						value={value !== '0' ? value : ''}
						onChange={this.handleSpentChange}
						/>
					</div>

					<div className="col s10 offset-s1">
						{category.locations ? category.locations.map((location, index) => {
							return(
								<div key={`location${index}`} id={location} onClick={this.setLocation} className="chip">
									{location}
								</div>
							)
						}) : null}
					</div>
					<div className="input-field input-entry offset-s3 col s6">
						<p className="input-label left">Location:</p>
						<input id='location-input' type="text" className="location-input"
						placeholder="Optional"
						value={this.state.location}
						onFocus={moveCursorToEnd}
						onChange={this.handleLocationChange}
						/>
					</div>
					

					<p>
						<label onClick={this.toggleRememberLocation}>
							<input type="checkbox" onChange={this.toggleRememberLocation} className="filled-in" checked={this.state.rememberLocation} />
							<span>Remember Location</span>
						</label>
					</p>

					

					<div className="input-field col s12">
						<button onClick={this.handleSubmit} className="btn pink lighten-1 z-depth-0">Submit</button>
						<button onClick={this.handleBack} className="mx-1 btn pink lighten-1 z-depth-0">Back</button>
						<br />
						<div className='red-text center'>
						{this.props.authError ? <p>{this.props.authError}</p> : null}
						</div>
					</div>
				</form>

				<ExpenseList expenses={this.props.expenses}/>

				{/* {this.state.expenses.map((expense, index) => {
					const date = new Date(expense.date.seconds * 1000).toDateString()
					if (this.state.edit == index) {
						console.log(expense)
						return(
							<div>Editing...</div>
						)
					} else {
						return(
							<div key={`expense-list-${index}`}className="card">
							<span onClick={this.editExpense} data-id={index} className="grey-text text-darken-3 options-button">edit</span>
								<div className="card-content">
									<span className={`card-title`}>{date}</span>
									<span>Spent: ${(expense.spent)}</span>
									<br/>
									<span>{expense.location}</span>
								</div>
							</div>
						)
					}
				})} */}
				
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
	const { id } = props.match.params
	const { categories } = state.firestore.data
	const category = categories ? categories[id] : null
	const expenses = category && category.expenses ? category.expenses.sort((a, b) => {return b.date.seconds - a.date.seconds}) : []
	return {
		auth: state.firebase.auth,
		category,
		expenses
	}
}
  
const mapDispatchToProps = dispatch => {
	return {
		addExpense: (expense) => dispatch(addExpense(expense))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EntryForm))
