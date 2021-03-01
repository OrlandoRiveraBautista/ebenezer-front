import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import axios from "axios";

// css
import "./css/home.css";
import "./css/createpost.css";
// image
import createNew from "./graphics/icons/createnew.svg";

// components
import Loading from "./indicator/Loading";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      fileName: "",
      title: "",
      body: "",
      file: null,
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.storeNewPost = this.storeNewPost.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "title" || name === "body") {
      this.setState({
        [name]: value,
      });
      console.log(this.state);
    } else {
      const file = target.files[0];
      this.setState({
        [name]: file,
        fileName: value,
      });
      console.log(this.state);
    }
  };

  storeNewPost(event) {
    // Letting the UI know the button was pressed
    this.setState({
      submitted: true,
    });

    const fileData = new FormData();
    fileData.append("file", this.state.file);
    fileData.append("title", this.state.title);
    fileData.append("body", this.state.body);

    // Saving the data
    axios
      .post(
        "https://ebenezer-final-server.now.sh/posts/store",
        fileData,
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
              <b>Nuevo Anuncio</b>
            </h3>
            <form onSubmit={this.storeNewPost} method="POST">
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
                  <label>Cuerpo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Detalles"
                    id="body"
                    name="body"
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
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
                    <label htmlFor="file" className="custom-file-label">
                      {this.state.fileName}
                    </label>
                  </div>
                </div>
              </div>
              <br></br>
              <div id="success"></div>
              <div className="form-group">
                {this.state.submitted ? (
                  <Loading />
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="sendMessageButton"
                  >
                    <img alt="submit-icon" src={createNew}></img>Crear
                  </button>
                )}
              </div>
            </form>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default CreatePost;
