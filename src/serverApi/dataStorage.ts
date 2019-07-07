export class Link {
    public data:string;
    constructor(data:string) {
        this.data = data
    }
}

export class DataStorage {
    public storage:any;

    constructor(storage:any) {
        this.storage = storage;
    }

    get getUserData() {
        return this.storage.data;
    }

    add(data:string) {
        this.storage.add(data);
    }

    logOut () {
        this.storage.logOut();
    }

}
