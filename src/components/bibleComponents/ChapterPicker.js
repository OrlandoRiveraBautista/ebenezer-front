import React, { Component } from 'react';
import { BrowserRouter as Link, Redirect } from "react-router-dom";
// import Cookies from 'js-cookies';

class ChapterPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chapterPicked: null,
            didPickChapter: false
        }
    }

    handleClick = (event) => {
        event.preventDefault();
        const target = event.target;
        const name = target.getAttribute('name');

        this.setState({
            chapterPicked: name,
            didPickChapter: true
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.chapterPicked)
            }
        })
    }

    render() {
        if (this.state.didPickChapter) {
            return <Redirect push to='/bible/chapter/verse' />
            // this.props.history.push('/bible/chapter/verse');
        }

        const bookChapters = this.props.bookData;
        // Cookies.setItem('bookCookie', this.props.bookData);
        
        if ( bookChapters.length !== 0 ) {
            console.log(bookChapters)

            let elements = bookChapters.map((element) => {
                return (
                    <div key={element.id} className='numeric-list'>
                        <ol>
                            <li className='grid'>
                                <a href='/bible/chapter/verse' onClick={this.handleClick} name={element.id} className='grid-link'>
                                    {element.number}
                                </a>
                            </li>
                        </ol>
                    </div>
                )
            })

            return (
                <div>
                    <h3>Capitulos</h3>
                    <div className='chapters'>
                        {elements}
                    </div>
                </div>
            )

        } else {

            return (<div></div>)
        }
    }
}

export default ChapterPicker;