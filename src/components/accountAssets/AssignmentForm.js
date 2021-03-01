import React, { Component } from 'react'
import axios from 'axios'

// css
import '../css/userList.css'

// Components
import Loading from '../indicator/Loading'

class AssignmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            otroDesBod: false

        }
    }

    storeNewPost(event) {

        // Letting the UI know the button was pressed
        this.setState({
            submitted: true
        })
    }

    handleChange = (e) => {
        const target = e.target;
        console.log(target.value)


        // Assignment UI 
        if( target.value === 'other' || target.value === 'preaching' ) {
            document.getElementById(target.name).classList.toggle('active')

            // checking for other assignment
            if ( target.value === 'other' ) {
                this.setState({
                    otroDesBod: true
                })
            } else {
                if ( this.state.otroDesBod ) {
                    this.setState({
                        otroDesBod: false
                    })
                }
            }
        }

    }
    
    otroDesBod = () => {
        return( 
        <div>
            <div className='control-group'>
                <div className='form-group floating-label-form-group controls'>
                    <label>Topico</label>
                    <input type='text' className='form-control' placeholder='Topico' id='topic' name='topic' onChange={this.handleChange}></input>
                </div>
            </div>
        </div> )
    }
    render () {
        return (
            <div>
                <h3>Requisitos de Asignación</h3>
                <br></br>
                <form onSubmit={this.storeNewPost} method='POST'>
                    <div className='control-group'>
                        <div className='form-group floating-label-form-group controls'>
                            <label>Asignación</label>
                           
                            <div className="btn-group btn-group-toggle form-check" data-toggle='buttons'>
                                <label className='btn btn-outline-primary' id='preaching' >
                                    <input className='form-check-input ' type="radio" name="preaching" value='preaching'  onClick={this.handleChange}/><span>Predicacion</span>
                                </label>
                                <label className='btn btn-outline-primary' id='other' >
                                    <input className='form-check-input' type="radio" name="other" value='other' onClick={this.handleChange} /><span>Otro</span>
                                </label>

                            </div>
                        </div>
                    </div>

                    {this.state.otroDesBod ? <div><this.otroDesBod /></div> : null}
                    
                    <div className="form-group row">
                        <label htmlFor="example-date-input" className="col-2 col-form-label">Date</label>
                        <div className="col-10">
                            <input className="form-control" type="date" id="example-date-input" onChange={this.handleChange}></input>
                        </div>
                    </div>

                    <br></br>
                    <div id='success'></div>
                    <div className='form-group'>
                        {this.state.submitted ? <Loading /> : <button type='submit' className='btn btn-primary' id='sendMessageButton' >Asignar</button>}
                        <input className='btn btn-alert' type='reset'></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default AssignmentForm