import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Person from './Person';

// pictures import
import pastores from './graphics/Pastores.jpg';
// ujieres pictures import
import ujieres from './graphics/Ujieres.jpg'

class AboutInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectPastorPage: false
        }
    }

    redirectPastorPage = () => {
        this.setState({
            redirectPastorPage: true
        })
    }

    render() {

        // This was an attemp to make the page change to '/about/pastor' without having page stay in the same scroll cordinate as its father component
        if (this.state.redirectPastorPage === true) {
            return <Redirect to='/about/pastor' />
        }

        return (

            <Router>
                <div className='container-fluid' >

                    <Switch>

                    {/* Main content of about */}
                    <Route exact path="/about">
                        {/* Iglesia */}
                        <h1 className='main-text'>Ebenezer</h1>
                        
                        <div className='about-church-container'>
                        <div className='church-img-container'>
                            <img></img>
                        </div>
                        <div className='church-des-container'>
                            <p><b>Somos</b> una iglesia cristiana misionera de sana doctrina. Nuestro propósito es predicar la palabra de Dios para salvación a toda la humanidad. Creemos firmemente en guardar los principios bíblicos establecidos por Dios que afectan nuestros patrones de vida. Aquí es un lugar donde usted puede ser transformado por la palabra y el poder de Dios.</p>
                            <p><b>Nuestra</b> congregación se compone de múltiples nacionalidades de habla hispana. Si usted vive en el área de la ciudad de Houston, y no tiene una iglesia donde congregarse, nos gustaría que fuera parte de nuestra congregación.</p>
                        </div>
                        </div>

                        {/* Pastores */}
                        <h1>Pastores</h1>
                        <div className='pastors-container'>
                            <img alt='Pastores' src={pastores}></img>
                            <h3>Francisco y Angelly Arias</h3>
                            <p>This will have an introduction to the pastors. Something that conveys who they are.</p>
                                <Link onClick={this.redirectPastorPage} ><h4><b>Conocer Mas</b></h4></Link>
                        </div>
                        {/* Ministerios */}
                        <div className='ministerios-container'>

                            <h1>Ministerios</h1>

                            {/* Ujieres People */}
                            <div className='ujieres'>

                                <div className='about-more-info'>
                                    <h4>Ujieres<span>MAS</span></h4>
                                </div>

                                {/* Images of ministros */}
                                <div className="person-carousel">
                                    <Person picture={ujieres} name='Marcelino Martinez' title='Lider' /> 
                                    <Person picture={ujieres} name='Idolina Martinez' title='Lider' />
                                    <Person name='John Doe' title='Ujier' />
                                </div>

                            </div>

                            {/* Escuela Dominical People */}
                            <div className='escuela-dominical' >

                                <div className='about-more-info'>
                                    <h4>Escuela Dominical <span>MAS</span></h4>
                                </div>
                                <div className="person-carousel">
                                    <Person />
                                    <Person />
                                    <Person />
                                </div>

                            </div>

                            {/* Musica People */}
                            <div className='alabanza'>

                                <div className='about-more-info'>
                                    <h4>Musica y Alabanza<span>MAS</span></h4>
                                </div>
                                <div className="person-carousel">
                                    <Person />
                                    <Person />
                                    <Person />
                                </div>

                            </div>

                            {/* Jovenes People */}
                            <div className='jovenes' >

                                <div className='about-more-info'>
                                    <h4>Grupo de Jovenes<span>MAS</span></h4>
                                </div>
                                <div className="person-carousel">
                                    <Person />
                                    <Person />
                                    <Person />
                                </div>

                            </div>

                            {/* Damas People */}
                            <div className='damas'>

                                <div className='about-more-info'>
                                    <h4>Grupo de Damas<span>MAS</span></h4>
                                </div>
                                <div className="person-carousel">
                                    <Person />
                                    <Person />
                                    <Person />
                                </div>

                            </div>

                            {/* Varones People */}
                            <div className='varones'>

                                <div className='about-more-info'>
                                    <h4>Grupo de Varones<span>MAS</span></h4>
                                </div>
                                <div className="person-carousel">
                                    <Person />
                                    <Person />
                                    <Person />
                                </div>

                            </div>

                        </div>
                    </Route>

                    </Switch>

                </div>
            </Router>
        );
    }
}

export default AboutInfo;