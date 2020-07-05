import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie'

// Components
import Announcements from './Announcements';

// Styles
import './css/home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getPost: ''
        }
    }

    componentDidMount = () => {

        const postData = [];
        // Getting the posts from MongoDB
        axios.get('/posts').then(response => {
            // Getting the response data
            const posts = response.data;
            // Checking every single post
            posts.forEach((post) => {
                postData.push(post)
            })
            this.setState({
                getPost: postData
            })
        })

        // Checking the state
        this.componentDidUpdate = (YTEmbed) => {
            const loadingPost = document.getElementsByClassName('pre-post-container');
            const getPostData = this.state.getPost

            // Determine Post
            if ( getPostData !== '' && getPostData.length !== 0 ) {
                
                for(var i=0; i < loadingPost.length; i++ ){

                    loadingPost[i].style.display = 'none';
                }
            } 

        }

    }

    


    render( ) {

        // What will be returned in render
        return( 
            <Router>

                <Switch>

                    {/* Main home route */}
                    <Route exact path='/'>

                    <div className='container-fluid'>
                        <h1 className='main-text'>Bienvenidos</h1>
                        <div className="video-container">
                            {/* AN IFRAME WITH THE INTRO VIDEO FOR THE CHURCH WILL GO HERE */}
                        </div>
                        <div>
                            <h1 className='secondary-text'>Anuncios</h1>
                            {/* Here is where the posts generated by the admins will be */}
                            <div className='pre-post-container'>
                                <div className="background-masker header-top"></div>
                                <div className="background-masker header-left"></div>
                                <div className="background-masker header-right"></div>
                                <div className="background-masker header-bottom"></div>
                                <div className="background-masker subheader-left"></div>
                                <div className="background-masker subheader-right"></div>
                                <div className="background-masker subheader-bottom"></div>
                                <div className="background-masker content-top"></div>
                                <div className="background-masker content-first-end"></div>
                                <div className="background-masker content-second-line"></div>
                                <div className="background-masker content-second-end"></div>
                                <div className="background-masker content-third-line"></div>
                                <div className="background-masker content-third-end"></div>
                            </div>
                                <div className='pre-post-container'>
                                    <div className="background-masker header-top"></div>
                                    <div className="background-masker header-left"></div>
                                    <div className="background-masker header-right"></div>
                                    <div className="background-masker header-bottom"></div>
                                    <div className="background-masker subheader-left"></div>
                                    <div className="background-masker subheader-right"></div>
                                    <div className="background-masker subheader-bottom"></div>
                                    <div className="background-masker content-top"></div>
                                    <div className="background-masker content-first-end"></div>
                                    <div className="background-masker content-second-line"></div>
                                    <div className="background-masker content-second-end"></div>
                                    <div className="background-masker content-third-line"></div>
                                    <div className="background-masker content-third-end"></div>
                                </div>
                                <div className='pre-post-container'>
                                    <div className="background-masker header-top"></div>
                                    <div className="background-masker header-left"></div>
                                    <div className="background-masker header-right"></div>
                                    <div className="background-masker header-bottom"></div>
                                    <div className="background-masker subheader-left"></div>
                                    <div className="background-masker subheader-right"></div>
                                    <div className="background-masker subheader-bottom"></div>
                                    <div className="background-masker content-top"></div>
                                    <div className="background-masker content-first-end"></div>
                                    <div className="background-masker content-second-line"></div>
                                    <div className="background-masker content-second-end"></div>
                                    <div className="background-masker content-third-line"></div>
                                    <div className="background-masker content-third-end"></div>
                                </div>
                                
                                <div className='announcements'>
                                    <Announcements post={this.state.getPost} />
                                </div>
                        </div>
                    </div>

                    </Route>

                </Switch>

            </Router>
        );
    }
}

export default Home;