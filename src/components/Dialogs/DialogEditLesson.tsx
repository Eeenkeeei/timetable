import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField,
    Typography
} from "@material-ui/core";
import {Edit} from "@material-ui/icons";
import {newLesson} from "./DialogAddLesson";

interface DialogEditLessonProps {
    lesson: newLesson
    editLessonInData: any // cb для добавления
}


export class DialogEditLesson extends React.Component<DialogEditLessonProps> {

    state = {
        openDialogWindow: false,
        lessonNumber: this.props.lesson.lessonNumber,
        lessonName: this.props.lesson.lessonName,
        lessonType: this.props.lesson.lessonType,
        lessonLocation: this.props.lesson.lessonLocation,
        lessonTeacher: this.props.lesson.lessonTeacher
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

    public confirmEdit= () => {
        const newLesson: newLesson = {
            lessonWeek: this.props.lesson.lessonWeek,
            lessonDay: this.props.lesson.lessonDay,
            lessonName: this.state.lessonName,
            lessonType: this.state.lessonType,
            lessonNumber: this.state.lessonNumber,
            lessonLocation: this.state.lessonLocation,
            lessonTeacher: this.state.lessonTeacher
        };
        console.log(newLesson)
        this.props.editLessonInData({oldLesson: this.props.lesson, newLesson: newLesson});
        this.handleClose()
    };

    public handleLessonNumberChange = (event: any) => {
        this.setState({
            lessonNumber: event.target.value
        })
    };

    public handleLessonNameChange = (event: any) => {
        this.setState({
            lessonName: event.target.value
        })
    };

    public handleLessonTypeChange = (event: any) => {
        this.setState({
            lessonType: event.target.value
        })
    };

    public handleLessonLocationChange = (event: any) => {
        this.setState({
            lessonLocation: event.target.value
        })
    };

    public handleLessonTeacherChange = (event: any) => {
        this.setState({
            lessonTeacher: event.target.value
        })
    };

    public render() {
        return (
            <div>
                <Button onClick={this.handleOpenLoginDialog}  style={{paddingRight: 0, paddingLeft: 0}}>
                    <Edit/>
                </Button>

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Редактирование занятия</DialogTitle>

                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login"
                            label={<Typography>Номер занятия: </Typography>}
                            type="text"
                            value={this.state.lessonNumber}
                            fullWidth
                            onChange={this.handleLessonNumberChange}
                        />
                        <TextField
                            margin="dense"
                            id="login"
                            label={<Typography>Название предмета: </Typography>}
                            value={this.state.lessonName}
                            fullWidth
                            onChange={this.handleLessonNameChange}
                        />
                        <TextField
                            margin="dense"
                            id="login"
                            label={<Typography>Вид занятия: </Typography>}
                            value={this.state.lessonType}
                            fullWidth
                            onChange={this.handleLessonTypeChange}
                        />
                        <TextField
                            margin="dense"
                            id="login"
                            label={<Typography>Здание, аудитория: </Typography>}
                            value={this.state.lessonLocation}
                            fullWidth
                            onChange={this.handleLessonLocationChange}
                        />
                        <TextField
                            margin="dense"
                            id="login"
                            label={<Typography>Преподаватель: </Typography>}
                            value={this.state.lessonTeacher}
                            fullWidth
                            onChange={this.handleLessonTeacherChange}
                        />


                    </DialogContent>

                    <DialogActions>

                        <Button onClick={this.confirmEdit} color="primary">
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
