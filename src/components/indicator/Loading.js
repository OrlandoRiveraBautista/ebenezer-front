import React, { Component } from 'react';

// Importing styling
import './loading.css';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // rendering in the intro
    render() {

        // what will be returned in the render
        return (
            <div className='loading' >
                <svg className="spinner" width="45px" height="45px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div>
        )
    }
}

export default Loading;