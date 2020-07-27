import React, { Component } from 'react';
import axios from 'axios';


class VerseViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verses: [],
            nextVerse: null,
            startVerse: null
        }
        // this.componentDidMount = this.componentDidMount.bind(this)
    }

    // To check when data update
    componentDidUpdate(prevProps, prevState) {
        
        // Once the props have been updated by parent component assign data to state
        if( prevProps.verseData !== this.props.verseData ) {
            this.setState({
                nextVerse: this.props.verseData,
                startVerse: this.props.verseData
            })
        }
        
        // Once state is changed get back data for all the verses
        if( prevState.nextVerse !== this.state.nextVerse ) {
            var verseData
            var nextVerse
            var joinedVerses

            // Base Chapter Limit
            const limitChapter = this.state.startVerse.substr( 0, this.state.startVerse.indexOf('.') + 2 )
            var chapter = this.state.nextVerse.substr( 0, this.state.startVerse.indexOf('.') +2 )

            // If statement to terminate GET after all chapter's verses have been retrieved
            if( chapter === limitChapter ) {

                axios.get(`https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/verses/${this.state.nextVerse}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`, { headers: { 'api-key': '7dbe0c4776c211bd9f6bdfe5b3f6694a' } }).then ( async response => {
                    // console.log(response)

                    // Getting the data from response
                    verseData = response.data.data

                    // Concating data together
                    joinedVerses = this.state.verses.concat(verseData)
                    console.log(joinedVerses)
                    
                    // Getting the next chapter id
                    nextVerse = response.data.data.next.id

                    // Setting data to state
                    this.setState({
                        verses: joinedVerses,
                        nextVerse: nextVerse
                    })
                })

            }

        }
        
    }

    render() {
        const versesData = this.state.verses

        if ( versesData.length !== 0 ) {

            let elements = versesData.map((element) => {
                return (
                    <div key={element.id} className='list-container'>
                        <span>{element.content}</span>
                    </div>
                )
            })
    
            return (
                <div>
                    <h3>Versiculos</h3>
                    {elements}
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }
        
    }
}

export default VerseViewer;