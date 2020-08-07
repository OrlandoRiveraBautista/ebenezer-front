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
                <div className='schedule'>
                    <h1>Horario</h1>
                    <ul>
                        <li><p><b>Miercoles - </b>7:30pm</p></li>
                        <li><p><b>Viernes - </b>7:30pm</p></li>
                        <li><p><b>Domingo (Mañana) - </b>10:00am</p></li>
                        <li><p><b>Domingo (Tarde) - </b>5:00pm</p></li>
                    </ul>
                </div>
                <br></br>
                <div className='contact-info'>
                    <h1>Contacto</h1>
                    <ul>
                        <li><p><b>Telefono: </b>(281) 844-2909</p></li>
                    </ul>
                    <div className='phone-choices'>
                        <a href='tel:2818442909'><img alt='call-phone' src={greenphone}></img></a>
                        <a href='sms:2818442909'><img alt='message-phone' src={greenmessage}></img></a>
                        <span>Presione Uno</span>
                    </div>
                    <br></br>
                    <div className='email-choices'>
                        <h1>Email</h1>
                        <ul>
                            <li><p><b>Email: </b>pfariasr48@gmail.com</p></li>
                        </ul>
                        <div className='email-button'>
                            <a href='mailto: pfariasr48@gmail.com'><img id='email-img' alt='email' src={greenemail}></img></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;