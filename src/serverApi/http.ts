import {serverApi} from "../AppConstants";

interface loginData {
    email: string;
    password: string
}


export default class Http {

    public url = serverApi;

    public postConfig (data: loginData, path: string) {
        return fetch(this.url + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}
