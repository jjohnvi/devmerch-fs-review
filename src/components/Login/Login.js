import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateState,
  resetFields,
  loginUser
} from "../../redux/AuthReducer/AuthReducer";

class Login extends Component {
  state = {
    error: false
  };

  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };

  clickLogin = e => {
    e.preventDefault();
    this.props
      .loginUser(this.props.username, this.props.password)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  render() {
    console.log(this.props.username);
    return (
      <div className="login__cont">
        <div className="login__cont__box">
          <form
            className="login__form"
            type="submit"
            onSubmit={this.clickLogin}
          >
            <input
              className="register__input"
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            ></input>
            <input
              className="register__input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            ></input>
            <button onClick={this.loginUser}>Login</button>
            <Link to="/register">
              <button>Register!</button>
            </Link>
          </form>
          {this.state.error === true ? (
            <div>Wrong username or password.</div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.authReducer.username,
    password: state.authReducer.password
  };
};

export default connect(
  mapStateToProps,
  { updateState, resetFields, loginUser }
)(Login);
