import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField,
    Typography
} from "@material-ui/core";
import Http from "../../serverApi/http";

interface DialogAddNewsProps {
    getNews: any // функция обновления новостей
}


export class DialogAddNews extends React.Component<DialogAddNewsProps> {

    state = {
        openDialogWindow: false,
        header: '',
        body: '',
        author: '',
        img: ''
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

    public confirmEdit = () => {
        const http = new Http();
        const data = {
            header: this.state.header,
            body: this.state.body,
            author: this.state.author,
            img: this.state.img,
            data: new Date()
        };
        http.addNews(data, '/addNews')
            .then (res => res.json())
            .then (
                (result)=>{
                    if (result === true){
                        this.props.getNews();
                        this.setState({
                            openDialogWindow: false
                        })
                    }
                },
                (err)=>{
                    console.error(err)
                }
            )
    };

    public handleHeaderChange = (event: any) => {
        this.setState({
            header: event.target.value
        })
    };

    public handleBodyChange = (event: any) => {
        this.setState({
            body: event.target.value
        })
    };

    public handleAuthorChange = (event: any) => {
        this.setState({
            author: event.target.value
        })
    };

    public handleImgChange = (event: any) => {
        this.setState({
            img: event.target.value
        })
    };

    public render() {
        return (
            <div>
                <Button color="primary" variant="contained" onClick={this.handleOpenLoginDialog}>
                    Добавить новость
                </Button>

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Добавление новости</DialogTitle>

                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login"
                            label={<Typography>Заголовок: </Typography>}
                            type="text"
                            value={this.state.header}
                            fullWidth
                            onChange={this.handleHeaderChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login"
                            label={<Typography>Текст новости: </Typography>}
                            value={this.state.body}
                            fullWidth
                            onChange={this.handleBodyChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login"
                            label={<Typography>Автор: </Typography>}
                            value={this.state.author}
                            fullWidth
                            onChange={this.handleAuthorChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login"
                            label={<Typography>Картинка: </Typography>}
                            value={this.state.img}
                            fullWidth
                            onChange={this.handleImgChange}
                        />

                    </DialogContent>

                    <DialogActions>

                        <Button onClick={this.confirmEdit} color="primary">
                            Сохранить
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
