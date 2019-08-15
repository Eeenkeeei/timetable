import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton, TextField,
    Typography
} from "@material-ui/core";
import Http from "../../serverApi/http";

import {MoreHoriz} from "@material-ui/icons";
import {newTaskLesson} from "./DialogAddTaskLesson";
import moment from 'moment'
interface DialogViewDayProps {
    tasks: newTaskLesson[],
    day: string
}


export class DialogViewDay extends React.Component<DialogViewDayProps> {

    state = {
        openDialogWindow: false
    }

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


    public render() {
        return (
            <div>
                <IconButton onClick={this.handleOpenLoginDialog} style={{padding: 0, marginBottom: '1rem'}}>
                    <MoreHoriz/>
                </IconButton>

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Просмотр дня: {moment(this.props.day).format(' Do MMM ')}</DialogTitle>

                    <DialogContent>
                        {this.props.tasks.map((task: newTaskLesson) => {
                            return (
                                <div key={Math.random()}>
                                    <Typography variant="h6">{this.props.tasks.indexOf(task) + 1}</Typography>
                                    <Typography variant="subtitle2">{task.lesson.lessonWeek} неделя</Typography>
                                    <Typography variant="subtitle2">{task.taskText}</Typography>
                                    <Typography variant="subtitle2">{task.lesson.lessonName}, {task.lesson.lessonTeacher}</Typography>
                                </div>
                                )
                        })}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
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
