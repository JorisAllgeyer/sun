import React from 'react';
import GoogleMapReact from 'google-map-react';

// Temporary
import Store from './Store';

class Settings extends React.Component {

    constructor(props) {
        super(props);

        // Temporary initialized here
        this.store = new Store("coord");

        this.default = { 
            center: { lat: 48.8534, lng: 2.3488 },
            zoom: 5
        }

        this.state = { 
            lat: null,
            lon: null
        }
    }

    componentDidMount() {
        // 
    }

    saveSettings() {
        console.log("this.state", this.state)
    }

    setCoordinates({ lat, lng }) {
        const lon = lng;
        this.setState({ lat, lon })
    }

    handleClick({ lat, lng }) {
        this.setCoordinates({ lat, lng });
        this.props.onSettingsChange({ lat, lng });
    }

    render() {

        return (
            <div style={{ height: '350px', width: '100%' }}>
                <GoogleMapReact 
                    bootstrapURLKeys={{ key: null }} 
                    defaultCenter={this.default.center} 
                    defaultZoom={this.default.zoom}
                    onClick={this.handleClick.bind(this)}>
                </GoogleMapReact>
                <button 
                    className="button" 
                    onClick={this.saveSettings.bind(this)}>
                    Save Settings
                </button>
            </div>
        )
    }
}

export default Settings;