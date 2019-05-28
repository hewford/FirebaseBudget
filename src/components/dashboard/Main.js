import React from 'react';
// import EntryForm from './EntryForm.js'

const buttonColors = [
	['light-blue', 'black'],
	['blue-grey darken-1', 'white'],
	['red darken-1', 'white'],
	['indigo darken-1', 'white'],
	['purple lighten-3', 'black'],
	['light-green', 'black'],
	['blue-grey darken-4', 'white'],
	['red darken-4', 'white']
]
//darken-${2+Math.round(index/5)}

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
		};
    }
    
	componentWillMount = async() => {
		const response = await apiFetch();
		if (response) {
			const categories = response.data.categories;
			this.setState({
				categories
			});
		}
	}

	
	renderDashboard = () => {
		return(
			<div className="flex-container">
				{this.state.categories.map((category, index) => {
					// const gutter = index%2 ? null : (<div className="gutter-sm"></div>)
					// debugger
					const buttonColor = buttonColors[index%(buttonColors.length)]
					return (
						<div className={index%2 ? '' : 'gutter-right'}>
							<button
									value={category}
									onClick={this.handleCategorySelect}
									className={`btn border category-button ${buttonColor[0]} ${buttonColor[1]}-text`}>
									{category}
							</button>
						</div>
					)
				})}   
			</div>
		)
	}

	// renderEntryForm = () => {
	// 	return(
	// 		<EntryForm
	// 			handleBack={this.handleBack}
	// 			handleSubmit={this.handleSubmit}
	// 			category={this.state.category}/>
	// 	)
	// }
	
	render() {
		let alertMsg = null;
		if (this.state.message) {
			alertMsg = this.renderAlertMsg();
        }
		return (
			<div>
				{alertMsg}
				<div className="row">
					{this.renderDashboard()}
				</div>
			</div>
		)
	}
}


const apiFetch = () => {
	return {data: {
		categories: ['Groceries', 'Eating Out', 'Entertainment', 'Coffee', 'Matthew', 'Rachel', 'one' ,'two', 'three', 'four']
		}
	}
}
