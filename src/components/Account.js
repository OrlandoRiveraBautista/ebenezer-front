import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { logOut } from '../models/GetSession';
import Cookies from 'js-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// Importing components
import AdminAct from './accountAssets/AdminAct'
import BasicAct from './accountAssets/BasicAct'

// Images
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
            userType: null,

            // for profile type
            profile: null, 
            profileProps: null,
            adminerole: true,

            // for redirecting
            redirect: false,
            redirectToSignUp: false,
            redirectAfterLogOut: false,


            // Props for other components within account
            allUsers: null
        }
    }

    componentDidMount = () => {

        const jwt = Cookies.getItem('token');
        var decoded = jwt_decode(jwt);
        this.setState({
            userName: decoded.fullName,
            userImg: decoded.avatar,
            userType: decoded.role
        })

    }

    componentDidUpdate(prevProps, prevState) {
        const state = this.state
        if ( prevState.userName !== state.userName ) {

            // Starting variable to check account
            var userType = state.userType;
            var props = null;

            if ( this.props.userAssignments !== null ) {
                props = this.props.userAssignments
            }

            // Profiles
            if (userType === 'admin') {

                if( !this.state.allUsers ) {
                    axios.get("http://localhost:5000/getUsers").then(response => {
                        const users = response.data;
                        this.setState({
                            allUsers: users
                        })
                    })
                }

                this.setState({
                    profile: AdminAct,
                    profileProps: props,
                    adminerole: true
                })
                
            } else if ( userType === 'basic' ) {
                this.setState({
                    profile: BasicAct,
                    profileProps: props,
                    adminerole: false
                })
            }

        }
    }

    updateYouTube = (data) => {
        this.setState({
            redirect: data
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
            if( !this.state.adminerole ) {
                logoutButton.classList.toggle('active');
                moreButton.classList.toggle('active')
            } else {
                logoutButton.classList.toggle('active');
                adduserButton.classList.toggle('active')
                moreButton.classList.toggle('active')
            }
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

        // Variables
        // const userType = this.state.userType;


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

        if ( this.state.profile !== null ) {

            return (
                <Router>
                    <Switch>
                        <div id='mainWrapper'>
                            <Route path='/account'>
                                <div className='container-fluid account-wrapper'>
                                    <div className='identification'>
                                        <div className='userID'>
                                            <div className='userImg-container'><img alt='userImg' src={this.state.userImg}></img></div>
                                            <h2>{this.state.userName}</h2>
                                        </div>
                                    </div>
    
                                    <this.state.profile userAssignments={this.state.profileProps} allUsers={this.state.allUsers} YouTubeUpdated={this.updateYouTube}/>
    
                                    {/* more button */}
                                    <div className='options-container'>
                                        <button onClick={this.showMoreOptions} id='acc-actions' className='acc-actions'><img alt='acc-actions' src={moreOptions}></img></button>
                                        { this.state.adminerole ? <button onClick={this.redirectToSignUp} id='add-new-acc' className='add-new-acc'><img alt='add-new-acc' src={addUser}></img></button> : null }
                                        <button onClick={this.logout} id='log-out' className='log-out'><img alt='log-out' src={logout}></img></button>
                                    </div>
                                </div>
                            </Route>
                        </div>
                    </Switch>
                </Router>
            );

        } else {
            return(<div><h1>No profile exists.</h1></div>)
        }
    }
}

export default Account