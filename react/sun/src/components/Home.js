import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from './Header';
import Store from '../utils/Store';

class Home extends React.Component {

    constructor() {
        super();
        this.store = new Store("sun_settings");
        this.sun_settings = this.store.getItem("sun_settings");
    }

    componentDidMount() {
        // console.log("this.sun_settings", this.sun_settings);
    }

    renderBlankPage() {
        return (
            <Link to="/settings/sun-1">Create yout first sun</Link>
        )
    }

    renderSunList() {
        const suns = Object.keys(this.sun_settings);
        return suns.map((sun) => 
            <p><Link to={"/" + sun}>{this.sun_settings[sun].sun_name}</Link></p>
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