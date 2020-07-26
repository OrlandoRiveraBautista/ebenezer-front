import React, { Component } from 'react';


// AXIOS
import axios from 'axios';

class Sermons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            YTEmbed: ''
        }
    }

    // Check for when the component has loaded
    componentDidMount = () => {

        // ---------- THIS WAS THE OLD WAY OF DOING IT ----------
        // Get information from the API
        // axios.get('/videos').then(response => {
        //     const videoData = response.data;
        //     console.log(videoData);
        //     videoData.forEach( (video) => {
        //         const currentVidID = video.snippet.resourceId.videoId;

        //         // Set the state of the src to the correct link
        //         this.setState({
        //             YTEmbed: 'https://www.youtube.com/embed/' + currentVidID
        //         });
        //     })
        // });
        

        // Geting current video
        axios.get('https://cors-anywhere.herokuapp.com/https://ebenezer-final-server.now.sh/videos').then(response => {
            // Saving the data
            const videoData = response.data;
            
            videoData.forEach( (video) => {
                // saving the ID
                const currentVidID = video.videoid;

            // Setting the Id to the embeded link
            if( currentVidID !== undefined ) {
                this.setState({
                    YTEmbed: 'https://www.youtube.com/embed/' + currentVidID
                })
            } else {
                console.error('Could Not Obtain Video ID');
            }
                
            });
        });

        // Check for when the state of the src has changed
        this.componentDidUpdate = (YTEmbed) => {
            const videoContainer = document.getElementById('current-video');

            // Stop loading animation after the embeded link has loaded
            if( this.state.YTEmbed !== ''){
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
                <div className="video-container" id='current-video' >

                    {/* Current Youtube Video on Channel */}
                    <iframe title='youtubeVideo' src={this.state.YTEmbed} id='ytplayer' width='100%' height='100%' frameBorder='0' allowFullScreen='allowFullScreen' ></iframe>
                </div>
                <p>This new sermon is about something that I havent seen yet.</p>
            </div>
        );
    }
}

export default Sermons;