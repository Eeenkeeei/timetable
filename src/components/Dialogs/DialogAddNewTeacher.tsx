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
import "moment/locale/ru";

interface DialogAddTaskLessonProps {
    addNewTeacher: any // cb для добавления
}


export class DialogAddNewTeacher extends React.Component<DialogAddTaskLessonProps> {

    state = {
        openDialogWindow: false,
        teacherName: '',
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


    public handleTeacherNameChange = (event: any) => {
        this.setState({
            teacherName: event.target.value
        })
    };

    public addNewTeacher = () => {
        this.props.addNewTeacher({name: this.state.teacherName})
    };

    public render() {
        return (
            <div>
                <Button color="primary" onClick={this.handleOpenLoginDialog}>
                    <Add/>
                </Button>
                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Добавить нового преподавателя</DialogTitle>

                    <DialogContent>

                        <TextField
                            margin="dense"
                            id="login"
                            label={<Typography>Имя преподавателя: </Typography>}
                            value={this.state.teacherName}
                            fullWidth
                            onChange={this.handleTeacherNameChange}
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.addNewTeacher} color="primary">
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
