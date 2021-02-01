import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FiSettings } from 'react-icons/fi';

import { getTranslations } from '../assets/i18n/i18n';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.transl = getTranslations("en", "header");

        this.sunName = this.props.sunName ? this.props.sunName : null;
    }

    render() {
        const transl = this.transl;

        return (
            <header id="header">
                <div className="header-part">
                    <h1><Link to="/">Sun</Link>{this.sunName ? ": " + this.sunName : "."}</h1>
                </div>
                <div className="header-part">
                    <nav>
                        <ul>
                            <li><Link to={"/settings/" + this.props.path}><FiSettings value={{ style: "3em" }} /></Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;