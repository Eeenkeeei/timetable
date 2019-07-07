export class LocalStorage {
    public data:string;
    constructor() {
        // @ts-ignore
        this.data = JSON.parse(localStorage.getItem('data'));

    }

    add(data:any) {
        this.data = data;
        this.save();
    }

    logOut() {
        localStorage.removeItem('data');
    }

    save() {
        localStorage.setItem('data', JSON.stringify(this.data)); // stringify - преобразование объекта в строку
    }


}

