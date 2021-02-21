import React from 'react';
import Header from './Header';
import GoogleMapReact from 'google-map-react';
import tzlookup from 'tz-lookup';

import Store from '../model/Store';

class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.store = new Store();
        const sunId = this.props.match.params.id;
        this.sunId = sunId;
        console.log("sunId", sunId);

        const { sun_name, lat, lon, tz } = this.store.getSun(this.sunId) 
            ? this.store.getSun(this.sunId) 
            : { sun_name: "", lat: "", lon: "", tz: "" };

        this.state = { sun_name, lat, lon, tz }
        this.default = { 
            center: { 
                lat: parseFloat(lat) ? parseFloat(lat) : 48.8534, 
                lng: parseFloat(lon) ? parseFloat(lon) : 2.3488
            }, 
            zoom: 5 
        }
    }

    saveSettings(e) {
        e.preventDefault();
        const { sun_name, lat, lon, tz } = this.state;
        const notification_enabled = true;
        console.log("save");
        console.log(this.state);

        this.store.addSun(this.sunId, sun_name, lat, lon, tz, notification_enabled);

        this.props.history.push("/" + this.sunId);
    }

    setName(e) {
        const sun_name = e.target.value;
        this.setState({ sun_name });
    }

    setCoordinates({ lat, lng }) {
        const lon = lng;
        this.setState({ 
            lat: lat.toFixed(4),
            lon: lon.toFixed(4),
            tz: tzlookup(lat, lng)
        });
    }

    render() {

        return (
            <>
            <Header path="settings/general" />
            <div style={{ height: '350px', width: '100%' }}>
                <form id="settings_form" onSubmit={this.saveSettings.bind(this)}>
                    <p>
                        <label htmlFor="sun_name">Name</label><br/>
                        <input type="text" id="sun_name" required
                            value={this.state.sun_name} onChange={this.setName.bind(this)}>
                        </input>
                    </p>
                    <p>
                        <label htmlFor="lat">Lat</label><br/>
                        <input type="text" id="lat" required 
                            value={this.state.lat}>
                        </input>
                    </p>
                    <p>
                        <label htmlFor="lon">Lon</label><br/>
                        <input type="text" id="lon" required 
                            value={this.state.lon}>
                        </input>
                    </p>
                    <button type="submit" className="button" >
                        Save Settings
                    </button>
                </form>

                <p>Pick from map</p>
                <GoogleMapReact 
                        bootstrapURLKeys={{ key: null }} 
                        defaultCenter={this.default.center} 
                        defaultZoom={this.default.zoom}
                        onClick={this.setCoordinates.bind(this)}>
                </GoogleMapReact>
            </div>
            </>
        )
    }
}

export default Settings;