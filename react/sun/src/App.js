import './App.css';
import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from './components/Home';
import Sun from './components/Sun';
import SunSettings from './components/SunSettings';
import GeneralSettings from './components/GeneralSettings';

// Init here store and pass it to other components as props

// GMaps alternatives:
// https://openlayers.org/
// https://leafletjs.com/examples.html

class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/:id" component={Sun} />
                    <Route exact path="/settings/sun/:id" component={SunSettings}/>
                    <Route exact path="/settings/general" component={GeneralSettings}/>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
