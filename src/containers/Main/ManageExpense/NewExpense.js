import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import formatToDollar from '../../../helpers/formatToDollar'
import { categories } from '../../../tempStubs'

class NewExpense extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			spent: '',
            location: '',
            description: '',
			rememberLocation: false
		}
	}

	componentWillMount() {
        this.category = categories[Number(this.props.match.params.id) - 1]; // TODO: to mapStateToProps
		// this.setState({expenses: this.props.expenses})
	}

	handleSubmit = async(e) => {
		// e.preventDefault();
		// const {id} = this.props.match.params
		// await this.props.addExpense({id, ...this.state})
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
		if (this.state.submitted || !this.props.category) {
			return { render: <Redirect to='/' /> }
		}
		return null
	}

	render() {
		const checkAuth = this.checkAuth()
		if (checkAuth) return checkAuth.render

		const { category } = this.props || this;

		const value = formatToDollar(this.state.spent)

        // const style = {color: category.color}

		return(
			<div className="container center">
				<form className="form white row relative">
					<h5 className={`${category.color}`}> Expense Entry: <span>{category.name}</span></h5>

					<div className="input-field input-entry offset-s3 col s6">
						<p className="input-label left">Amount:</p>
						<input type="text" pattern="[0-9]*" step="0.01" className="spent-input"
						value={value !== '0' ? value : ''}
						onChange={this.handleSpentChange}
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

// renders new expense form:
    // Amount
    // Description (optional)
    // Location (optional)
    // remember location checkbox
    // list of remembered locations as tags
// Back Button --> routes to Home
// Submit sends new expense list (with added expense) to firebase
const mapStateToProps = (state, props) => {
	const category = _.get(state.firestore.ordered, `budgets[0].categories.${props.match.params.id
    }`, null)

    const { auth } = state.firebase
    return { auth, category }
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
)(withRouter(NewExpense))