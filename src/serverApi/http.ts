import {serverApi} from "../AppConstants";
import {newsData} from "../pages/StartPage";
import {User} from "../pages/AccountPage";

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

    public removeNews (body: string, path: string) {
        return fetch(this.url + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({body: body})
        });
    }

    public editNews (body: any, path: string) {
        return fetch(this.url + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    public addNews (body: any, path: '/addNews') {
        return fetch(this.url + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    public addUserAsAdmin (body: string, path: '/addAdmin') {
        return fetch(this.url + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: body})
        });
    }

    public getUserDataFromAdmin(body: string, path: '/getUserDataFromAdmin') {
        return fetch(this.url + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: body})
        });
    }

    public removeUserAdmin(body: string, path: '/removeUserAdmin'){
        return fetch(this.url + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: body})
        });
    }

    public deleteAccount(body: string, path: '/deleteAccount'){
        return fetch(this.url + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: body})
        });
    }

    public updateUserData(body: User, path: '/updateData') {
        return fetch(this.url + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
}
