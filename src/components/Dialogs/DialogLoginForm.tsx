import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, Typography
} from "@material-ui/core";
import Http from "../../serverApi/http";

interface DialogLoginFormProps {
    mobile: boolean
}

export class DialogLoginForm extends React.Component<DialogLoginFormProps> {

    state = {
        open: false,
        email: '',
        password: ''
    };

    public handleOpenLoginDialog = () => {
        this.setState({
            open: true
        })
    }

    public handleClose = () => {
        this.setState({
            open: false
        })
    };

    public login = () => {
        const http = new Http();
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        http.login(data, '/auth')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            );


    };

    public handleEmailChange = (event:any) => {
        console.log(event.target.value)
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
                        <Typography variant="button">Вход</Typography>
                    </div>
                    :
                    <Button color="secondary" onClick={this.handleOpenLoginDialog}>
                        Вход
                    </Button>}



                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Вход</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите логин (email) и пароль
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login"
                            label="Email"
                            type="email"
                            fullWidth
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            margin="dense"
                            id="pass"
                            label="Пароль"
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
