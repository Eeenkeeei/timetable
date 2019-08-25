import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField,
    Typography
} from "@material-ui/core";
import {Edit} from "@material-ui/icons";
import {newLesson} from "./DialogAddLesson";
import {TeacherData} from "../../pages/AccountPage";

interface DialogEditLessonProps {
    lesson: newLesson
    editLessonInData: any // cb для добавления
    teachers: TeacherData[]
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
                <Button onClick={this.handleOpenLoginDialog}  style={{paddingRight: 0, paddingLeft: 0, marginTop: '5px'}}>
                    <Edit/>
                </Button>

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Редактирование занятия</DialogTitle>

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
                                <MenuItem value={'5: 15:10 - 16:40'}>5: 15:10 - 16:40</MenuItem>
                                <MenuItem value={'6: 16:40 - 18:10'}>6: 16:50 - 18:10</MenuItem>
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
                        <FormControl style={{width: '100%'}}>
                            <InputLabel htmlFor="selectTeacher">Преподаватель</InputLabel>
                            <Select
                                value={this.props.lesson.lessonTeacher}
                                onChange={this.handleLessonTeacherChange}
                                input={<Input id="selectTeacher"/>}
                                fullWidth
                            >
                                {this.props.teachers.map((teacher: TeacherData) => {
                                    return (
                                        <MenuItem value={teacher.name} key={teacher.id}>{teacher.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

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
