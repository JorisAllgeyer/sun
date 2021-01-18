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

    getDiffFromYesterday(today, yesterday) {
        const diff = today.diff(yesterday, 'minutes');

        if (diff > 0) return `+${diff}`;
        if (diff == 0) return "=";
        return `${diff}`;
    }

    getDayDuration(sunrise, sunset) {
        const diff = sunset.diff(sunrise, 'minutes');
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        const pad = (n) => `0${n}`.slice(-2);
        return `${pad(hours)}h${pad(minutes)}`;
    }

    refreshSunData() {
        const { lat, lon, tz } = this.state;

        // Today
        const today = new Date();
        const times = SunCalc.getTimes(today, lat, lon);
        const sunrise = moment(times.sunrise).tz(tz);
        const sunset = moment(times.sunset).tz(tz);

        // Yesterday
        const yesterday = new Date().setDate(today.getDate() - 1);
        const yTimes = SunCalc.getTimes(yesterday, lat, lon);
        const ySunrise = moment(yTimes.sunrise).tz(tz).add(1, 'days');
        const ySunset = moment(yTimes.sunset).tz(tz).add(1, 'days');

        // Diffs
        const sunriseDiff = this.getDiffFromYesterday(sunrise, ySunrise);
        const sunsetDiff = this.getDiffFromYesterday(sunset, ySunset);
        const duration = this.getDayDuration(sunrise, sunset);

        this.setState({ 
            sunData : {
                ...this.state.sunData,
                sunrise: sunrise.format('HH:mm'),
                sunset: sunset.format('HH:mm'),
                duration,
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
                <p>Duration: {sd.duration}</p>
                <Settings onSettingsChange={this.handleSettingsChange.bind(this)} />
            </div>
        )
    }
}

export default SunData;