import React, { Component } from 'react';
import PastorArias from './graphics/PastorArias.jpg'


class Pastor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {

        window.focus();
        window.scrollTo(0, 0);
    }



    render() {
        // What will be returned in render
        return (
            <div className='container pastor-farias' id='mainWrapper'>
                <h1>Francisco Arias</h1>
                <div className='pastors-container'>
                    <img alt='Pastor' src={PastorArias}></img>
                </div>
                <div className='about-farias'>
                    <p><b>Les</b> damos la más cordial bienvenida, esperamos que el material compartido en este sitio les sea de bendición y edificación espiritual. A través de este espacio estaremos ministrando con mensajes de la Palabra bendita de Dios, enseñanzas, reflexiones, etc.</p>
                    <p><b>Francisco</b> Arias nació el 10 de Diciembre de 1962 en el estado de Guerrero en la República Mexicana. Se convirtió al evangelio a los 18 años de edad y desde entonces estuvo  involucrado en las diferentes actividades de su iglesia local.  Por 12 años participo en diferentes ministerios como por ejemplo: líder de jóvenes, coordinador en grupos de oración, maestro de estudios bíblicos, predicador de pulpito, predicador en las calles y después fue llamado a la humilde labor del pastorado; haciendo servicios en el patio de una vivienda.</p>
                    <p><b>En</b> el año 1998 fundo lo que ahora es “Ministerios Ebenezer, Rescatando el Mundo para Cristo”.  Hoy, con 20 años como pastor, ha logrado en el área local hacer un templo nuevo y un instituto bíblico en Houston, Texas. Ha logrado plantar junto con su congregación algunas iglesias en los Estados Unidos de America, y fuera del país en Mexico y la República del Salvador.</p>
                    <p><b>Nuestro</b> objetivo es continuar con el llamado que Jesucristo nos hiciera de dar a conocer su bendito Evangelio a todo el mundo.</p>
                    <p><b>Somos</b> un Ministerio Misionero que trabaja para expandir el mensaje de Jesucristo a nivel local e internacional. Contamos por la gracia de Dios con un equipo misionero que realiza viajes a través del año a diversas localidades en México, El Salvador y en los Estados Unidos.</p>
                    <p><b>Nuestra</b> visión es 100 % misionera, sin embargo, Dios nos ha permitido abrir nuestro propio Instituto Bíblico donde contamos con un excelente grupo magisterial el cual se ha dado a la tarea de ayudar a forjar los futuros obreros cristianos y Ministros de Dios.</p>
                    <p><b>Con</b> la ayuda de Dios, no pararemos hasta realizar la tarea que Dios nos ha encomendado.</p>
                    <p><b>Si</b> desea contactar este ministerio escriba a:   pfariasr48@gmail.com</p>
                    <p><b>Dios</b> les continúe bendiciendo</p>
                </div>
            </div>
        );
    }
}

export default Pastor;