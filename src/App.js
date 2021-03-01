import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import ProtectedRoute from "./models/ProtectedRoute";
import axios from "axios";

// importing components
import Intro from "./components/Intro";
import Home from "./components/Home";
import About from "./components/About.js";
import Sermons from "./components/Sermons";
import Contact from "./components/Contact";
import Pastor from "./components/Pastor";
import CreatePost from "./components/CreatePost";
import CreateEvent from "./components/CreateEvent";
import Give from "./components/Give";
import Success from "./components/Success";
import Account from "./components/Account";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Bible from "./components/Bible";

// Styles
import "./App.css";
import "typeface-spacegrotesk";

// importing images
import Logo from "./components/graphics/EBZ Logo.png";
import GiveImage from "./components/graphics/icons/give.svg";
import HomeImage from "./components/graphics/icons/home.svg";
import AboutImage from "./components/graphics/icons/network.svg";
import BibleImage from "./components/graphics/icons/bible.svg";
import ContactImage from "./components/graphics/icons/phone.svg";
import SermonsImage from "./components/graphics/icons/video-camera.svg";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTime: true, // This will make the welcome only come when you first go to the site
      A2H: false,

      latestposts: null, // This is to keep the post always there

      latestvideo: null, // This is for the latest video
      recentvideos: null, // This is for recent videos
      userAssignments: null,
    };
  }

  componentDidMount() {
    // To get the POSTS
    axios.get("https://ebenezer-final-server.now.sh/posts").then((response) => {
      this.setState({
        latestposts: response,
      });
    });

    // To get the data for the LATESTVIDEO only once
    axios
      .get("https://ebenezer-final-server.now.sh/latestvideo")
      .then((response) => {
        this.setState({
          latestvideo: response,
        });
      });

    // To get the data for the VIDEOS only once
    axios
      .get("https://ebenezer-final-server.now.sh/videos")
      .then((response) => {
        this.setState({
          recentvideos: response,
        });
      });

    // Get Assignments for BasicUser
    axios.get("http://localhost:5000/getUserInfo").then((response) => {
      this.setState({
        userAssignments: response.data.assignments,
      });
    });
  }

  render() {
    // function to switch between the intro and the home
    function Greetings(props) {
      const show = props.show;
      if (show) {
        return <Intro />;
      } else {
        return null;
      }
    }

    // to change the state of 'firstTime' from true to false
    if (this.state.firstTime === true) {
      setTimeout(() => {
        this.setState({
          firstTime: false,
        });
      }, 3200);
    }

    return (
      // the container for the full website
      <div className="container-fluid website-view">
        <Greetings show={this.state.firstTime} />

        {/* the navbar */}
        <Router>
          {/* The top of the Nav-Bar */}
          <div className="container-fluid" id="nav-bar-top">
            {/* Brand Icon */}
            <NavLink exact to="/" className="Logo">
              <img src={Logo} alt="Church Logo" id="brand-logo"></img>
            </NavLink>

            {/* Account */}
            <NavLink exact to="/account" className="Account"></NavLink>
            {/* Give Button */}
            <NavLink exact to="/give" className="Give">
              <img src={GiveImage} alt="Give Logo" id="give-image"></img>
              <h4 className="DT-GiveWords">Dar</h4>
            </NavLink>

            <div className="top-nav-items">
              {/* Home */}
              <NavLink exact to="/" className="Home DT-Home">
                <img alt="Home Logo" src={HomeImage}></img>
                <h4>Inicio</h4>
              </NavLink>
              {/* About */}
              <NavLink exact to="/about" className="About DT-About">
                <img alt="About Logo" src={AboutImage}></img>
                <h4>Conócenos</h4>
              </NavLink>
              {/* Sermons */}
              <NavLink exact to="/sermons" className="Sermons DT-Sermons">
                <img alt="Sermon Logo" src={SermonsImage}></img>
                <h4>Sermones</h4>
              </NavLink>
              {/* Contact */}
              <NavLink exact to="/contact" className="Contact DT-Contact">
                <img alt="Contact Logo" src={ContactImage}></img>
                <h4>Contacto</h4>
              </NavLink>
            </div>
          </div>

          {/* Content that will change according to the route */}
          <div className="content" id="content">
            <Switch>
              {/* Home Route */}
              <Route exact path="/">
                <Home latestposts={this.state.latestposts} />
                {/* <Greetings show = { this.state.firstTime }/> */}
              </Route>

              {/* About Route */}
              <Route exact path="/about">
                <About />
              </Route>
              {/* Nexted About Routes  
                  This is done so that it doesn't go away when it gets reloaded in the browser */}
              <Route exact path="/about/pastor">
                <Pastor />
              </Route>

              {/* Bible Route */}
              <Route exact path="/bible">
                <Bible />
              </Route>

              {/* Sermons Route */}
              <Route exact path="/sermons">
                <Sermons
                  latestvideo={this.state.latestvideo}
                  recentvideos={this.state.recentvideos}
                />
              </Route>

              {/* Contact Route */}
              <Route exact path="/contact">
                <Contact />
              </Route>

              {/* Give Route */}
              <Route exact path="/give">
                <Give />
              </Route>
              {/* If Giving is success */}
              <Route exact path="/success">
                <Success />
              </Route>

              {/* ------------ FOR AUTH USERS ------------ */}

              {/* LogIn Route */}
              <Route exact path="/login">
                <LogIn />
              </Route>

              {/* SignUp Route */}
              <ProtectedRoute exact path="/signup" component={SignUp} />

              {/* Create a New Post */}
              <ProtectedRoute
                exact
                path="/post/create"
                component={CreatePost}
              />

              {/* Create a New Event */}
              <ProtectedRoute
                exact
                path="/event/create"
                component={CreateEvent}
              />

              {/* Account Route */}
              <ProtectedRoute
                exact
                path="/account"
                component={Account}
                userAssignments={this.state.userAssignments}
              />
              <ProtectedRoute
                exact
                path="/account/create"
                component={Account}
                userAssignments={this.state.userAssignments}
              />
              <ProtectedRoute
                exact
                path="/account/users"
                component={Account}
                userAssignments={this.state.userAssignments}
              />
            </Switch>
          </div>

          {/* Nav-Bar for mobile at the Bottom */}
          <div className="container-fluid" id="nav-bar-bottom">
            <div className="bottom-nav">
              <NavLink exact to="/" className="Home">
                <img alt="Home Logo" src={HomeImage}></img>
              </NavLink>
              <NavLink exact to="/about" className="About">
                <img alt="About Logo" src={AboutImage}></img>
              </NavLink>
              <NavLink exact to="/bible" className="Bible">
                <img alt="Bible Logo" src={BibleImage}></img>{" "}
              </NavLink>
              <NavLink exact to="/sermons" className="Sermons">
                <img alt="Sermon Logo" src={SermonsImage}></img>
              </NavLink>
              <NavLink exact to="/contact" className="Contact">
                <img alt="Contact Logo" src={ContactImage}></img>
              </NavLink>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
