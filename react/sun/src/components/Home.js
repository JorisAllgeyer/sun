import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from './Header';
import Store from '../model/Store';

console.log(window.localStorage)

class Home extends React.Component {

    constructor() {
        super();
        this.store = new Store();
        this.sun_settings = this.store.getSuns();
        this.MAX_SUNS = 3;
    }

    componentDidMount() {

    }

    renderBlankPage() {
        return (
            <Link to="/settings/sun/1">Create your first sun</Link>
        )
    }

    renderSunList() {
        const suns = Object.keys(this.sun_settings);
        const moreSun = suns.length < 3 ? true : false;
        const nextId = parseInt(suns.length) + 1;
        const sunList = suns.map((sun, key) => 
            <p key={key}><Link to={"/" + sun}>{this.sun_settings[sun].sun_name}</Link></p>
        );
        const newSunLink = moreSun ? <Link to={"/settings/sun/" + nextId}>+</Link> : "";
        
        return <div class="sun-list">
            {sunList}
            {newSunLink}
        </div>
    }

    render() {
        return (
            <>
            <Header path="settings/general" />
            <div id="home">
                {Object.keys(this.sun_settings).length ? this.renderSunList(): this.renderBlankPage()}
            </div>
            </>
        )
    }
}

export default Home;