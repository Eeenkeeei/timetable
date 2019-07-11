import * as React from "react";
import {Button, DialogContent, TextField, Typography} from "@material-ui/core";
import Http from "../serverApi/http";
import {LoadingComponent} from "./UniversalComponents";

export default class SetAdmin extends React.Component {

    state = {
        adminEmail: '',
        addConfirmed: false,
        isLoading: false
    };

    public handleAdminEmailChange = (event: any) => {
        this.setState({
            adminEmail: event.target.value
        })
    };

    public addUserAsAdmin = () => {
        this.setState({
            isLoading: true
        })
        const http = new Http();
        http.addUserAsAdmin(this.state.adminEmail, '/addAdmin')
            .then (res => res.json())
            .then (
                (result)=>{
                    if (result === true){
                      this.setState({
                          addConfirmed: true,
                          adminEmail: '',
                          isLoading: false
                      })
                    }
                }
            )
    };

    public render() {
        return (
            <div style={{width: '100%'}}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="login"
                    label={<Typography>Имя будущего администратора</Typography>}
                    fullWidth
                    onChange={this.handleAdminEmailChange}
                />
                <Button color="primary" variant="contained" onClick={this.addUserAsAdmin}>
                    Сделать пользователя администратором
                </Button>
                {this.state.isLoading ? LoadingComponent : null}
                {this.state.addConfirmed ? <Typography variant="body1">Пользователь успешно добавлен</Typography> : null}
            </div>
        )
    }
}
