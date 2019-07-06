import {serverApi} from "../AppConstants";

interface loginData {
    email: string;
    password: string
}


export default class Http {

    public url = serverApi;

    public login (data: loginData) {
        return fetch(`${this.url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}
