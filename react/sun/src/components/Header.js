import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Header extends React.Component {

    render() {
        return (
            <header id="header">
                <div className="header-part">
                    <h1>Sun.</h1>
                </div>
                <div className="header-part">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;