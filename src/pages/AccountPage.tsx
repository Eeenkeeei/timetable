import * as React from "react";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";
import {LoadingComponent} from "../components/UniversalComponents";
import {
    AppBar, Avatar, Chip, Divider, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
    Grid, IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import {theme} from "../Theme";
import {Dashboard, Edit, Fingerprint, Group, ListAlt, Person, Security} from "@material-ui/icons";
import AdminComponent from "./AdminComponent";
import AddTimetable from "../components/AddTimetable";
import {newLesson} from "../components/Dialogs/DialogAddLesson";
import {newTaskLesson} from "../components/Dialogs/DialogAddTaskLesson";
import SnackbarComponent, {MySnackbarContentWrapper} from "../components/Dialogs/SnackBar";
import {DialogAddNewTeacher} from "../components/Dialogs/DialogAddNewTeacher";
import {DialogDeleteTeacher} from "../components/Dialogs/DialogDeleteTeacher";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {TimeIcon} from "@material-ui/pickers/_shared/icons/TimeIcon";
import {DialogEditLessonTime} from "../components/Dialogs/DialogEditLessonTime";
import Snackbar from "@material-ui/core/Snackbar";
import {SyntheticEvent} from "react";

const uuidv4 = require('uuid/v4');

interface AccountPageState {
    isDataConfirmed: boolean | null,
    data: User,
    tabValue: number,
    openSnackbar: boolean
}

export interface TeacherData {
    name: string
    id: number
}

export interface LessonTimeData {
    lessonNumber: number
    lessonStartTime: string
    lessonFinishTime: string
    id: string
}

export interface User {
    email: string,
    registrationDate: string,
    password: string,
    admin: boolean,
    lastLoginDate: string,
    lessons: {
        evenWeek: newLesson[],
        unevenWeek: newLesson[]
    },
    lessonTasks: newTaskLesson[],
    teachers: TeacherData[],
    lessonTime: LessonTimeData[]
}


export default class AccountPage extends React.Component<AccountPageState> {

    state = {
        isDataConfirmed: null,
        tabValue: 0,
        data: {
            email: '',
            registrationDate: '',
            password: '',
            admin: false,
            lastLoginDate: '',
            lessons: {evenWeek: [], unevenWeek: []},
            lessonTasks: [],
            teachers: [],
            lessonTime: []
        },
        openSnackbar: false
    };

    public theme: any;

    componentDidMount(): void {
        document.title = 'Аккаунт';
        const storage = new DataStorage(new LocalStorage());
        const http = new Http();
        if (storage.getUserData !== null) {
            http.loginWithToken(storage.getUserData, '/user')
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.email !== undefined) {
                            this.setState({
                                data: result
                            }, () => {
                                this.setState({
                                    isDataConfirmed: true
                                })
                            })
                        } else {
                            this.setState({
                                isDataConfirmed: false
                            }, () => {
                                storage.logOut()
                            })
                        }
                    }, (error) => {
                        console.log(error)
                    }
                );
        } else {
            this.setState({
                isDataConfirmed: false
            })
        }
    }

    public handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            tabValue: newValue
        })
    };

    public handleChangeIndexTab = (index: number) => {
        this.setState({
            tabValue: index
        })
    };

    public updateHandler = (data: User) => {
        const storage = new DataStorage(new LocalStorage());
        const http = new Http();
        if (storage.getUserData !== null) {
            http.updateUserData(data, '/updateData')
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.email !== undefined) {
                            this.setState({
                                data: result
                            }, () => {
                                this.setState({
                                    isDataConfirmed: true
                                });
                                this.setState({
                                    openSnackbar: true
                                });
                            })
                        } else {
                            this.setState({
                                isDataConfirmed: false
                            }, () => {
                                storage.logOut()
                            })
                        }
                    }, (error) => {
                        console.log(error)
                    }
                );
        } else {
            this.setState({
                isDataConfirmed: false
            })
        }
    };

    public addLessonInData = (lesson: newLesson) => {

        const newData: User = this.state.data;
        if (lesson.lessonWeek === 'Четная') {
            newData.lessons.evenWeek.push(lesson)
        }

        if (lesson.lessonWeek === 'Нечетная') {
            newData.lessons.unevenWeek.push(lesson)
        }
        this.updateHandler(newData)

    };

    public deleteLessonInData = (lesson: newLesson) => {
        const newData: User = this.state.data;
        if (lesson.lessonWeek === 'Четная') {
            newData.lessons.evenWeek.splice(newData.lessons.evenWeek.indexOf(lesson), 1)
        }

        if (lesson.lessonWeek === 'Нечетная') {
            newData.lessons.unevenWeek.splice(newData.lessons.unevenWeek.indexOf(lesson), 1)
        }
        this.updateHandler(newData)
    };

    public editLessonInData = (lessons: any) => {
        const newData: User = this.state.data;
        if (lessons.newLesson.lessonWeek === 'Четная') {
            newData.lessons.evenWeek[newData.lessons.evenWeek.indexOf(lessons.oldLesson)] = lessons.newLesson
        }

        if (lessons.newLesson.lessonWeek === 'Нечетная') {
            newData.lessons.unevenWeek[newData.lessons.unevenWeek.indexOf(lessons.oldLesson)] = lessons.newLesson
        }
        this.updateHandler(newData)
    };

    public handleEditLessonTimeInData = (lessonSchedule: LessonTimeData[]) => {
        const newData: User = this.state.data;
        newData.lessonTime = lessonSchedule;
        this.updateHandler(newData)
    };

    public addTeacherInData = (teacher: TeacherData) => {
        const newData: User = this.state.data;
        const newTeacher: TeacherData = {
            name: teacher.name,
            id: uuidv4()
        };
        newData.teachers.push(newTeacher);
        this.updateHandler(newData)
    };

    public deleteTeacherInData = (teacher: TeacherData) => {
        const newData: User = this.state.data;
        newData.teachers.forEach((teacherForDelete: TeacherData) => {
            if (teacherForDelete.id === teacher.id) {
                newData.teachers.splice(newData.teachers.indexOf(teacherForDelete), 1)
            }
        });
        this.updateHandler(newData)
    };

    public render() {

        const stylesForTab = {
            textTransform: 'none',
            minWidth: 72,
        } as React.CSSProperties;

        const tabsArray = [
            // {label: 'Учетная запись', icon: <Person/>},
            {label: 'Мое расписание', icon: <ListAlt/>},
            // {label: 'Безопасность', icon: <Security/>},
            {label: 'Сервисы', icon: <Dashboard/>},
            {label: 'Админ', icon: <Fingerprint/>, admin: true},
        ];

        const mobileMenu = (
            <AppBar position="static" color="default" className="topBarMin top">
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    {tabsArray.map((tabData: any) => {
                        if (this.state.data.admin === true && tabData.label === 'Админ') {
                            return (
                                <Tab icon={tabData.icon} style={stylesForTab}
                                     key={tabData.label}/>
                            )
                        } else {
                            if (tabData.admin === undefined) {
                                return (
                                    <Tab icon={tabData.icon} style={stylesForTab}
                                         key={tabData.label}/>
                                )
                            }
                        }
                    })}
                </Tabs>
            </AppBar>
        );

        const fullMenu = (
            <AppBar position="static" color="default" className="topBarMax">
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    {tabsArray.map((tabData: any) => {
                        if (this.state.data.admin === true && tabData.label === 'Админ') {
                            return (
                                <Tab label={tabData.label} icon={tabData.icon} style={stylesForTab}
                                     key={tabData.label}/>
                            )
                        } else {
                            if (tabData.admin === undefined) {
                                return (
                                    <Tab label={tabData.label} icon={tabData.icon} style={stylesForTab}
                                         key={tabData.label}/>
                                )
                            }
                        }
                    })}
                </Tabs>
            </AppBar>
        );

        const accountDataComponent = (
            <div style={{marginTop: '1rem', overflow: 'hidden'}}>
                <Grid container spacing={3}>
                    <Grid style={{textAlign: 'center'}} item xs={6} sm={6}>

                        <Typography variant="body1">
                            Email:
                        </Typography>

                    </Grid>
                    <Grid style={{textAlign: 'center'}} item xs={6} sm={6}>

                        <Typography variant="body1">
                            {this.state.data.email}
                        </Typography>

                    </Grid>
                </Grid>
            </div>
        );

        const ServiceComponent = () => {
            return (
                <div >
                    <ExpansionPanel style={{width: '98%', margin: '1em auto'}}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Group style={{marginRight: '0.5rem'}}/><Typography>Список преподавателей</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{display: 'block', padding: 0}}>
                            <DialogAddNewTeacher addNewTeacher={this.addTeacherInData}/>
                            <List>
                            {this.state.data.teachers.map((teacher: TeacherData) => {
                                return (
                                    <ListItem key={teacher.id} >
                                        <ListItemText>
                                            <Typography variant="body1">{teacher.name}</Typography>
                                        </ListItemText>
                                        <DialogDeleteTeacher teacher={teacher} deleteTeacherInData={this.deleteTeacherInData}/>
                                        <Divider/>
                                    </ListItem>
                                )
                            })}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel style={{width: '98%', margin: '1em auto'}}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header1"
                        >
                            <TimeIcon style={{marginRight: '0.5rem'}}/><Typography>Расписание занятий</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{display: 'block', padding: 0}}>
                            <DialogEditLessonTime editLessonTimeInData={this.handleEditLessonTimeInData} lessonTime={this.state.data.lessonTime}/>
                            {this.state.data.lessonTime.map((lessonTime: LessonTimeData) => {
                                return (
                                    <ListItem key={lessonTime.id} >
                                        <Chip variant="outlined" color="primary" avatar={<Avatar>{lessonTime.lessonNumber}</Avatar>}
                                              label={<Typography>{lessonTime.lessonStartTime} - {lessonTime.lessonFinishTime}</Typography>}

                                        />
                                        <Divider/>
                                    </ListItem>
                                )
                            })}


                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            )
        };

        const accountPageBody = (
            <div>
                {mobileMenu}
                {fullMenu}
                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.tabValue}
                                onChangeIndex={this.handleChangeIndexTab}>

                    {/*{this.state.isDataConfirmed ? <div dir={theme.direction}>{accountDataComponent}</div> : <div/>}*/}
                    {this.state.isDataConfirmed ?
                        <div dir={theme.direction}>
                            <AddTimetable lessons={this.state.data.lessons}
                                          teachers={this.state.data.teachers}
                                          addLessonInData={this.addLessonInData}
                                          deleteLessonInData={this.deleteLessonInData}
                                          editLessonInData={this.editLessonInData}
                                          lessonTime={this.state.data.lessonTime}
                            />
                        </div>
                        :
                        <div/>
                    }
                    {/*<div dir={theme.direction}>text3</div>*/}
                    {this.state.isDataConfirmed ?
                        <div dir={theme.direction}>
                            <ServiceComponent/>
                        </div>
                        :
                        <div/>
                    }
                    <div dir={theme.direction}><AdminComponent/></div>
                </SwipeableViews>
            </div>
        );

        const waitingComponent = (
            <div>
                <Typography variant={"h6"}>Пожалуйста, подождите. Данные обновляются.</Typography>
            </div>
        );

        const handleClose = (event?: SyntheticEvent, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

           this.setState({
               openSnackbar: false
           })
        };
        return (
            <div>
                {this.state.isDataConfirmed === null ? LoadingComponent : null}
                {this.state.data !== undefined ? accountPageBody : waitingComponent}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnackbar}
                    onClose={handleClose}
                >
                    <MySnackbarContentWrapper
                        onClose={handleClose}
                        variant={"success"}
                        message={'Данные обновлены'}
                    />
                </Snackbar>
            </div>
        )
    }
}
