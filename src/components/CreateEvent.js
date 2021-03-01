import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./css/home.css";
import "./css/createpost.css";

// image
import createNew from "./graphics/icons/createnew.svg";

// AXIOS
import axios from "axios";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      title: null,
      description: null,
      dateStart: null,
      dateEnd: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.storeNewEvent = this.storeNewEvent.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  storeNewEvent(event) {
    // Saving the data
    axios
      .post(
        "https://ebenezer-final-server.now.sh/posts/store",
        this.state,
        {
          withCredentials: true,
        },
        {
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload Progress: " +
                (progressEvent.loaded / progressEvent.total) * 100 +
                "%"
            );
          },
        }
      )
      .then((response) => {
        console.log(response.statusText);
        console.log(response.data.status);
        if (response.data.status === "SUCCESS") {
          this.setState({ redirect: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  }

  render() {
    // Redirect the page
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }
    // What will be returned in render
    return (
      <Router>
        <Switch>
          {/* Main home route */}

          <div className="container-fluid" id="mainWrapper">
            <h3>
              <b>Nuevo Evento</b>
            </h3>
            <form onSubmit={this.storeNewEvent} method="POST">
              <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                  <label>Titulo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Titulo"
                    id="title"
                    name="title"
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                  <label>Descripcion</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Detalles"
                    id="description"
                    name="description"
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>

              {/* Insert calendar picker here */}
              <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                  <label>Foto</label>
                  <span>
                    <small> *proporción 1/1</small>
                  </span>
                  <div className="custom-file">
                    <input
                      type="file"
                      accept=".svg, .png, .jpeg, .jpg"
                      className="custom-file-input"
                      id="file"
                      name="file"
                      multiple
                      onChange={this.handleChange}
                      value={this.state.fileName}
                    ></input>
                    <label for="file" className="custom-file-label">
                      {this.state.fileName}
                    </label>
                  </div>
                </div>
              </div>
              <br></br>
              <div id="success"></div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="sendMessageButton"
                >
                  <img alt="submit-icon" src={createNew}></img>Crear
                </button>
              </div>
            </form>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default CreateEvent;
