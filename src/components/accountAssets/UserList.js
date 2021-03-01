import React, { Component } from 'react'
import axios from 'axios'

// css
import '../css/userList.css'

// Components
import AssignmentForm from './AssignmentForm'
import Loading from '../indicator/Loading'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: null,

            // To expand user list
            expandedId: null,

        }
    }

    componentDidMount = () => {
        this.setState({
            allUsers: this.props.allUsers
        })
        
        setTimeout(() => {
            if( !this.props.allUsers && !this.state.allUsers ) {
                axios.get("http://localhost:5000/getUsers").then(response => {
                    const users = response.data;
                    this.setState({
                        allUsers: users,

                    })
                })
            } 
        }, 3000)
    }

    componentDidUpdate(prevProps, prevState) {
        if ( prevProps !== this.props ) {
            this.setState({
                allUsers: this.props.allUsers
            })
        }
    }

    expandUser = (event) => {
        const id = event.currentTarget.id;
        console.log('div was clicked' + id)

        if( this.state.expandedId ) {

            if ( id !== this.state.expandedId ) {
                var userContainer = document.getElementById(`${this.state.expandedId}`);
                userContainer.classList.remove('active');
    
                userContainer = document.getElementById(`${id}`);
                userContainer.classList.toggle('active');
                
                this.setState({
                    expandedId: id
                })
    
            } else {
                userContainer = document.getElementById(`${id}`);
                userContainer.classList.toggle('active');
            }
        } else {
            userContainer = document.getElementById(`${id}`);
            userContainer.classList.toggle('active');
            this.setState({
                expandedId: id
            })
        }

    }
    

    render() {

        if( this.state.allUsers !== null ) {
            const allUsers = this.state.allUsers;
            let userList = allUsers.map((element) => {
                return(
                    <div className='user-container' id={element._id} key={element._id}>
                        <div className='user-info' id={element._id} onClick={this.expandUser}>
                            <div className='user-avatar'>
                                <img src={element.image}></img>
                            </div>
                            <p>{element.fullName}</p> <span>{element.role}</span>
                        </div>
                        <div className='user-assignment'>
                            <br></br>
                            <AssignmentForm/>
                        </div>
                    </div>
                )
            })

            return(
                <div className='userList'>
                    {userList}
                </div>
            )
        } else {

            return (
                <div className='container'>
                    <h2>Loading users</h2>
                    <Loading/>
                </div>
            )
        }


    }
}

export default UserList;