import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from './Header';
import Store from '../model/Store';

class Home extends React.Component {

    constructor() {
        super();
        this.store = new Store();
        this.sun_settings = this.store.getSuns();
    }

    componentDidMount() {
        
    }

    renderBlankPage() {
        return (
            <Link to="/settings/sun_1">Create yout first sun</Link>
        )
    }

    renderSunList() {
        const suns = Object.keys(this.sun_settings);
        return suns.map((sun, key) => 
            <p key={key}><Link to={"/" + sun}>{this.sun_settings[sun].sun_name}</Link></p>
        );
    }

    render() {
        return (
            <>
            <Header />
            <div id="home">
                {Object.keys(this.sun_settings).length ? this.renderSunList(): this.renderBlankPage()}
            </div>
            </>
        )
    }
}

export default Home;