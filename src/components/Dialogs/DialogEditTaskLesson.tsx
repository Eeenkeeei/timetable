import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField,
    Typography
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import "moment/locale/ru";
import {newTaskLesson} from "./DialogAddTaskLesson";
import {Edit} from "@material-ui/icons";


interface DialogEditTaskLessonProps {
    lesson: newTaskLesson
    handleEditTaskLesson: (taskLesson: newTaskLesson) => void // cb для сохранения редактирования задания
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

export class DialogEditTaskLesson extends React.Component<DialogEditTaskLessonProps> {

    state = {
        openDialogWindow: false,
        textForTaskLesson: this.props.lesson.taskText,
        dateForTaskLesson: this.props.lesson.taskDate
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
                lessonWeek: this.props.lesson.lesson.lessonWeek,
                lessonDay: this.props.lesson.lesson.lessonDay,
                lessonName: this.props.lesson.lesson.lessonName,
                lessonType: this.props.lesson.lesson.lessonType,
                lessonNumber: this.props.lesson.lesson.lessonNumber,
                lessonLocation: this.props.lesson.lesson.lessonLocation,
                lessonTeacher: this.props.lesson.lesson.lessonTeacher
            },
            taskDate: new Date(this.state.dateForTaskLesson),
            taskText: this.state.textForTaskLesson,
            id: this.props.lesson.id
        };
        this.props.handleEditTaskLesson(newTaskLesson);
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
                <Button color="primary" size={"small"} onClick={this.handleOpenLoginDialog}>
                    Редактировать
                </Button>
                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Редактирование задания: {this.props.lesson.lesson.lessonDay}, {this.props.lesson.lesson.lessonWeek} неделя</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Предмет: {this.props.lesson.lesson.lessonName}</Typography>
                        <Typography variant="body1">Тип занятия: {this.props.lesson.lesson.lessonType}</Typography>
                        <Typography variant="body1">Номер пары: {this.props.lesson.lesson.lessonNumber}</Typography>
                        <Typography variant="body1">Преподаватель: {this.props.lesson.lesson.lessonTeacher}</Typography>
                        <Typography variant="body1">Место занятия: {this.props.lesson.lesson.lessonLocation}</Typography>
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
                            Сохранить изменения
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
