import React from 'react';
import GoogleMapReact from 'google-map-react';

class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            center: { lat: 48.8534, lng: 2.3488 },
            zoom: 5
        }
    }

    componentDidMount() {}

    handleClick({ lat, lng }) {
        this.props.onSettingsChange({ lat, lng });
    }

    render() {

        return (
            <div style={{ height: '350px', width: '100%' }}>
                <GoogleMapReact 
                    bootstrapURLKeys={{ key: null }} 
                    defaultCenter={this.state.center} 
                    defaultZoom={this.state.zoom}
                    onClick={this.handleClick.bind(this)}
                >
                </GoogleMapReact>
            </div>
        )
    }
}

export default Settings;