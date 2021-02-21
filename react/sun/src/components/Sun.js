import React from 'react';

import SunCalc from 'suncalc';
import tzlookup from 'tz-lookup';
import moment from 'moment-timezone';

import Header from './Header';
import Store from '../model/Store';

class Sun extends React.Component {

    constructor(props) {
        super(props);
        
        const sunId = this.props.match.params.id;
        const sunSettings = new Store().getSun(sunId);

        this.sunName = sunSettings.sun_name;
        this.lat = sunSettings.lat;
        this.lon = sunSettings.lon;
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
            <>
                <Header sunName={this.sunName} path={"settings/sun/" + this.props.match.params.id} />
                <div className="sun-data">
                    <p>Sunrise: {sd.sunrise} ({sd.sunriseDiff} min)</p>
                    <p>Sunset: {sd.sunset} ({sd.sunsetDiff} min)</p>
                    <p>Duration: {sd.duration}</p>
                </div>
            </>
        )
    }
}

export default Sun;