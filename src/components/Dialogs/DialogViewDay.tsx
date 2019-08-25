import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider, IconButton, TextField,
    Typography
} from "@material-ui/core";
import Http from "../../serverApi/http";

import {MoreHoriz} from "@material-ui/icons";
import {newTaskLesson} from "./DialogAddTaskLesson";
import moment from 'moment'
import {DialogEditTaskLesson} from "./DialogEditTaskLesson";

interface DialogViewDayProps {
    tasks: newTaskLesson[],
    day: string,
    handleEditTaskLesson: (taskLesson: newTaskLesson) => void // cb для сохранения редактирования задания
}


export class DialogViewDay extends React.Component<DialogViewDayProps> {

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
                                    <Typography variant="caption" style={{fontSize: '1.2rem'}}>Задание №{this.props.tasks.indexOf(task) + 1}</Typography>
                                    <Typography variant="subtitle2">{task.lesson.lessonWeek} неделя</Typography>
                                    <Typography variant="subtitle2">Текст задания: {task.taskText}</Typography>
                                    <Typography variant="subtitle2">{task.lesson.lessonName}</Typography>
                                    <Typography variant="caption">{task.lesson.lessonTeacher}</Typography>
                                    <DialogEditTaskLesson handleEditTaskLesson={this.props.handleEditTaskLesson} lesson={task}/>
                                    <Divider style={{marginTop: '1rem', marginBottom: '1rem'}} />
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
