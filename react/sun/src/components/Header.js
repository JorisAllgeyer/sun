import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { getTranslations } from '../i18n/i18n';

class Header extends React.Component {

    constructor() {
        super();
        this.transl = getTranslations("en", "header");
    }

    render() {
        const transl = this.transl;

        return (
            <header id="header">
                <div className="header-part">
                    <h1>Sun.</h1>
                </div>
                <div className="header-part">
                    <nav>
                        <ul>
                            <li><Link to="/">{transl.nav_home}</Link></li>
                            <li><Link to="/settings">{transl.nav_settings}</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;