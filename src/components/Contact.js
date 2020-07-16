import React, { Component } from 'react';

// Importing images
import greenphone from './graphics/icons/phone-green.svg';
import greenmessage from './graphics/icons/texting-green.svg';
import greenemail from './graphics/icons/email-green.svg';

// Importing Styles
import './css/contact.css'

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        // What will be returned in render
        return (
            <div className='container-fluid contact' id='mainWrapper'>
                <h1 className='main-text'>Ubicación</h1>
                <div className='video-container' id='map-container'>
                    <iframe title='googleMaps'  id="gmap_canvas" src="https://maps.google.com/maps?q=1713%20Charles%20Rd%2C%20Houston%2C%20TX%2077093&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                </div>
                <h1>Horario</h1>
                <p><b>Miercoles - </b>7:30pm</p>
                <p><b>Viernes - </b>7:30pm</p>
                <p><b>Domingo (Mañana) - </b>10:00am</p>
                <p><b>Domingo (Tarde) - </b>5:00pm</p>
                <br></br>
                <h1>Contacto</h1>
                <p><b>Telefono: </b>(281) 844-2909</p>
                <span>O Presione Uno</span>
                <div className='Contact-choises'>
                    <a href='tel:2818442909'><img alt='call-phone' src={greenphone}></img></a>
                    <a href='sms:2818442909'><img alt='message-phone' src={greenmessage}></img></a>
                </div>
                <br></br>
                <h1>Email</h1>
                <p><b>Email: </b>pfariasr48@gmail.com</p>
                <a href='mailto: pfariasr48@gmail.com'><img id='email-img' alt='email' src={greenemail}></img></a>
            </div>
        );
    }
}

export default Contact;