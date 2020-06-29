import React, { Component } from "react";
import './css/person.css'

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    
    render() {
        

        return(
            <div className="person-container">
                <div className="person-picture-container">
                    <img alt='Person Pic' src={this.props.picture}></img>
                </div>
                <h3>{this.props.name}</h3>
                <h4>{this.props.title}</h4>
            </div>
        );
    }
}


export default Person;