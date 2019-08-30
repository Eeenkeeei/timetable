import React from 'react'
import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, Typography
} from "@material-ui/core";
import Http from "../../serverApi/http";
import {DataStorage} from "../../serverApi/dataStorage";
import {LocalStorage} from "../../serverApi/localStorage";
import {MeetingRoom} from "@material-ui/icons";

interface DialogLoginFormProps {
    mobile: boolean
    isLoginSuccess: any;
}

interface DialogLoginFormState {
    openDialogWindow: boolean,
    email: string,
    password: string,
    isLoading: boolean
    loginState: string
}

export class DialogLoginForm extends React.Component<DialogLoginFormProps, DialogLoginFormState> {

    state = {
        openDialogWindow: false,
        email: '',
        password: '',
        isLoading: false,
        loginState: ''
    };

    public handleOpenLoginDialog = () => {
        this.setState({
            openDialogWindow: true
        })
    };

    public handleClose = () => {
        this.setState({
            openDialogWindow: false,

        })
    };

    public login = () => {
        this.setState({
            isLoading: true
        });
        const http = new Http();
        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        http.loginForToken(data, '/auth')
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.token === undefined){
                        this.setState({
                            loginState: 'Email или пароль введены неверно'
                        })
                    } else {
                        this.setState({
                            loginState: 'Вы успешно авторизованы. Сейчас Вы будете перенаправлены'
                        }, ()=>{
                            const storage = new DataStorage(new LocalStorage());
                            storage.add(result.token);
                            http.loginWithToken(result.token, '/user')
                                .then(res => res.json())
                                .then (
                                    (result)=>{
                                        // КОНЕЧНЫЕ ДАННЫЕ
                                        this.setState({
                                            openDialogWindow: false
                                        });
                                        this.props.isLoginSuccess(result)

                                    }, (error) => {
                                        console.log(error)
                                    }
                                )
                        })
                    }
                    this.setState({
                        isLoading: false
                    })
                },
                (error) => {
                    console.log(error)
                }
            );
    };

    public handleEmailChange = (event: any) => {
        this.setState({
            email: event.target.value
        })
    };

    public handlePasswordChange = (event: any) => {
        this.setState({
            password: event.target.value
        })
    };

    public render() {
        return (
            <div>

                {this.props.mobile === true ?
                    <div onClick={this.handleOpenLoginDialog} style={{height: '2rem', width: '7rem'}}>
                        <Typography variant="button"><MeetingRoom/>&nbsp;&nbsp;Вход</Typography>
                    </div>
                    :
                    <Button color="secondary" onClick={this.handleOpenLoginDialog}  style={{color: 'white'}}>
                        <MeetingRoom/>&nbsp;&nbsp;Вход
                    </Button>}

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Вход</DialogTitle>
                    <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        {this.state.isLoading ? <CircularProgress/> : null}
                    </div>
                    <DialogContent>
                        <DialogContentText>
                            Введите Email и пароль
                        </DialogContentText>

                        <Typography variant="button">{this.state.loginState}</Typography>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="login"
                            label={<Typography>Email <span style={{color: 'red'}}>*</span></Typography>}
                            type="email"
                            fullWidth
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            margin="dense"
                            id="pass"
                            label={<Typography>Пароль <span style={{color: 'red'}}>*</span></Typography>}
                            type="password"
                            fullWidth
                            onChange={this.handlePasswordChange}
                        />
                    </DialogContent>

                    <DialogActions>

                        <Button onClick={this.login} color="primary">
                            Войти
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Отмена
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
