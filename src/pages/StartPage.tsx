import * as React from "react";
import Http from "../serverApi/http";

interface StartPageProps {
    match: any
}

export default class StartPage extends React.Component<StartPageProps> {

    public http = new Http();

    public async login  ()  {
        const http = new Http();
        const data = {
            email: 'romanilichev@mail.ru',
            password: 'test'
        };
        http.login(data, 'auth')
            .then(res => res.json())
            .then(
                (result) => {
                    if (result === 'confirm'){
                        this.setState({
                            isConfirmed: true
                        });
                    }
                },
                (error) => {
                    console.log(error)
                }
            );


    }

    public render () {
        return (
            <div style={{border: '1px solid black'}}>

                <button onClick={this.login}>test login</button>
            </div>
        )
    }

}
