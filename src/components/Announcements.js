import React, { Component } from "react";
import './css/home.css'
import './css/announcements.css'

class Announcements extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render() {

        const postData = this.props.post;

        if( postData !== '' ){

            let elements = this.props.post.map((element) => {
                return (<div className='current-posts'>
                                <div className='ann-container'> {/* ann = announcement */}
                                    <div className='ann-image-container'>
                                        <img alt={element._id} key={element._id} src={element.image}></img>
                                    </div>
                                    <div className='ann-info'>
                                        <div className='ann-heading'>
                                            <h3 key={element._id}><b>{element.title} </b></h3>
                                            <span>{element.date}</span>
                                        </div>
                                        <p key={element._id}>{element.body}</p>
                                    </div>
                                </div>
                            </div>)
            })

            return(
                <div>
                    {elements}
                </div>
            )

        } else {
            
            return (<div></div>)
        }

    }
}

export default Announcements;
