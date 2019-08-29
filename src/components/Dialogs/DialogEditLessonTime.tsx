import React from 'react'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import {Edit} from "@material-ui/icons";
import {LessonTimeData} from "../../pages/AccountPage";

interface DialogEditLessonTimeProps {
    editLessonInData: any // cb для добавления
    lessonTime: LessonTimeData[]
}


export class DialogEditLessonTime extends React.Component<DialogEditLessonTimeProps> {

    state = {
        openDialogWindow: false,
        firstLessonStart: this.props.lessonTime[0].lessonStartTime,
        firstLessonFinish: this.props.lessonTime[0].lessonFinishTime,
        secondLessonStart: this.props.lessonTime[1].lessonStartTime,
        secondLessonFinish: this.props.lessonTime[1].lessonFinishTime,
        thirdLessonStart: this.props.lessonTime[2].lessonStartTime,
        thirdLessonFinish: this.props.lessonTime[2].lessonFinishTime,
        fourthLessonStart: this.props.lessonTime[3].lessonStartTime,
        fourthLessonFinish: this.props.lessonTime[3].lessonFinishTime,
        fifthLessonStart: this.props.lessonTime[4].lessonStartTime,
        fifthLessonFinish: this.props.lessonTime[4].lessonFinishTime,
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

    public confirmEdit = () => {

    }

    public render() {
        return (
            <div>
                <Button color="primary" disabled={true} onClick={this.handleOpenLoginDialog} style={{marginLeft: '1rem'}}>
                    Раздел в разработке
                </Button>

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Редактирование занятия</DialogTitle>

                    <DialogContent>
                        <Avatar style={{backgroundColor: 'rgba(74, 144, 226, 1)'}}>1</Avatar>
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
