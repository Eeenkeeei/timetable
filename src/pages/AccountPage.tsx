import * as React from "react";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";
import {checkUserData, LoadingComponent} from "../components/UniversalComponents";
import {theme} from "../Theme";
import {AppBar, CircularProgress, Toolbar} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/styles";

interface AccountPageState {
    isDataConfirmed: boolean | null,
    data: any,
}

export default class AccountPage extends React.Component<AccountPageState> {

    state = {
        isDataConfirmed: null,
        data: {}
    };

    componentDidMount(): void {
        const storage = new DataStorage(new LocalStorage());
        const http = new Http();
        if (storage.getUserData !== null) {
            http.loginWithToken(storage.getUserData, '/user')
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.email !== undefined) {
                            this.setState({
                                data: result
                            }, () => {
                                this.setState({
                                    isDataConfirmed: true
                                })
                            })
                        } else {
                            this.setState({
                                isDataConfirmed: false
                            }, () => {
                                storage.logOut()
                            })
                        }
                    }, (error) => {
                        console.log(error)
                    }
                );
        } else {
            this.setState({
                isDataConfirmed: false
            })
        }
    }

    public render() {

        return (
            <div>
                {this.state.isDataConfirmed === null ? LoadingComponent : null}
                {this.state.isDataConfirmed ? 'good' : 'no'}
            </div>
        )
    }
}
