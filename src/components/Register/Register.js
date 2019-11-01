import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { resetFields, updateState } from "../../redux/AuthReducer/AuthReducer";
import { connect } from "react-redux";

class Register extends Component {
  state = {
    error: false
  };

  clickGoBack = () => {
    this.props.resetFields();
    this.props.history.push("/");
  };

  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };

  handleRegister = e => {
    e.preventDefault();
    axios
      .post("auth/register", {
        username: this.props.username,
        firstName: this.props.firstname,
        lastName: this.props.lastname,
        password: this.props.password
      })
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  render() {
    return (
      <div className="login__cont">
        <div className="login__cont__box">
          <form
            className="register__form"
            type="submit"
            onSubmit={this.handleRegister}
          >
            <input
              className="register__input"
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            ></input>
            <input
              className="register__input"
              placeholder="First Name"
              name="firstname"
              onChange={this.handleChange}
            ></input>
            <input
              className="register__input"
              placeholder="Last Name"
              name="lastname"
              onChange={this.handleChange}
            ></input>
            <input
              className="register__input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            ></input>
            <button onClick={this.handleRegister}>Register!</button>
          </form>
          <button onClick={this.clickGoBack}>Cancel</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.authReducer.username,
    firstname: state.authReducer.firstname,
    lastname: state.authReducer.lastname,
    password: state.authReducer.password
  };
};

export default connect(
  mapStateToProps,
  { updateState, resetFields }
)(Register);
