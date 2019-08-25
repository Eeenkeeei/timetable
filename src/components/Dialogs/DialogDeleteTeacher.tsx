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
import {TeacherData} from "../../pages/AccountPage";


interface DialogDeleteTeacherProps {
    teacher: TeacherData
    deleteTeacherInData: (teacher: TeacherData) => void
}


export class DialogDeleteTeacher extends React.Component<DialogDeleteTeacherProps> {

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
        this.props.deleteTeacherInData(this.props.teacher)
    };

    public render() {
        return (
            <div>
                <Button onClick={this.handleOpenLoginDialog} style={{paddingRight: 0, paddingLeft: 0, marginTop: '5px'}}>
                    <Delete/>
                </Button>

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Удаление преподавателя</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Вы действительно хотите удалить этого преподавателя?
                        </DialogContentText>
                        <DialogContentText>
                            {this.props.teacher.name}
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
