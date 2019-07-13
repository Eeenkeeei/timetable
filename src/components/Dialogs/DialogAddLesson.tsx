import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField,
    Typography
} from "@material-ui/core";
import {Add} from "@material-ui/icons";

interface DialogAddLessonProps {
    lessonDay: string,
    lessonWeek: string,
    addLesson: any // cb для добавления
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


export class DialogAddLesson extends React.Component<DialogAddLessonProps> {

    state = {
        openDialogWindow: false,
        lessonNumber: '',
        lessonName: '',
        lessonType: '',
        lessonLocation: '',
        lessonTeacher: ''
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
        const newLesson: newLesson = {
            lessonWeek: this.props.lessonWeek,
            lessonDay: this.props.lessonDay,
            lessonName: this.state.lessonName,
            lessonType: this.state.lessonType,
            lessonNumber: this.state.lessonNumber,
            lessonLocation: this.state.lessonLocation,
            lessonTeacher: this.state.lessonTeacher
        };
        this.props.addLesson(newLesson);
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
                <Button color="primary" onClick={this.handleOpenLoginDialog}>
                    <Add/>
                </Button>

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Добавление нового занятия</DialogTitle>

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
