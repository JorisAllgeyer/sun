import React from 'react';
import Header from './Header';

class GeneralSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <>
                <Header path="settings/general"/>
                <h2>General Settings</h2>
            </>
        )
    }
}

export default GeneralSettings;