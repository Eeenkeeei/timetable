import * as React from "react";
import {Button, DialogContent, TextField, Typography} from "@material-ui/core";
import Http from "../serverApi/http";
import {LoadingComponent} from "./UniversalComponents";

export default class SetAdmin extends React.Component {

    state = {
        adminEmail: '',
        addConfirm: '',
        isLoading: false
    };

    public handleAdminEmailChange = (event: any) => {
        this.setState({
            adminEmail: event.target.value
        })
    };

    public addUserAsAdmin = () => {
        this.setState({
            isLoading: true,
            addConfirm: ''
        })
        const http = new Http();
        http.addUserAsAdmin(this.state.adminEmail, '/addAdmin')
            .then (res => res.json())
            .then (
                (result)=>{
                    if (result === true){
                      this.setState({
                          addConfirm: 'Пользователь успешно добавлен',
                          adminEmail: '',
                          isLoading: false
                      })
                    }
                    if (result === false){
                        console.log('false')
                        this.setState({
                            isLoading: false,
                            addConfirm: 'Пользователь не найден',
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
                {<Typography variant="body1">{this.state.addConfirm}</Typography>}
            </div>
        )
    }
}
