import React, {Component} from 'react';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleLogin = e => {
    e.preventDefault();
    console.log("email", this.state.email, "pw", this.state.password);
    this.props.onLogin(this.state.email, this.state.password);
  }

  handleSignUp = e => {
    e.preventDefault();
    console.log("email", this.state.email, "pw", this.state.password);
    this.props.onSignUp(this.state.email, this.state.password);
  }

  render() {
    return(
      <>
        <form className="login-container" name="login">
          <p>
            <strong><label htmlFor="email">Email: </label></strong>
            <input type="email" onChange={e => {this.setState({email: e.target.value})}} />
          </p>
          <p>
            <strong><label htmlFor="password">Password: </label></strong>
            <input type="password" onChange={e => {this.setState({password: e.target.value})}} />
          </p>
          <p>
            <button className="login-button" type="submit" onClick={this.handleLogin} disabled={!this.state.email && !this.state.password}>Log In</button>
            <button className="login-button" type="submit" onClick={this.handleSignUp} disabled={!this.state.email && !this.state.password}>Sign Up</button>
          </p>
        </form>
      </>
    )
  }
}

export default Login;
