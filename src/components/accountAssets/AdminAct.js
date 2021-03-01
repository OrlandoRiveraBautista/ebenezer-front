import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import Cookies from 'js-cookies';
import jwt_decode from 'jwt-decode';

// Importing components
import CreatePost from '../CreatePost';
// import CreateEvent from './CreateEvent';
import UpdateYouTube from '../UpdateYoutube';
import UserList from './UserList';

// CSS
import '.././css/account.css';
import '.././css/adminAct.css';

class AdminAct extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // for redirecting
            redirect: false,
            redirectToSignUp: false,
            redirectAfterLogOut: false,
        }
    }

    componentDidMount = () => {
        const jwt = Cookies.getItem('token');
        var decoded = jwt_decode(jwt);

    }

    updateYouTube = (data) => {
        this.setState({
            redirect: data
        }, () => {
            if (this.props.YouTubeUpdated) {
                console.log(this.state.redirect)
                this.props.YouTubeUpdated(this.state.redirect)
            }
        })
    }

    redirectToSignUp = () => {
        this.setState({
            redirectToSignUp: true
        })
    }

    render() {

        if (this.state.redirect) {
            return <Redirect push to='/sermons' />
        }

        return (
            <div className=''>
                <Router>

                    <Switch>

                        <Route path='/account'>

                        
                            <div className='account-nav'>
                                <NavLink exact to='/account' className='actHome'>Inicio</NavLink>
                                <NavLink to='/account/create' className='actCreate'>Crear</NavLink>
                                <NavLink to='/account/users' className='actUsers'>Usarios</NavLink>
                            </div>

                            <br></br>

                            {/* Update Youtube link */}
                            <Route exact path='/account'>
                                <div>
                                    <UpdateYouTube YouTubeUpdated={this.updateYouTube} />
                                </div>
                            </Route>



                            {/* Create */}
                            <Route exact path='/account/create'>
                                <div className='create-container container'>
                                    <h2>Crear Anuncio</h2>
                                    <div className='create'>
                                        <CreatePost />
                                    </div>
                                </div>
                                <br></br>
                                {/* <div className='create-container container'>
                                <h2>Crear Evento</h2>
                                <div className='create'> 
                                    <CreateEvent/>
                                </div>
                                </div> */}
                            </Route>
                            


                            {/* Users */}
                            <Route exact path='/account/users'>
                                <UserList allUsers = {this.props.allUsers}/>
                            </Route>



                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default AdminAct