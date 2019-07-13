import * as React from "react";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";
import {LoadingComponent} from "../components/UniversalComponents";
import {AppBar, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import {theme} from "../Theme";
import {Dashboard, Fingerprint, ListAlt, Person, Security} from "@material-ui/icons";
import AdminComponent from "./AdminComponent";
import AddTimetable from "../components/AddTimetable";
import {newLesson} from "../components/Dialogs/DialogAddLesson";

interface AccountPageState {
    isDataConfirmed: boolean | null,
    data: User,
    tabValue: number
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
    }

}


export default class AccountPage extends React.Component<AccountPageState> {

    state = {
        isDataConfirmed: null,
        tabValue: 0,
        data: {email: '', registrationDate: '', password: '', admin: false, lastLoginDate: '', lessons: {evenWeek: [], unevenWeek: []}}
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

    // TODO
    public addLessonInData = (lesson: newLesson ) => {

        const newData:User = this.state.data;
        if (lesson.lessonWeek === 'Четная'){
            newData.lessons.evenWeek.push(lesson)
        }

        if (lesson.lessonWeek === 'Нечетная'){
            newData.lessons.unevenWeek.push(lesson)
        }
        this.updateHandler(newData)

    };

    public deleteLessonInData = (lesson: newLesson) => {
        const newData:User = this.state.data;
        if (lesson.lessonWeek === 'Четная'){
            newData.lessons.evenWeek.splice(newData.lessons.evenWeek.indexOf(lesson),1)
        }

        if (lesson.lessonWeek === 'Нечетная'){
            newData.lessons.unevenWeek.splice(newData.lessons.unevenWeek.indexOf(lesson),1)
        }
        this.updateHandler(newData)
    };


    public render() {

        const stylesForTab = {
            textTransform: 'none',
            minWidth: 72,
        } as React.CSSProperties;

        const tabsArray = [
            {label: 'Учетная запись', icon: <Person/>},
            {label: 'Мое расписание', icon: <ListAlt/>},
            {label: 'Безопасность', icon: <Security/>},
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

        const accountPageBody = (
            <div>
                {mobileMenu}
                {fullMenu}
                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.tabValue}
                                onChangeIndex={this.handleChangeIndexTab}>

                    {this.state.isDataConfirmed ? <div dir={theme.direction}><AddTimetable lessons={this.state.data.lessons} addLessonInData={this.addLessonInData} deleteLessonInData={this.deleteLessonInData}/></div> : <div/>}
                    {this.state.isDataConfirmed ? <div dir={theme.direction}>{accountDataComponent}</div> : <div/>}
                    <div dir={theme.direction}>text3</div>
                    <div dir={theme.direction}>text4</div>
                    <div dir={theme.direction}><AdminComponent/></div>
                </SwipeableViews>
            </div>
        );

        const waitingComponent = (
            <div>
                <Typography variant={"h6"}>Пожалуйста, подождите. Данные обновляются.</Typography>
            </div>
        );

        return (
            <div>
                {this.state.isDataConfirmed === null ? LoadingComponent : null}
                {this.state.data !== undefined ? accountPageBody : waitingComponent}
            </div>
        )
    }
}
