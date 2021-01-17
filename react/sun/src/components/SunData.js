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

    getDiff(today, yesterday) {
        const diff = today.diff(yesterday, 'minutes');
        console.log("diff => ", diff)
        if (diff > 0) return `+${diff}`;
        if (diff == 0) return "+1";
        return `${diff}`;
    }

    refreshSunData() {
        const { lat, lon, tz } = this.state;

        // Yesterday
        let yesterday = new Date();

        yesterday.setDate(yesterday.getDate() - 1);
        const yTimes = SunCalc.getTimes(yesterday, lat, lon);

        const ySunrise = moment(yTimes.sunrise).tz(tz).add(1, 'days');
        const ySunset = moment(yTimes.sunset).tz(tz).add(1, 'days');

        // Today
        const today = new Date();
        const times = SunCalc.getTimes(today, lat, lon);

        const sunrise = moment(times.sunrise).tz(tz);
        const sunset = moment(times.sunset).tz(tz);

        const sunriseDiff = this.getDiff(sunrise, ySunrise);
        const sunsetDiff = this.getDiff(sunset, ySunset);

        this.setState({ 
            sunData : {
                ...this.state.sunData,
                sunrise: sunrise.format('HH:mm'),
                sunset: sunset.format('HH:mm'),
                sunriseDiff,
                sunsetDiff
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
            <div className="sun-data">
                <p>Sunrise: {sd.sunrise} ({sd.sunriseDiff})</p>
                <p>Sunset: {sd.sunset} ({sd.sunsetDiff})</p>
                <Settings onSettingsChange={this.handleSettingsChange.bind(this)} />
            </div>
        )
    }
}

export default SunData;