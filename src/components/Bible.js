import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookies';

// Components
import BookPicker from './bibleComponents/BookPicker';
import ChapterPicker from './bibleComponents/ChapterPicker';
import VerseViewer from './bibleComponents/VerseViewer';

// CSS
import './css/bible.css';

// Images
import searchImg from './graphics/icons/search.svg'


class Bible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'Biblia',
            currentChapter: null,
            bookData: [],
            verseData: []
        }
    }

    // Search bar animation --------------------------------------------------------------|
    Search = () => {
        const searchContainer = document.getElementById('search-container');
        const searchInput = document.getElementById('search-input')
        searchContainer.style.width = '200px'
        setTimeout( () => {
            searchInput.style.display = 'inline'
            searchInput.focus();
        }, 200)
    }
    NoSearch = () => {
        const searchContainer = document.getElementById('search-container');
        const searchInput = document.getElementById('search-input')
        searchContainer.style.width = '38px'
        searchInput.style.display = 'none'  
    }
    // --------------------------------------------------------------------------------------------|

    // Saving the information for the chapter picked
    bookEventHandler = data => {
        this.setState({
            currentPage: data
        })
    }
    chapterEventHandler = data => {
        this.setState({
            currentChapter: data
        })
    }

    // Getting the data when a chapter is picked
    componentDidUpdate(prevProps, prevState) {
        if ( prevState.currentPage !== this.state.currentPage ) {
            const books = [];
            axios.get(`https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/books/${this.state.currentPage}?include-chapters=true`, { headers: { 'api-key': '7dbe0c4776c211bd9f6bdfe5b3f6694a' }}).then(response => {
                // Getting the response data
                const bookdatas = response.data.data.chapters;
                // Checking every single data entry
                bookdatas.forEach((bookdata) => {
                    books.push(bookdata)
                })
                this.setState({
                    bookData: books
                })
                // console.log(this.state.bookData.id)
                // Cookies.setItem('cookieBookData', this.state.bookData);
            })
        }

        if( prevState.currentChapter !== this.state.currentChapter ) {
            const verses = [];
            axios.get(`https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/chapters/${this.state.currentChapter}/verses`, { headers: { 'api-key': '7dbe0c4776c211bd9f6bdfe5b3f6694a' }}).then( response => {
                // Getting the verses
                const versedatas = response.data.data;
                // Checking every single data entry
                versedatas.forEach(( versedata ) => {
                    verses.push(versedata)
                })
                this.setState({
                    verseData: verses
                })
            })
            
        } 

    }

    // Check when 'currentPage' changed and then call axios to the bible api, save the data in a state then pass the state to ChapterPicker to then be used to pick the chapter
    // Do the same when the user picks a chapter

    render() {
        // What will be returned in render
        return (
            <Router>
                <div className='container-fluid'>
                    {/* Bible Navbar */}
                    <div className='bible-nav'>
                        <div className='current-chapter'>
                            <h1 className='main-text'>{this.state.currentPage}</h1>
                        </div>
                        <div className='search-container' id='search-container'>
                            <div className='search-bar'>
                                <input onBlur={this.NoSearch} type='text' id='search-input'></input>
                                <button onClick={this.Search}><img alt='search-img' src={searchImg}></img></button>
                            </div>
                        </div>
                    </div>


                    <div className='bible-content'>
                        <Switch>

                            <Route exact path='/bible'>
                                <BookPicker onChange={this.bookEventHandler} />
                            </Route>

                            <Route exact path='/bible/chapter'>
                                <ChapterPicker bookData = {this.state.bookData} onChange={this.chapterEventHandler} />
                            </Route>

                            <Route exact path='/bible/chapter/verse'>
                                <VerseViewer verseData = {this.state.verseData} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Bible;