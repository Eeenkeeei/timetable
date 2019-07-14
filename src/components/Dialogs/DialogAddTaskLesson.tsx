import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField,
    Typography
} from "@material-ui/core";
import {PlaylistAdd} from "@material-ui/icons";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import "moment/locale/ru";
import moment from 'moment';

interface DialogAddTaskLessonProps {
    lesson: newLesson
    addNewTaskLesson: any // cb для добавления
}

export interface newLesson {
    lessonWeek: string;
    lessonDay: string;
    lessonName: string;
    lessonType: string;
    lessonNumber: string;
    lessonLocation: string;
    lessonTeacher: string;
}

export interface newTaskLesson {
    lesson: {
        lessonWeek: string;
        lessonDay: string;
        lessonName: string;
        lessonType: string;
        lessonNumber: string;
        lessonLocation: string;
        lessonTeacher: string;
    },
    taskDate: any,
    taskText: string
}


export class DialogAddTaskLesson extends React.Component<DialogAddTaskLessonProps> {

    state = {
        openDialogWindow: false,
        textForTaskLesson: '',
        dateForTaskLesson: new Date()
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

    public confirmAdd = () => {
        const newTaskLesson: newTaskLesson = {
            lesson: {
                lessonWeek: this.props.lesson.lessonWeek,
                lessonDay: this.props.lesson.lessonDay,
                lessonName: this.props.lesson.lessonName,
                lessonType: this.props.lesson.lessonType,
                lessonNumber: this.props.lesson.lessonNumber,
                lessonLocation: this.props.lesson.lessonLocation,
                lessonTeacher: this.props.lesson.lessonTeacher
            },
            taskDate: new Date(this.state.dateForTaskLesson),
            taskText: this.state.textForTaskLesson
        };
        this.props.addNewTaskLesson(newTaskLesson);
        this.handleClose()
    };

    public handleTaskLessonTextChange = (event: any) => {
        this.setState({
            textForTaskLesson: event.target.value
        })
    };

    public handleChangeDate = (value: any) => {
        this.setState({
            dateForTaskLesson: value
        })
    };

    public render() {
        return (
            <div>
                <Button color="primary" onClick={this.handleOpenLoginDialog}>
                    <PlaylistAdd/>
                </Button>
                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Добавление задания: {this.props.lesson.lessonDay}, {this.props.lesson.lessonWeek} неделя</DialogTitle>

                    <DialogContent>
                        <Typography variant="body1">Предмет: {this.props.lesson.lessonName}</Typography>
                        <Typography variant="body1">Тип занятия: {this.props.lesson.lessonType}</Typography>
                        <Typography variant="body1">Номер пары: {this.props.lesson.lessonNumber}</Typography>
                        <Typography variant="body1">Преподаватель: {this.props.lesson.lessonTeacher}</Typography>
                        <Typography variant="body1">Место занятия: {this.props.lesson.lessonLocation}</Typography>
                        <TextField
                            margin="dense"
                            id="login"
                            label={<Typography>Текст задания: </Typography>}
                            value={this.state.textForTaskLesson}
                            fullWidth
                            onChange={this.handleTaskLessonTextChange}
                        />
                        <MuiPickersUtilsProvider utils={MomentUtils} >
                                <KeyboardDatePicker
                                    style={{width: '100%'}}
                                    id="mui-pickers-date"
                                    invalidDateMessage="Неверный формат даты"
                                    label="На какую дату внести задание:"
                                    value={this.state.dateForTaskLesson}
                                    onChange={this.handleChangeDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />

                        </MuiPickersUtilsProvider>

                    </DialogContent>

                    <DialogActions>

                        <Button onClick={this.confirmAdd} color="primary">
                            Добавить
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
