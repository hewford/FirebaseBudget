import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createCategory, editCategory } from '../../store/actions/budgetActions'
import { colors } from '../../utils/colors.js'

class CreateCategory extends Component {
  state = {
    category: '',
    budget: 0,
    colorPicker: false,
    color: ''
  }
  handleChange = (e) => {
    e.preventDefault();
    let {id, value} = e.target
    if (id === 'budget') value = (Number(e.target.value.replace(/[^0-9]+/g, ''))/100).toFixed(2)
    this.setState({
      [id]: value
    })
  }
  handleSubmit = (e) => {
    const { id } = this.props.match.params
    e.preventDefault();
    const { budget, color, category } = this.state
    if (id) {
      this.props.editCategory(budget, color, category, id)
    } else {
      this.props.createCategory({ budget, color, category })
    }
    this.props.history.push('/')
  }
  handleBack = (e) => {
    e.preventDefault();
    this.props.history.push('/')
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
  componentWillMount() {
    const { category } = this.props
    if (category) {
      this.setState({
        category: category.category,
        budget: category.budget,
        color: category.color
      })
    }
  }

  renderColorPicker = (colors) => {
    return (
      <div className="row px-1">
        {colors.map((color) => {
          return (
            <div key={color[0][0]} className="col s4 my-1">
              {color.map((shade, index) => {
                return (
                  <div key={shade[0] + index} onClick={this.setColor} data-color={`${shade[0]}-text text-${shade[1] || shade[0]}`} className={`${shade[0]} ${shade[1]} white-text bold-text my-1`}>
                    {shade[0]} <br/> {shade[1] ? shade[1] : ''}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { colorPicker } = this.state
    const { auth } = this.props
    if (!auth.uid) return <Redirect to="/" />
    let n = String(this.state.budget)
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

    const { id } = this.props.match.params

    return (
      <div className="container relative">
        <div className={`color-pick ${colorPicker ? '' : 'hide'}`}>
          <div className="input-field col s12 center">
            <button onClick={this.toggleColorPicker} className="my-2 btn black white-text lighten-1 z-depth-0">Close</button>
            {this.renderColorPicker(colors)}
          </div>
        </div>
        <form className={`white row ${colorPicker ? 'hide' : ''}`}>
            <h4 className="grey-text text-darken-3">{`${id ? "Edit" : "Add"} Category`}</h4>

            <div className="input-field input-entry offset-s3 col s6">
                <p className="input-label left">Category Name:</p>
                <input id='category' type="text" className={`category-name-input bold-text ${this.state.color}`}
                value={this.state.category}
                onFocus={moveCursorToEnd}
                onChange={this.handleChange}
                />
            </div>

            <div className="input-field input-entry offset-s3 col s6">
                <p className="input-label left">Budget Amount:</p>
                <input id='budget' type="text" pattern="[0-9]*" step="0.01" className="spent-input"
                value={value !== '0' ? value : ''}
                onChange={this.handleChange}
                />
            </div>

            <div className="col s12 center pick-color-btn">
              <button onClick={this.toggleColorPicker} className="btn my-1 pink lighten-1 z-depth-0">Pick Color</button>
            </div>
            
            <div className="input-field col s12 center">
                <button onClick={this.handleSubmit} className="btn my-1 pink lighten-1 z-depth-0">Submit</button>
                <button onClick={this.handleBack} className="mx-1 my-1 btn pink lighten-1 z-depth-0">Back</button>
                <br />
                <div className='red-text center'>
                {this.props.authError ? <p>{this.props.authError}</p> : null}
                </div>
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
  const { id } = props.match.params
	const { categories } = state.firestore.data
  const category = categories ? categories[id] : null
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: (category) => dispatch(createCategory(category)),
    editCategory: (budget, color, category, id) => dispatch(editCategory(budget, color, category, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory)
