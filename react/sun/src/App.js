import './App.css';
import React from 'react';
import SunData from './components/SunData';

class App extends React.Component {

    render() {
        return (
            <div id="app">
                <header id="header">
                    <h1>Sun.</h1>
                </header>
                <SunData 
                    lat={48.5734053}
                    lon={7.7521113}
                    />
            </div>
        )
    }
}

export default App;
