import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import navigate from '../../navigation';
import './login.css';
import selectPage from '../../helpers/selectPage';
import { signIn } from '../../store/actions/authActions';

export class Login extends Component {
    state = {
      email: '',
      password: '',
      count: 0
    }

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      });
    }

    handleSubmit = async(e) => {
      e.preventDefault();
      await this.props.signIn(this.state);
    }

    render() {
      const { auth } = this.props;
      if (auth.uid) {
        navigate.dashboard(this.props);
        return null;
      } else {
        selectPage('slidezero');
      }

      return (
        <form action={'#'} className={'form white'} onSubmit={this.handleSubmit}>
          <h5 className={'grey-text text-darken-3'}>Sign In</h5>
          <div className={'input-field'}>
            <label htmlFor={'email'}>Email</label>
            <input id={'email'} onChange={this.handleChange} type={'email'} />
          </div>
          <div className={'input-field'}>
            <label htmlFor={'password'}>Password</label>
            <input id={'password'} onChange={this.handleChange} type={'password'} />
          </div>
          <div className={'input-field'}>
            <button className={'btn pink lighten-1 z-depth-0'}>Submit</button>
            <div className={'red-text center'}>
              {this.props.authError ? <p>{this.props.authError}</p> : null}
            </div>
          </div>
          <div className={'form-footer'}>
            <p>Don't have an Account?</p>
            <Link className={'signup-link'} to={'/signup'}>Signup</Link>
          </div>
        </form>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


// route: login
// copy logic from version 1
// const { auth } = this.props
// if (auth.uid) return <Redirect to="/" />
// and margin-left: -100vw
