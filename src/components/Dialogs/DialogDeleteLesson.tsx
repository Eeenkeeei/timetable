import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";

import {Delete} from "@material-ui/icons";
import {newLesson} from "./DialogAddLesson";

interface DialogDeleteLessonProps {
    lesson: newLesson
    deleteLessonInData: any
}


export class DialogDeleteLesson extends React.Component<DialogDeleteLessonProps> {

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
        this.props.deleteLessonInData(this.props.lesson)
    };

    public render() {
        return (
            <div>
                <Button onClick={this.handleOpenLoginDialog} style={{paddingRight: 0, paddingLeft: 0}}>
                    <Delete/>
                </Button>

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Удаление занятия</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Неделя, месяц: {this.props.lesson.lessonWeek}, {this.props.lesson.lessonDay}
                        </DialogContentText>
                        <DialogContentText>
                            Занятие: {this.props.lesson.lessonName}, {this.props.lesson.lessonType}
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
