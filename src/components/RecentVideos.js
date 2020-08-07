import React, { Component } from "react";

import axios from 'axios';

class RecentVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoIds: ''
        }
    }

    componentDidMount() {
        const videoId = [];
        const publishedAt = [];
        const title = [];
        const description = [];

        if ( this.props.recentvideos !== null ) {
            // Saving the data
            const videoData = this.props.recentvideos.data;

            videoData.forEach((video) => {
                // saving the ID
                videoId.push(video.videoid)
                publishedAt.push(video.publishedData);
                title.push(video.title);
                description.push(video.description);
            });
            this.setState({
                videoIds:
                    videoId

                // videoId
                // publishedAt,
                // title,
                // description

            })
            console.log(this.state.videoIds)

        } else {

            axios.get('https://cors-anywhere.herokuapp.com/https://ebenezer-final-server.now.sh/videos').then(response => {
                // Saving the data
                const videoData = response.data;
    
                videoData.forEach((video) => {
                    // saving the ID
                    videoId.push(video.videoid)
                    publishedAt.push(video.publishedData);
                    title.push(video.title);
                    description.push(video.description);
                });
                this.setState({
                    videoIds: 
                        videoId
                    
                        // videoId
                        // publishedAt,
                        // title,
                        // description
                    
                })
            });
        }
    }

    render() {

        if (this.state.videoIds !== '') {

            let elements = this.state.videoIds.map((element) => {
                return (<div className='previous-video'>
                    <div className='video'> 
                        <div className='video-iframe'>
                            <iframe title='youtubeVideo' src={'https://www.youtube.com/embed/' + element} id='ytplayer' width='100%' height='100%' frameBorder='0' allowFullScreen='allowFullScreen' ></iframe>
                        </div>
                        <div className='video-info'>
                            <div className='video-heading'>
                                <h3 key={element._id}><b>{element.title} </b></h3>
                                <span>{element.date}</span>
                            </div>
                            <p key={element._id}>{element.desiption}</p>
                        </div>
                    </div>
                </div>)
            })

            return (
                <div>
                    {elements}
                </div>
            )

        } else {

            return (<div></div>)
        }

    }
}

export default RecentVideos;