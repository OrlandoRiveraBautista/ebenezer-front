import React, { Component } from 'react';
import axios from 'axios'

// Images
import confirmUser from './graphics/icons/tick.svg';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            fullName: null,
            file: null,
            role: null
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === 'email' || name === 'password' || name === 'fullName' || name === 'role') {
            this.setState({
                [name]: value
            })
        } else {
            const file = target.files[0]
            this.setState({
                [name]: file,
                fileName: value
            })
        }
    }

    storeNewUser = (event) => {
        const fileData = new FormData();
        fileData.append('file', this.state.file);
        fileData.append('email', this.state.email);
        fileData.append('password', this.state.password);
        fileData.append('fullName', this.state.fullName);
        fileData.append('role', this.state.role);

        // Saving the data
        axios.post('https://cors-anywhere.herokuapp.com/https://ebenezer-final-server.now.sh/signup',
            fileData
            , {
                onUploadProgress: progressEvent => {
                    console.log('Upload Progress: ' + (progressEvent.loaded / progressEvent.total * 100) + '%')
                }
            }).then((response) => {
                console.log(response.statusText)
                console.log(response.data.status)
                if (response.data.status === 'SUCCESS') {
                    console.log('New User was created')
                }
            }).catch((error) => {
                console.log(error)
            })
        
        event.preventDefault();
    }

    render(){
        return(
            <div className='container' id='mainWrapper'>
                <h1>Registro</h1>
                <form onSubmit={this.storeNewUser} method='POST' autoComplete="none">
                    <div className='control-group'>
                        <div className='form-group floating-label-form-group controls'>
                            <label>Email</label>
                            <input autoComplete="none" type='text' className='form-control' placeholder='Email' id='email' name='email' onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div className='control-group'>
                        <div className='form-group floating-label-form-group controls'>
                            <label>Password</label>
                            <input autoComplete="none" type='password' className='form-control' placeholder='Password' id='password' name='password' onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div className='control-group'>
                        <div className='form-group floating-label-form-group controls'>
                            <label>Nombre Completo</label>
                            <input autoComplete="none" type='text' className='form-control' placeholder='Nombre Completo' id='fullName' name='fullName' onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div className='control-group'>
                        <div className='form-group floating-label-form-group controls'>
                            <label>Foto</label><span><small> *proporción 1/1</small></span>
                            <div className='custom-file'>
                                <input autoComplete='on' type='file' accept='.svg, .png, .jpeg, .jpg' className='custom-file-input' id='file' name='file' multiple onChange={this.handleChange} value={this.state.fileName}></input>
                                <label for='file' className='custom-file-label' >{this.state.fileName}</label>
                            </div>
                        </div>
                    </div>
                    <div className='control-group form-row align-items-center'>
                        <div className=' floating-label-form-group controls col-md-3 my-1'>
                            <label>Tipo de Usuario</label>
                            <select className='custom-select mr-sm-2' id='type-of-give' name='role' onChange={this.handleChange} >
                                <option defaultValue>Escoje...</option>
                                <option value='admin'>Admin</option>
                                <option value='preacher'>Predicador</option>
                                <option value='basic'>Basico</option>
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <div id='success'></div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary' id='sendMessageButton' ><img alt='submit-icon' src={confirmUser} ></img>Registrar</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default SignUp;