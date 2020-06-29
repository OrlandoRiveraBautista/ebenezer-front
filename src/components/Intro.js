import React, { Component } from 'react';

// Importing styling
import './css/Intro.css';

import logo from './graphics/EBZ Logo.png'

class Intro extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            
        }
    }

    // rendering in the intro
    render( ) {

        // what will be returned in the render
        return(
            <div className="container intro-content" >
                <div className='banner-container'>
                    <img alt='Greetings Man' src={logo}></img>
                    <h2 className="intro-banner">Somos Una Iglesia A Todo Dar</h2>
                </div>
            </div>
        )
    }
}

export default Intro;