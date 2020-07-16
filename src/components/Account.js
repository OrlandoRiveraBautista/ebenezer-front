import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { logOut } from '../models/GetSession';
import Cookies from 'js-cookies';
import jwt_decode from 'jwt-decode';

// Importing components
import CreatePost from './CreatePost';
import CreateEvent from './CreateEvent';

// Images
import youtubeIMG from './graphics/icons/youtube.svg';
import addUser from './graphics/icons/add-user.svg';
import moreOptions from './graphics/icons/plus.svg';
import logout from './graphics/icons/logout.svg';

// CSS
import './css/account.css';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // for user info
            userName: null,
            userImg: null,

            // for redirecting
            redirect: false,
            redirectToSignUp: false,
            redirectAfterLogOut: false,
        }
    }

    componentDidMount = () => {
        const jwt = Cookies.getItem('token');
        var decoded = jwt_decode(jwt);
        this.setState({
            userName: decoded.fullName,
            userImg: decoded.avatar
        })

    }

    updateYouTube = () => {
        this.setState({
            redirect: true
        })
    }

    redirectToSignUp = () => {
        this.setState({
            redirectToSignUp: true
        })
    }

    showMoreOptions = () => {
        var moreButton = document.getElementById('acc-actions')
        var logoutButton = document.getElementById('log-out');
        var adduserButton = document.getElementById('add-new-acc');

        // Adding the class active
        if (logoutButton) {
            logoutButton.classList.toggle('active');
            adduserButton.classList.toggle('active')
            moreButton.classList.toggle('active')
        } 
    }

    logout = () => {
        logOut();
        // This is set because sometimes it doesnt want to leave the account
        setTimeout( () => {
            this.setState({
                redirectAfterLogOut: true
            })
        }, 2000);
    }

    render() {
        if (this.state.redirect) {
            // Redirect user to Home after Thank You Message
            return <Redirect push to='/sermons' />
        }
        if ( this.state.redirectAfterLogOut ) {
            return <Redirect exact to='/login' />
        }
        if (this.state.redirectToSignUp) {
            return <Redirect push exact to='/signup' />
        }

        return(
            <Router>
                <Switch>
                    <div id='mainWrapper'>
                    <Route exact path='/account'>
                        <div className='container-fluid'>
                            <div className='identification'>
                                <h1>Bienvenido,</h1>
                                <div className='userID'>
                                    <div className='userImg-container'><img alt='userImg' src={this.state.userImg}></img></div>
                                    <h2><b>{this.state.userName}</b></h2>
                                </div>
                            </div>
                            <br></br>
                            <div className='create-container container'>
                                <h2>Crear Anuncio</h2>
                                <div className='create'>
                                    <CreatePost/>
                                </div>
                            </div>
                            <br></br>
                            <div className='create-container container'>
                                <h2>Crear Evento</h2>
                                <div className='create'> 
                                    <CreateEvent/>
                                </div>
                            </div>
                            <br></br>
                            <button onClick={this.updateYouTube} className='btn btn-outline-secondary'><img alt='youtube-img' src={youtubeIMG}></img>Update YouTube Link</button>
                            <div className='options-container'>
                                <button onClick={this.showMoreOptions} id='acc-actions' className='acc-actions'><img alt='acc-actions' src={moreOptions}></img></button> 
                                <button onClick={this.redirectToSignUp} id='add-new-acc' className='add-new-acc'><img alt='add-new-acc' src={addUser}></img></button>
                                <button onClick={this.logout} id='log-out' className='log-out'><img alt='log-out' src={logout}></img></button>
                            </div>
                        </div>
                    </Route>
                    </div>
                </Switch>
            </Router>
        );
    }
}

export default Account