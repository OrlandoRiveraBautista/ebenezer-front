import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import "./css/home.css";
import "./css/account.css";

// Images
import youtubeIMG from "./graphics/icons/youtube.svg";
import sermonsIcon from "./graphics/icons/video-camera.svg";

// AXIOS
import axios from "axios";

// components
import Loading from "./indicator/Loading";

class UpdateYoutube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      submitted: false,
      upToDate: false,
      load: false,
    };
  }

  redirectToSermons = () => {
    this.setState(
      {
        redirect: true,
      },
      () => {
        if (this.props.YouTubeUpdated) {
          console.log(this.state.redirect);
          this.props.YouTubeUpdated(this.state.redirect);
        }
      }
    );
  };

  updateYouTube = () => {
    // Informing state of button press
    this.setState({
      submitted: true,
      load: true,
    });

    // ---------- Function to update the live video ----------- //
    axios
      .get("https://ebenezer-final-server.now.sh/live")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response) {
          this.setState(
            {
              redirect: true,
            },
            () => {
              if (this.props.YouTubeUpdated) {
                console.log(this.state.redirect);
                this.props.YouTubeUpdated(this.state.redirect);
              }
            }
          );
          console.log("Video Updated");
        } else {
          console.log("No Live Video" + response);
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          this.setState({
            upToDate: true,
            load: false,
          });
        }
      });
  };

  render() {
    // What will be returned in render
    return (
      <Router>
        <Switch>
          <div className="update-youtube container">
            <div className="update-youtube-header">
              <img alt="youtube-img" src={youtubeIMG}></img>
              <h2>Actualizar Video</h2>
            </div>

            <div className="update-youtube-preinstructions">
              <h4>
                <b>Video necesita estar LIVE en YouTube antes de actualizar.</b>
              </h4>
            </div>
            {this.state.submitted ? null : (
              <button
                onClick={this.updateYouTube}
                className="btn btn-outline-secondary"
              >
                <img alt="youtube-img" src={youtubeIMG}></img>Actualizar Video
              </button>
            )}
            {this.state.load ? <Loading /> : null}
            {this.state.upToDate ? (
              <div>
                <h4>El video ya está actualizado</h4>{" "}
                <button
                  onClick={this.redirectToSermons}
                  className="btn btn-outline-secondary"
                >
                  <img alt="sermonsIcon" src={sermonsIcon}></img>Ir a Sermones
                </button>
              </div>
            ) : null}
          </div>
        </Switch>
      </Router>
    );
  }
}

export default UpdateYoutube;
