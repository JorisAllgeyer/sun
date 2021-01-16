import React from 'react';

import SunCalc from 'suncalc';
import tzlookup from 'tz-lookup';
import moment from 'moment-timezone';

import Settings from './Settings';

class SunData extends React.Component {

    constructor(props) {
        super();
        
        this.lat = props.lat;
        this.lon = props.lon;
        this.tz = tzlookup(this.lat, this.lon);

        this.state = {
            sunData: {},
            lat: this.lat,
            lon: this.lon,
            tz: this.tz 
        };
    }

    componentDidMount() {
        this.refreshSunData();
    }

    refreshSunData() {
        const { lat, lon, tz } = this.state;
        const times = SunCalc.getTimes(new Date(), lat, lon);

        const sunrise = moment(times.sunrise).tz(tz).format('HH:mm');
        const sunset = moment(times.sunset).tz(tz).format('HH:mm');
        const solarNoon = moment(times.solarNoon).tz(tz).format('HH:mm');
        
        this.setState({ 
            sunData : {
                ...this.state.sunData,
                sunrise, sunset, solarNoon
            }
        })
    }

    handleSettingsChange({ lat, lng }) {
        this.setState({
            lat: lat,
            lon: lng,
            tz: tzlookup(lat, lng)
        }, () => this.refreshSunData())
    }

    render() {
        const sd = this.state.sunData;

        return (
            <div id="sun-data">
                <p>Sunrise: {sd.sunrise}</p>
                <p>Sunset: {sd.sunset}</p>
                <Settings onSettingsChange={this.handleSettingsChange.bind(this)} />
            </div>
        )
    }
}

export default SunData;