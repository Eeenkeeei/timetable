import React from 'react'
import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Fade,
    TextField, Typography
} from "@material-ui/core";
import Http from "../../serverApi/http";
import {DataStorage} from "../../serverApi/dataStorage";
import {LocalStorage} from "../../serverApi/localStorage";

interface DialogRegisterFormProps {
    mobile: boolean
}

interface DialogRegisterFormState {
    openDialogWindow: boolean,
    email: string,
    password: string,
    confirmPassword: string,
    isLoading: boolean,
    registrationState: string
}

export class DialogRegisterForm extends React.Component<DialogRegisterFormProps, DialogRegisterFormState> {

    state = {
        openDialogWindow: false,
        email: '',
        password: '',
        confirmPassword: '',
        isLoading: false,
        registrationState: ''
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
            confirmPassword: this.state.confirmPassword
        };
        http.loginForToken(data, '/registration')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoading: false
                    });
                    if (result === 'Passwords Not Confrimed'){
                        this.setState({
                            registrationState: 'Введенные пароли не совпадают'
                        })
                    }

                    if (result.token !== undefined) {
                        console.log(result);
                        const storage = new DataStorage(new LocalStorage());
                        storage.add(result.token);
                        this.setState({
                            registrationState: 'Вы успешно зарегистрированы. Сейчас Вы будете перенаправлены'
                        }, ()=>{
                            http.loginWithToken(result.token, '/user')
                                .then(res => res.json())
                                .then (
                                    (result)=>{
                                        console.log(result)
                                        // КОНЕЧНЫЕ ДАННЫЕ
                                        this.setState({
                                            openDialogWindow: false
                                        })

                                    }, (error) => {
                                        console.log(error)
                                    }
                                )
                        })
                    }

                    if (result === 'This email already registered'){
                        this.setState({
                            registrationState: 'Этот Email уже занят'
                        })
                    }

                    if (result === '8 symbols') {
                        this.setState({
                            registrationState: 'Длина пароля должна быть не менее 8 символов'
                        })
                    }
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

    public handleConfirmPasswordChange = (event: any) => {
        this.setState({
            confirmPassword: event.target.value
        })
    };

    public render() {
        return (
            <div>

                {this.props.mobile === true ?
                    <div onClick={this.handleOpenLoginDialog} style={{height: '2rem', width: '7rem'}}>
                        <Typography variant="button">Регистрация</Typography>
                    </div>
                    :
                    <Button color="secondary" onClick={this.handleOpenLoginDialog}>
                        Регистрация
                    </Button>}

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
                    <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <Fade
                            in={this.state.isLoading}
                            style={{
                                transitionDelay: this.state.isLoading ? '800ms' : '0ms',
                            }}
                            unmountOnExit
                        >
                            <CircularProgress/>
                        </Fade>
                    </div>
                    <DialogContent>
                        <DialogContentText>
                            Для регистрации необходимо ввести свой email и пароль. Введенные пароли должны совпадать
                        </DialogContentText>

                        <Typography variant="button">{this.state.registrationState}</Typography>

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
                        <TextField
                            margin="dense"
                            id="confirmPass"
                            label={<Typography>Повторите пароль <span style={{color: 'red'}}>*</span></Typography>}
                            type="password"
                            fullWidth
                            onChange={this.handleConfirmPasswordChange}
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
