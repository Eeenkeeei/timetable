import {theme} from "../Theme";
import {CircularProgress, Typography} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/styles";
import React from "react";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";

export const LoadingComponent = (
    <MuiThemeProvider theme={theme}>
        <CircularProgress/>
        <div>
            <Typography variant={"h6"}>Пожалуйста, подождите. Данные обновляются.</Typography>
        </div>
    </MuiThemeProvider>
)

export function checkUserData () {
    let flag: boolean;
    const storage = new DataStorage(new LocalStorage());
    const http = new Http();
    if (storage.getUserData !== null) {
        http.loginWithToken(storage.getUserData, '/user')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    if (result.email !== undefined) {
                        console.log('true')
                        flag = true
                        return (flag)

                    } else {
                        console.log(false)
                        storage.logOut()
                        flag = false
                        return (flag)

                    }
                }, (error) => {
                    console.log(error)
                }
            );
    } else {
        flag = false
        return (flag)
    }
}
