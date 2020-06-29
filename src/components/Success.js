import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';

// Importing images
import heart from './graphics/icons/heart.svg';

// CSS
import './css/success.css'

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount= () => {

        var url = window.location.href;
        url = url.substring(url.indexOf('?'));
        
        axios.get('/success', { params: url }).then((response) => {
            if( response.status === 200 ) {
                setTimeout(() =>{
                    this.setState({
                        redirect: true
                    })
                }, 3200);
            }
        })
    }
    
    render() {
        if(this.state.redirect) {
            // Redirect user to Home after Thank You Message
             return <Redirect to='/' />
        }

        return (
            <Router>
                <Switch>
                    <Route exact path='/Success'>

                        <div className='container thank-you-container'>
                            <h1>
                                Gracias Por Contribuir
                            </h1>
                            <div className='heart-svg'>
                                <img alt='heart-img' src={heart}></img>

                            </div>
                        </div>

                    </Route>
                </Switch>
            </Router>

        );
    }
}

export default Success;