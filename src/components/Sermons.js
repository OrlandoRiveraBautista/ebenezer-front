import React, { Component } from 'react';

import RecentVideos from './RecentVideos';

import './css/sermons.css';

// AXIOS
import axios from 'axios';

class Sermons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            YTEmbed: '',
            YTDescription: ''
        }
    }

    // Check for when the component has loaded
    componentDidMount = () => {

        // Geting current video
        if ( this.props.latestvideo !== null ) {

            // Getting data from props
            const videoData = this.props.latestvideo.data;

            // saving the ID
            const currentVidID = videoData.videoid;
            const videoDescription = videoData.description

            // Setting the Id to the embeded link
            if (currentVidID !== undefined) {
                this.setState({
                    YTEmbed: 'https://www.youtube.com/embed/' + currentVidID,
                    YTDescription: videoDescription
                })
            } else {
                console.error('Could Not Obtain Video ID');
            }

        } else {
            axios.get('https://cors-anywhere.herokuapp.com/https://ebenezer-final-server.now.sh/latestvideo').then(response => {
                // Saving the data
                const videoData = response.data;
                
                // saving the ID
                const currentVidID = videoData.videoid;
                const videoDescription = videoData.description
    
                // Setting the Id to the embeded link
                if( currentVidID !== undefined ) {
                    this.setState({
                        YTEmbed: 'https://www.youtube.com/embed/' + currentVidID,
                        YTDescription: videoDescription
                    })
                } else {
                    console.error('Could Not Obtain Video ID');
                }
                    
            });
        }

        // Check for when the state of the src has changed
        this.componentDidUpdate = (prevProps, prevState) => {
            const videoContainer = document.getElementById('current-video');

            // Stop loading animation after the embeded link has loaded
            if( prevState.YTEmbed !== this.state.YTEmbed ){
                setTimeout(() => {
                    videoContainer.style.animationName = 'none';   
                }, 2000);
            } else {
                console.error('Video Could Not Be Leaded')
            }

        }

    }

    render() {
        // What will be returned in render
        return (
            <div className='container-fluid' id='mainWrapper'>
                <h1 className='main-text'>Sermon Nuevo</h1>
                <div className='new-video'>
                    <div className="video-container" id='current-video' >
                        {/* Current Youtube Video on Channel */}
                        <iframe title='youtubeVideo' src={this.state.YTEmbed} id='ytplayer' width='100%' height='100%' frameBorder='0' allowFullScreen='allowFullScreen' ></iframe>
                    </div>
                    <p>{this.state.YTDescription}</p>
                </div>
                <div className='recent-videos'>
                    <h1 className='secondary-text'>Recientes</h1>
                    <RecentVideos recentvideos = { this.props.recentvideos }/>
                </div>
            </div>
        );
    }
}

export default Sermons;