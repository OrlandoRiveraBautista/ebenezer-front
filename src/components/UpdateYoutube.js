import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './css/home.css';
import './css/account.css';

// Images
import youtubeIMG from './graphics/icons/youtube.svg';

// AXIOS
import axios from 'axios'

class UpdateYoutube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }

    }


    updateYouTube = () => {


        // ---------- Function to update the live video ----------- //
        axios.get('https://cors-anywhere.herokuapp.com/https://ebenezer-final-server.now.sh/live').then(response => {
            if ( response ) {
                this.setState({
                    redirect: true
                }, () => {
                    if(this.props.YouTubeUpdated) {
                        console.log(this.state.redirect)
                        this.props.YouTubeUpdated(this.state.redirect)
                    }
                })
                console.log('Video Updated')
            } else {
                console.log('No Live Video' + response)
            }
        })


    }

    render() {

        // What will be returned in render
        return (
            <Router>
                <Switch>
                    <div className='update-youtube container'>
                        <div className='update-youtube-header'>
                            <img alt='youtube-img' src={youtubeIMG}></img>
                            <h2>Actualizar Video</h2>
                        </div>

                        <div className='update-youtube-preinstructions'>
                            <h4><b>Video necesita estar LIVE en YouTube antes de actualizar.</b></h4>

                        </div>
                        <button onClick={this.updateYouTube} className='btn btn-outline-secondary'><img alt='youtube-img' src={youtubeIMG}></img>Actualizar Video</button>
                    </div>
                </Switch>
            </Router>
        );
    }
}

export default UpdateYoutube;