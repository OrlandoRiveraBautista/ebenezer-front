import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

// Components
// import VersePicker from './VersePicker';


class BookPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            biblePicked: null,
            didPickBook: false
        }
    }

    handleClick = (event) => {
        const target = event.target;
        const name = target.getAttribute('name');

        this.setState({
            biblePicked: name,
            didPickBook: true
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.biblePicked)
            }
        })
    }

    componentDidUpdate = (biblePicked) => {
        if( biblePicked !== this.state.biblePicked) {
            // console.log(this.state.biblePicked)
        }

    }

    render() {
        if(this.state.didPickBook) {
            return <Redirect push to='/bible/chapter'/>
        }
        return (
            <Router>
                <Switch>
        
                <Route exact path='/bible'>
                    <div>
                        {/* Book Picker */}
                        <h3 style={{marginBottom: '20px'}}>Selecciona Libro</h3>
                        {/* Antiguo Testamento */}
                        <h4><b>Antiguo Testamento</b></h4>
                        <ul>
                            <li className='book'>
                                <a onClick={this.handleClick} name='GEN' >Génesis</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='EXO' >Éxodo</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='LEV' >Levítico</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='NUM' >Números</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='DEU' >Deuteronomio</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='JOS' >Josué</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='JDG' >Jueces</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='RUT' >Rut</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='1SA' >1 Samuel</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='2SA' >2 Samuel</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='1KI' >1 Reyes</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='2KI' >2 Reyes</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='1CH' >1 Crónicas</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='2CH' >2 Crónicas</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='EZR' >Esdras</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='NEH' >Nehemías</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='EST' >Ester</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='JOB' >Job</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='PSA' >Salmos</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='PRO' >Proverbios</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='ECC' >Eclesiastés</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='SNG' >Cantares</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='ISA' >Isaías</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='JER' >Jeremías</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='LAM' >Lamentaciones</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='EZK' >Ezequiel</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='DAN' >Daniel</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='HOS' >Oseas</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='JOL' >Joel</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='AMO' >Amós</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='OBA' >Abdías</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='JON' >Jonás</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='MIC' >Miqueas</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='NAM' >Nahúm</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='HAB' >Habacuc</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='ZEP' >Sofonías</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='HAG' >Hageo</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='ZEC' >Zacarías</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='MAL' >Malaquías</a>
                            </li>
                        </ul>
                        {/* Nuevo Testamento */}
                        <h4><b>Nuevo Testamento</b></h4>

                        <ul>
                            <li className='book'>
                                <a onClick={this.handleClick} name='MAT' >Mateo</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='MRK' >Marcos</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='LUK' >Lucas</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='JHN' >Juan</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='ACT' >Hechos de los Apóstoles</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='ROM' >Romanos</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='1CO' >1 Corintios</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='2CO' >2 Corintios</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='GAL' >Gálatas</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='EPH' >Efesios</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='PHP' >Filipenses</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='COL' >Colosenses</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='1TH' >1 Tesalonicenses</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='2TH' >2 Tesalonicenses</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='1TI' >1 Timoteo</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='2TI' >2 Timoteo</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='TIT' >Tito</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='PHM' >Filemón</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='HEB' >Hebreos</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='JAS' >Santiago</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='1PE' >1 Pedro</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='2PE' >2 Pedro</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='1JN' >1 Juan</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='2JN' >2 Juan</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='3JN' >3 Juan</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='JUD' >Judas</a>
                            </li>
                            <li className='book'>
                                <a onClick={this.handleClick} name='REV' >Apocalipsis</a>
                            </li>
                        </ul>
                    </div>
                </Route>

                </Switch>
            </Router>
        );
    }
}

export default BookPicker;