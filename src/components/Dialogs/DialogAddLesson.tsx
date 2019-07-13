import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField,
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
                        <FormControl style={{width: '100%'}}>
                        <InputLabel htmlFor="selectLessonNumber">Номер занятия</InputLabel>
                        <Select
                            value={this.state.lessonNumber}
                            onChange={this.handleLessonNumberChange}
                            input={<Input id="selectLessonNumber" />}
                            fullWidth

                        >
                            <MenuItem value={'1: 8:00 - 9:30'}>1: 8:00 - 9:30</MenuItem>
                            <MenuItem value={'2: 9:40 - 11:10'}>2: 9:40 - 11:10</MenuItem>
                            <MenuItem value={'3: 11:20 - 12:50'}>3: 11:20 - 12:50</MenuItem>
                            <MenuItem value={'4: 13:30 - 15:00'}>4: 13:30 - 15:00</MenuItem>
                            <MenuItem value={'5: 16:40 - 18:10'}>5: 16:40 - 18:10</MenuItem>
                        </Select>
                    </FormControl>
                        <TextField
                            margin="dense"
                            id="login"
                            label={<Typography>Название предмета: </Typography>}
                            value={this.state.lessonName}
                            fullWidth
                            onChange={this.handleLessonNameChange}
                        />
                        <FormControl style={{width: '100%'}}>
                        <InputLabel htmlFor="selectLesson">Вид занятия</InputLabel>
                        <Select
                            value={this.state.lessonType}
                            onChange={this.handleLessonTypeChange}
                            input={<Input id="selectLesson" />}
                            fullWidth

                        >
                            <MenuItem value={'Лекция'}>Лекция</MenuItem>
                            <MenuItem value={'Лабораторная работа'}>Лабораторная работа</MenuItem>
                            <MenuItem value={'Практика'}>Практика</MenuItem>
                        </Select>
                        </FormControl>
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
