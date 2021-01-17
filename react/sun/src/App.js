import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from './components/Header';
import SunData from './components/SunData';

// Init here store and pass it to other components as props
import Store from './Store';

// GMaps alternatives:
// https://openlayers.org/
// https://leafletjs.com/examples.html

class App extends React.Component {



    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route path="/">
                        <SunData lat={48.5734053} lon={7.7521113} />
                    </Route>
                    <Route path="/settings">
                        {/* <Settings /> */}
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
