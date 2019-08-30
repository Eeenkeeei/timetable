import * as React from "react";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {theme} from "../Theme";
import {LoadingComponent, scheduleListComponent} from "../components/UniversalComponents";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";
import SwipeableViews from "react-swipeable-views";
import {newTaskLesson} from "../components/Dialogs/DialogAddTaskLesson";
import {User} from "./AccountPage";
import SnackbarComponent from "../components/Dialogs/SnackBar";

export default class SchedulePage extends React.Component {

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

    componentDidMount(): void {
        document.title = 'Расписание занятий';
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
    };

    public handleAddNewTaskLesson = (taskLesson: newTaskLesson) => {
        const newData: User = this.state.data;
        newData.lessonTasks.push(taskLesson);
        this.updateHandler(newData)
        this.setState({
            openSnackbar: true
        })
        setTimeout(()=>{
            this.setState({
                openSnackbar: false
            })
        }, 4000)
    };

    public render() {
        const stylesForTab = {
            textTransform: 'none',
            minWidth: 72,
        } as React.CSSProperties;

        const timetableMenu = (
            <AppBar position="static" color="default" style={{marginTop: '1rem'}}>
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    return (
                    <Tab label={'Четная неделя'} style={stylesForTab}/>
                    <Tab label={'Нечетная неделя'} style={stylesForTab}/>
                    )
                </Tabs>
            </AppBar>
        );

        const swipeableViews = (
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.tabValue}
                            onChangeIndex={this.handleChangeIndexTab}>
                <div dir={theme.direction}>
                    {scheduleListComponent(
                        this.state.data.lessonTime,
                        this.state.data.teachers,
                        false,
                        false,
                        false,
                        'Четная',
                        this.state.data.lessons.evenWeek,
                        this.state.data.lessons.unevenWeek,
                        this.handleAddNewTaskLesson
                    )}
                </div>
                <div dir={theme.direction}>
                    {scheduleListComponent(this.state.data.lessonTime, this.state.data.teachers, false, false, false, 'Нечетная', this.state.data.lessons.evenWeek, this.state.data.lessons.unevenWeek, this.handleAddNewTaskLesson)}
                </div>
            </SwipeableViews>
        );

        return (
            <div>
                {timetableMenu}
                {this.state.isDataConfirmed ? swipeableViews : LoadingComponent}
                {this.state.openSnackbar ? <SnackbarComponent variant="success" message="Задание добавлено"/> : null}
            </div>
        )
    }
}
