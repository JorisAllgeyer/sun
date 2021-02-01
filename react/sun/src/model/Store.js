// Store is a localstorage util
// https://react-native-async-storage.github.io/async-storage/docs/install/

/*
data : {
    "sun_settings": {
        "sun_1": {
            "name": string,
            "lat": float,
            "lon": float,
            "tz": string,
            "notification_enabled": bool
        },
        "sun_2" : {
            "name": string,
            "lat": float,
            "lon": float,
            "tz": string,
            "notification_enabled": bool
        },
        "sun_3": {
            "name": string,
            "lat": float,
            "lon": float,
            "tz": string,
            "notification_enabled": bool
        }
    },
    "gen_settings" : {
        "langage": string
    }
}
*/

class Store {

    // Init local storage and store name
    constructor() {
        this.ls = window.localStorage;
    }

    getAvailableSlots

    getSuns() {
        const suns = this.ls.getItem('sun_settings');
        return suns ? JSON.parse(suns): {};
    }

    getSun(id) {
        const suns = this.getSuns();
        return suns ? suns[id] : {};
    }

    getSunCount() {
        const suns = this.ls.getItem('sun_settings');
        return suns ? Object.keys(JSON.parse(suns)).length : 0;
    }

    addSun(id, sun_name, lat, lon, tz, notification_enabled) {
        const suns = this.getSuns() ? this.getSuns() : {};
        const data = { sun_name, lat, lon, tz, notification_enabled };
        suns[id] = data;

        console.log("addSun, suns => ", suns);
        this.ls.setItem("sun_settings", JSON.stringify(suns));
    }

    rmSun(name) {
        const suns = this.getSuns();
        delete suns[name];
        this.ls.setItem("sun_settings", JSON.stringify(suns));
    }
}

export default Store;