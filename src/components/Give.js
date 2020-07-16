import React, { Component } from 'react';
import axios from 'axios';

// Importing styling
import './css/home.css';
import './css/give.css'

// Import Icons
import giveImg from './graphics/icons/give.svg'


class Give extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            dollars: null,
            cents: null,
            firstName: null,
            lastName: null,
            redirectLink: null,
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitGive = this.submitGive.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })

        const nameForm = document.getElementById('whenDiezmos').style;
        if(name === 'type' && value === 'Diezmo') {
            nameForm.opacity = '1'
            nameForm.display = 'block'
        } else if (name === 'type' && value === 'Ofrenda' || name === 'type' && value === 'Missiones') {
            nameForm.display = 'none'
        }
    }

    submitGive(event) {
        
        // Seding info to Server
        axios.post('/give',
            this.state
            , {
                onUploadProgress: progressEvent => {
                    console.log('Upload Progress: ' + (progressEvent.loaded / progressEvent.total * 100) + '%')
                }
            }).then((response) => {
                if ( response.data !== undefined ) {
                    const link = response.data.toString();
                    console.log(link)
                    this.setState ({
                        redirect: true,
                        redirectLink: link
                    }) 
                }


                // console.log(response.data.status)
                // if (response.data.status === 'SUCCESS') {
                //     this.setState({ redirect: true });
                // }


            }).catch((error) => {
                console.log(error)
            })
        
        event.preventDefault();
    }

    componentDidUpdate(prevProps, prevState) {

        if ( this.state.redirect !== prevState.redirect ) {
            window.location = this.state.redirectLink;

        }
        

    }

    // rendering in the intro
    render() {

        // what will be returned in the render
        return (
            <div className="container" id='mainWrapper'>
                <h1>Ofrenda</h1>
                <br></br>

                {/* Ofrenda Form */}
                <form onSubmit={this.submitGive} method='POST'>
                    <h2>Tipo de Ofrenda</h2>
                    <div className='control-group form-row align-items-center'>
                        <div className=' floating-label-form-group controls col-sm-3 my-1'>
                            <select className='custom-select mr-sm-2' id='type-of-give' name='type' onChange={this.handleChange} >
                                <option defaultValue>Escoje...</option>
                                <option value='Ofrenda'>Ofrenda</option>
                                <option value='Diezmo'>Diezmo</option>
                                <option value='Missiones'>Missiones</option>
                            </select>
                        </div>
                    </div>
                    <div className='row-sm-4 form-group'>

                        <div className='row'>

                            <div className="input-group col">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input type="text" data-type="currency" className="form-control" id="inlineFormInputGroupUsername" name='dollars' placeholder="Dolares" onChange={this.handleChange}></input>
                            </div>
                            <div className="input-group col">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">¢</div>
                                </div>
                                <input type="text" data-type="currency" className="form-control" id="inlineFormInputGroupUsername" name='cents' placeholder="Centavos" onChange={this.handleChange}></input>
                            </div>

                        </div>
                    </div>
                    <div id='whenDiezmos'>

                        <div className='control-group'>
                            <div className='form-group floating-label-form-group controls'>
                                <label>Nombre</label>
                                <input type='text' className='form-control' placeholder='Nombre' id='firstName' name='firstName' onChange={this.handleChange} ></input>
                            </div>
                        </div>
                        <div className='control-group'>
                            <div className='form-group floating-label-form-group controls'>
                                <label>Apellido</label>
                                <input type='currency' className='form-control' placeholder='Apellido' id='lastName' name='lastName' onChange={this.handleChange} ></input>
                            </div>
                        </div>

                    </div>
                    <br></br>
                    <div id='success'></div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-secondary' id='sendGiveButton' ><img alt='submit-icon' src={giveImg} ></img>Dar</button>
                    </div>
                </form>

            </div>
        )
    }
}

export default Give;