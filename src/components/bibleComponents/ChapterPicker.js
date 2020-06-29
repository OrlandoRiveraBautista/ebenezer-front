import React, { Component } from 'react';
import { BrowserRouter as Redirect } from "react-router-dom";
import Cookies from 'js-cookies';

// @FIX ---!!---
// AFTER CHAPTER IS PICKED I TRIED TO PUSH THE URL TO /BIBLE/CHAPTER/VERSE BUT, 
// FOR SOME REASON IT DOESN'T CHANGE THE URL AND IT JUST DISPLAYS A BLANK SCREEN.

class ChapterPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chapterPicked: null,
            didPickChapter: false
        }
    }

    handleClick = (event) => {
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
        }

        const bookChapters = this.props.bookData;

        if ( bookChapters.length !== 0 ) {

            let elements = bookChapters.map((element) => {
                return (
                    <div key={element.id} className='list-container numeric-list'>
                        <ol>
                            <li href={element.id} className='grid'>
                                <a onClick={this.handleClick} name={element.id} className='grid-link'>
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
                    {elements}
                </div>
            )

        } else {

            return (<div></div>)
        }
    }
}

export default ChapterPicker;