import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from './components/Home';
import Sun from './components/Sun';
import Settings from './components/Settings';

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
                    <Route exact path="/settings/:id" component={Settings}/>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
