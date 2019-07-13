import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import Http from "../../serverApi/http";

import {Delete} from "@material-ui/icons";
import {newsData} from "../../pages/StartPage";

interface DialogDeleteNewsProps {
    newsData: newsData
    getNews: any // функция обновления новостей
}


export class DialogDeleteNews extends React.Component<DialogDeleteNewsProps> {

    state = {
        openDialogWindow: false
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

    public confirmDelete = () => {
        const http = new Http();
        http.removeNews(this.props.newsData.body, '/removeNews')
            .then (res => res.json())
            .then(
                (result) => {
                    if (result === true){
                        this.props.getNews();
                        this.setState({
                            openDialogWindow: false
                        })
                    }
                }
            )
    };

    public render() {
        return (
            <div>
                <Button onClick={this.handleOpenLoginDialog} style={{gridRowStart: '1', gridRowEnd: '2'}}>
                    <Delete/>
                </Button>

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Удаление новости</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Заголовок: {this.props.newsData.header}
                        </DialogContentText>
                        <DialogContentText>
                            Текст: {this.props.newsData.body}
                        </DialogContentText>
                        <DialogContentText>
                            Автор: {this.props.newsData.author}, дата: {this.props.newsData.data}
                        </DialogContentText>


                    </DialogContent>

                    <DialogActions>

                        <Button onClick={this.confirmDelete} color="primary">
                            Удалить
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
