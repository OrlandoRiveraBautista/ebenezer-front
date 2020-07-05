import React, { Component } from 'react';


class VerseViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        console.log(this.props)
        // What will be returned in render
        return (
            <div>
                {/* Bible Picker */}
                <h3>Selecciona Libro</h3>
                <ul>
                    <li className='book'>
                        <a>
                            <abbr className='bible-version-abbr' title='Reina Valera Bible 1909'><b>RVR09 </b></abbr>
                            <span>
                                <span className='bible-version-name'>- Reina Valera Bible 1909</span>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default VerseViewer;