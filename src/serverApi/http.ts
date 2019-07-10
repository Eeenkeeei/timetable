import {serverApi} from "../AppConstants";

interface loginData {
    email: string;
    password: string
}


export default class Http {

    public url = serverApi;

    public loginForToken (data: loginData, path: string) {
        return fetch(this.url + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    public loginWithToken (token: string, path: string) {
        return fetch(this.url + path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        });
    }

    public getNewsList (path: string){
        return fetch(this.url + path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
}
