import React, { Component } from 'react'
import Cookies from 'js-cookies';
import axios from 'axios'

// CSS
import '.././css/account.css';

class BasicAct extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // for redirecting
            redirect: false,
            redirectToSignUp: false,
            redirectAfterLogOut: false,

            // assignments
            question: null,
            userAssignments: null
        }
    }

    componentDidMount = () => {
        const jwt = Cookies.getItem('token');

        // Check if props was passed
        if( this.props.userAssignments !== null ) {
            var questions = this.props.userAssignments;
            this.setState({
                question: questions
            })
        }

        // Check Database for new entries
        axios.get("http://localhost:5000/getUserInfo").then(response => {
            const userAssignments = response.data.assignments;
            this.setState({
                userAssignments: userAssignments
            })

            // Check if props is present 
            if ( this.props.userAssignments !== null ) {
                // Check if data hasnt changed
                if( this.props.userAssignments[0].question !== this.state.userAssignments[0].question ) {
                    // Update page if it has changed
                    questions = this.state.userAssignments[0];
                    this.setState({
                        question: questions
                    })
                } else {
                    console.log("Everything is up to date")
                }
            } else {
                // If props arent here check database
                questions = this.state.userAssignments;
                this.setState({
                    question: questions
                })
            }
        })


    }

    updateYouTube = (data) => {
        this.setState({
            redirect: data
        })
    }

    redirectToSignUp = () => {
        this.setState({
            redirectToSignUp: true
        })
    }

    render() {

        // Making the list of questions
        if ( this.state.question !== null ) {
            let questionElement = this.state.question.map((element) => { //map doesnt work because its not array of data
                return(
                    <div>
                        {element.question}
                    </div>
                )
            })

            return (
                <div className=''>
                    <br></br>
                    <h1>This is a basic profile</h1>
                    {/* <p>{this.state.question}</p> */}
                    {questionElement}
                </div>
            );
        } else {
            return (
                <div className=''>
                    <br></br>
                    <h1>This is a basic profile</h1>
                    <p>No questions yet</p>
                </div>
            );
        }

    }
}

export default BasicAct