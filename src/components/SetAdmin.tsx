import * as React from "react";
import {Button, Card, CardContent, TextField, Typography} from "@material-ui/core";
import Http from "../serverApi/http";
import {LoadingComponent} from "./UniversalComponents";

export default class SetAdmin extends React.Component {

    state = {
        adminEmail: '',
        addConfirm: '',
        isLoading: false,
        findUserData: {email: '1', password: '', lastLoginDate: '', registrationDate: '', admin: false}
    };

    public handleAdminEmailChange = (event: any) => {
        this.setState({
            adminEmail: event.target.value
        })
    };

    public getUserData = () => {
        this.setState({
            isLoading: true,
            addConfirm: '',
            findUserData: {email: '1', password: '', lastLoginDate: '', registrationDate: '', admin: false}
        });
        const http = new Http();
        http.getUserDataFromAdmin(this.state.adminEmail, '/getUserDataFromAdmin')
            .then(res => res.json())
            .then(
                (result) => {
                    if (result !== 'false') {
                        this.setState({
                            isLoading: false,
                            findUserData: result
                        })
                    }
                    if (result === 'false') {
                        this.setState({
                            isLoading: false,
                            addConfirm: 'Пользователь не найден'
                        })
                    }
                }
            )
    }

    public addUserAsAdmin = () => {
        this.setState({
            isLoading: true,
            addConfirm: ''
        });
        const http = new Http();
        http.addUserAsAdmin(this.state.findUserData.email, '/addAdmin')
            .then(res => res.json())
            .then(
                (result) => {
                    if (result === true) {
                        this.setState({
                            addConfirm: 'Пользователь успешно добавлен',
                            isLoading: false,
                            findUserData: {email: '1', password: '', lastLoginDate: '', registrationDate: '', admin: false}
                        })
                    }
                    if (result === 'false') {
                        this.setState({
                            isLoading: false,
                            addConfirm: 'Пользователь не найден',
                        })
                    }
                }
            )
    };

    public removeUserAdmin = () => {
        this.setState({
            isLoading: true,
            addConfirm: ''
        });
        const http = new Http();
        http.removeUserAdmin(this.state.findUserData.email, '/removeUserAdmin')
            .then(res => res.json())
            .then(
                (result) => {
                    if (result === true) {
                        this.setState({
                            addConfirm: 'Пользователь успешно обновлен',
                            isLoading: false,
                            findUserData: {email: '1', password: '', lastLoginDate: '', registrationDate: '', admin: false}
                        })
                    }
                    if (result === 'false') {
                        this.setState({
                            isLoading: false,
                            addConfirm: 'Пользователь не найден',
                        })
                    }
                }
            )
    };

    public deleteAccount = () => {
        this.setState({
            isLoading: true,
            addConfirm: ''
        });
        const http = new Http();
        http.deleteAccount(this.state.findUserData.email, '/deleteAccount')
            .then(res => res.json())
            .then(
                (result) => {
                    if (result === true) {
                        this.setState({
                            addConfirm: 'Пользователь удален',
                            isLoading: false,
                            findUserData: {email: '1', password: '', lastLoginDate: '', registrationDate: '', admin: false}
                        })
                    }
                    if (result === 'false') {
                        this.setState({
                            isLoading: false,
                            addConfirm: 'Пользователь не найден',
                        })
                    }
                }
            )
    }


    public render() {

        const userData = (
            <div style={{marginTop: '1rem'}}>
                <Card>
                    <CardContent>
                        <Typography>Email: {this.state.findUserData.email}</Typography>
                        <Typography>Дата регистрации: {this.state.findUserData.registrationDate}</Typography>
                        <Typography>Дата последнего входа: {this.state.findUserData.lastLoginDate}</Typography>
                        <Typography>Администратор: {this.state.findUserData.admin ? <Typography variant="button">Да</Typography> : <Typography variant="button">Нет</Typography>}</Typography>
                        {this.state.findUserData.admin ?   <Button color="primary" variant="contained" onClick={this.removeUserAdmin}>
                            Забрать права администратора
                        </Button> : <Button color="primary" variant="contained" onClick={this.addUserAsAdmin}>
                            Сделать пользователя администратором
                        </Button>}

                        <Button variant="contained" onClick={this.deleteAccount} style={{display: 'flex', marginTop: '10px'}}>
                            Удалить аккаунт
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );

        return (
            <div style={{width: '100%'}}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="login"
                    label={<Typography>Найти пользователя</Typography>}
                    fullWidth
                    onChange={this.handleAdminEmailChange}
                />
                <Button color="primary" variant="contained" onClick={this.getUserData}>
                    Найти
                </Button>

                {this.state.isLoading ? LoadingComponent : null}
                {<Typography variant="body1">{this.state.addConfirm}</Typography>}
                {this.state.findUserData.email !== '1' ? userData : null}

            </div>
        )
    }
}
