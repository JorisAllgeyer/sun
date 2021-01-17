// Store is a localstorage util

class Store {

    // Init local storage and store name
    constructor(itemName) {
        this.ls = window.localStorage;
        this.item = itemName;
    }

    // Returns a parsed version of the store if exists or {}
    getItem() {
        const items = this.ls.getItem(this.item);
        return getItem ? JSON.parse(items): {};
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