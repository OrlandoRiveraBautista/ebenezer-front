import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookies";
// import jwt_decode from 'jwt-decode';

// Extra Components
import Loading from "./indicator/Loading";

// CSS
import "./css/login.css";

// Images
import confirmUser from "./graphics/icons/tick.svg";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      redirect: false,
      submitted: false,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  loginUser = async (event) => {
    // Letting the UI know the button was pressed
    this.setState({
      submitted: true,
    });

    // Saving the data
    // @FIX For some reason when using the production API the token cannot be read through the Cookies.get() function
    axios
      .post("https://ebenezer-final-server.now.sh/login", this.state, {
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload Progress: " +
              (progressEvent.loaded / progressEvent.total) * 100 +
              "%"
          );
        },
      })
      .then(async (response) => {
        if (response.statusText === "OK") {
          await Cookies.setItem("token", response.data.token);
          const jwt = Cookies.getItem("token");

          if (jwt) {
            this.setState({
              redirect: true,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect exact to="/account" />;
    }

    return (
      <div className="login-container container" id="mainWrapper">
        <h1>Iniciar sesión</h1>
        <form onSubmit={this.loginUser} method="POST" autoComplete="none">
          <div className="control-group">
            <div className="form-group floating-label-form-group controls">
              <label>Email</label>
              <input
                autoComplete="none"
                type="text"
                className="form-control"
                placeholder="Email"
                id="email"
                name="email"
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls">
              <label>Password</label>
              <input
                autoComplete="none"
                type="password"
                className="form-control"
                placeholder="Password"
                id="password"
                name="password"
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <br></br>
          <div className="form-group">
            {this.state.submitted ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                id="sendMessageButton"
              >
                <img alt="submit-icon" src={confirmUser}></img>Iniciar
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
