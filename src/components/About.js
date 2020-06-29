import React, { Component } from 'react';

// Importing pages of About
import AboutInfo from './AboutInfo';


// styles import
import './css/about.css';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        // What will be returned in render
        return (
            
                <div >
                            <AboutInfo/>
                </div>
        );
    }
}

export default About;