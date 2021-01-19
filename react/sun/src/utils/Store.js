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
    constructor(itemName) {
        this.ls = window.localStorage;
        this.item = itemName;
    }

    // Returns a parsed version of the store if exists or {}
    getItem(itemName) {
        const items = this.ls.getItem(this.item);
        return items ? JSON.parse(items): {};
    }

    getItemCount() {
        const item = this.ls.getItem(this.item);
        return item ? Object.keys(JSON.parse(item)).length : 0;
    }

    // Add a new item to the store
    addItem(itemName, data) {
        const items = this.getItem() ? this.getItem() : {};
        items[itemName] = data;
        this.ls.setItem(this.item, JSON.stringify(items));
    }

    // Remove an item from the store
    removeItem(itemName) {
        const items = this.getItem();
        delete items[itemName];
        this.ls.setItem(this.item, JSON.stringify(items));
    }

    // Returns an array version of all the items in the store
    getStore() {
        const items = this.getitem();
        return items ? Object.keys(items) : [];
    }

    // Empty the store
    emptyStore() {
        this.ls.removeItem(this.item);
    }
}

export default Store;