const SunCalc = require('suncalc');
const geoTz = require('geo-tz');
const moment = require('moment-timezone');

// https://github.com/facebook/create-react-app/issues/9091

// Data
const lat = 48.5734053;
const lon = 7.7521113;
const tz = geoTz(lat,lon)[0];

const getSunTimes = (lat, lon, tz) => {
    // https://github.com/mourner/suncalc/blob/master/suncalc.js
    const times = SunCalc.getTimes(new Date(), lat, lon);

    const sunrise = moment(times.sunrise).tz(tz).format('HH:mm');
    const sunset = moment(times.sunset).tz(tz).format('HH:mm');
    const solarNoon = moment(times.solarNoon).tz(tz).format('HH:mm');

    return {
        sunrise,
        sunset,
        solarNoon
    }
}

const sunTimes = getSunTimes(lat, lon, tz);
console.log(sunTimes);
