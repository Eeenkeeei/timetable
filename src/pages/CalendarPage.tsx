import * as React from "react";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";
import {newTaskLesson} from "../components/Dialogs/DialogAddTaskLesson";
import {TeacherData, User} from "./AccountPage";
import SnackbarComponent from "../components/Dialogs/SnackBar";
import moment from 'moment';
import {theme} from "../Theme";
import {LoadingComponent} from "../components/UniversalComponents";
import SwipeableViews from "react-swipeable-views";
import {
    AppBar,
    Badge, FormControl, Grid, Input,
    InputLabel, MenuItem, Select,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tabs,
    Typography
} from "@material-ui/core";
import {DialogViewDay} from "../components/Dialogs/DialogViewDay";

export default class CalendarPage extends React.Component {

    state = {
        isDataConfirmed: null,
        tabValue: new Date().getMonth(),
        data: {
            email: '',
            registrationDate: '',
            password: '',
            admin: false,
            lastLoginDate: '',
            lessons: {evenWeek: [], unevenWeek: []},
            lessonTasks: [],
            teachers: []
        },
        openSnackbar: false,
        months: [[]],
        selectedMonth: ''
    };

    componentDidMount(): void {
        document.title = 'Расписание занятий';
        let months: any = [];
        let monthsCounter = 0;
        while (monthsCounter < 12) {
            const count = moment().month(monthsCounter).daysInMonth();
            const days = [];
            for (let i = 1; i < count + 1; i++) {
                days.push(moment().month(monthsCounter).date(i));

            }
            months.push(days);
            monthsCounter++
        }

        this.setState({
            months: months,
            selectedMonth: this.returnRussianMonthName(new Date().toDateString().split(' ')[1])
        });

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
        this.updateHandler(newData);
        this.setState({
            openSnackbar: true
        });
        setTimeout(() => {
            this.setState({
                openSnackbar: false
            })
        }, 4000)
    };

    public returnRussianMonthName = (monthName: string) => {
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        if (monthName === 'Jan') {
            return (monthNames[0])
        }
        if (monthName === 'Feb') {
            return (monthNames[1])
        }
        if (monthName === 'Mar') {
            return (monthNames[2])
        }
        if (monthName === 'Apr') {
            return (monthNames[3])
        }
        if (monthName === 'May') {
            return (monthNames[4])
        }
        if (monthName === 'Jun') {
            return (monthNames[5])
        }
        if (monthName === 'Jul') {
            return (monthNames[6])
        }
        if (monthName === 'Aug') {
            return (monthNames[7])
        }
        if (monthName === 'Sep') {
            return (monthNames[8])
        }
        if (monthName === 'Oct') {
            return (monthNames[9])
        }
        if (monthName === 'Nov') {
            return (monthNames[10])
        }
        if (monthName === 'Dec') {
            return (monthNames[11])
        }
    }

    public handleChangeMonthInMobileVersion = (event: any) => {
        this.setState({
            selectedMonth: event.target.value
        })
    };

    public render() {

        const stylesForTab = {
            textTransform: 'none',
            minWidth: 72,
        } as React.CSSProperties;

        const calendarMenuFullVersion = (
            <AppBar position="static" color="default" style={{marginTop: '1rem'}}>
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    {this.state.months.map(month => {
                        return (
                            <Tab label={this.returnRussianMonthName(new Date(month[0]).toDateString().split(' ')[1])}
                                 style={stylesForTab}
                                 key={Math.random()}/>
                        )
                    })}
                </Tabs>
            </AppBar>
        );

        const dayCard = (day: string) => {
            const tasks: newTaskLesson[] = [];
            const engMonthName = new Date(day).toDateString().split(' ')[1]
            const rusMonthName = this.returnRussianMonthName(engMonthName)
            this.state.data.lessonTasks.map((task: newTaskLesson) => {
                if (task.taskDate !== undefined && new Date(task.taskDate).toDateString() === day) {
                    tasks.push(task)
                }
            });
            return (
                <Badge style={{}} badgeContent={tasks.length} color="error">
                    <div style={{
                        width: '140px',
                        height: '110px',
                        textAlign: 'right',
                        borderLeft: '1px solid rgba(224, 224, 224, 1)',
                        marginTop: '7px'
                    }}>

                        <Typography style={{color: 'grey'}} variant="subtitle1">
                            {rusMonthName}
                        </Typography>
                        <Typography style={{color: 'grey'}} variant="h4">
                            {Number(day.split(' ')[2])}
                        </Typography>
                        {tasks.length >= 1 ?
                            <div style={{marginRight: '100%'}}><DialogViewDay tasks={tasks} day={day}/></div> : null}
                    </div>
                </Badge>
            )
        };

        const swipeableViews = (
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.tabValue}
                            onChangeIndex={this.handleChangeIndexTab}>
                {this.state.months.map((month) => {
                    let cells: string[] = [];
                    const dayName = new Date(month[0]).toDateString().split(' ')[0]
                    if (dayName === 'Mon') {
                        cells = month
                    }
                    if (dayName === 'Tue') {
                        cells = ['empty', ...month]
                    }
                    if (dayName === 'Wed') {
                        cells = ['empty', 'empty', ...month]
                    }
                    if (dayName === 'Thu') {
                        cells = ['empty', 'empty', 'empty', ...month]
                    }
                    if (dayName === 'Fri') {
                        cells = ['empty', 'empty', 'empty', 'empty', ...month]
                    }
                    if (dayName === 'Sat') {
                        cells = ['empty', 'empty', 'empty', 'empty', 'empty', ...month]
                    }
                    if (dayName === 'Sun') {
                        cells = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', ...month]
                    }
                    return (
                        <Table style={{tableLayout: 'fixed'}} key={Math.random()}>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{width: '14,28%', paddingLeft: '0px'}}>
                                        <Typography style={{marginLeft: '1rem'}}>Понедельник</Typography>
                                    </TableCell>
                                    <TableCell style={{paddingLeft: '0px'}}>
                                        <Typography style={{marginLeft: '1rem'}}>Вторник</Typography>
                                    </TableCell>
                                    <TableCell style={{paddingLeft: '0px'}}>
                                        <Typography style={{marginLeft: '1rem'}}>Среда</Typography>
                                    </TableCell>
                                    <TableCell style={{paddingLeft: '0px'}}>
                                        <Typography style={{marginLeft: '1rem'}}>Четверг</Typography>
                                    </TableCell>
                                    <TableCell style={{paddingLeft: '0px'}}>
                                        <Typography style={{marginLeft: '1rem'}}>Пятница</Typography>
                                    </TableCell>
                                    <TableCell style={{paddingLeft: '0px'}}>
                                        <Typography style={{marginLeft: '1rem'}}>Суббота</Typography>
                                    </TableCell>
                                    <TableCell style={{paddingLeft: '0px'}}>
                                        <Typography style={{marginLeft: '1rem'}}>Воскресенье</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    {cells.slice(0, 7).map((day: any) => {
                                        return (
                                            <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                                {day === 'empty' ? <div/> : dayCard(new Date(day).toDateString())}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                                <TableRow>
                                    {cells.slice(7, 14).map((day: any) => {
                                        return (
                                            <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                                {day === 'empty' ? <div/> : dayCard(new Date(day).toDateString())}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                                <TableRow>
                                    {cells.slice(14, 21).map((day: any) => {
                                        return (
                                            <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                                {day === 'empty' ? <div/> : dayCard(new Date(day).toDateString())}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                                <TableRow>
                                    {cells.slice(21, 28).map((day: any) => {
                                        return (
                                            <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                                {day === 'empty' ? <div/> : dayCard(new Date(day).toDateString())}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                                <TableRow>
                                    {cells.slice(28, 35).map((day: any) => {
                                        return (
                                            <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                                {day === 'empty' ? <div/> : dayCard(new Date(day).toDateString())}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                                <TableRow>
                                    {cells.slice(35, 42).map((day: any) => {
                                        return (
                                            <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                                {day === 'empty' ? <div/> : dayCard(new Date(day).toDateString())}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableBody>
                        </Table>
                    )
                })}
            </SwipeableViews>
        );

        const CalendarMenuMobileVersion = () => {
            return (
                <FormControl style={{width: '100%'}}>
                    <InputLabel htmlFor="selectTeacher">Выбранный месяц</InputLabel>
                    <Select
                        value={this.state.selectedMonth}
                        onChange={this.handleChangeMonthInMobileVersion}
                        input={<Input id="selectTeacher"/>}
                        fullWidth
                    >
                        {this.state.months.map((monthArray: any) => {
                            const month = this.returnRussianMonthName(new Date(monthArray[0]).toDateString().split(' ')[1]);
                            return (
                                <MenuItem value={month} key={Math.random()}>{month}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            )
        };

        const CalendarBodyMobileVersion = () => {

            const dayCardMobile = (day: string) => {
                const tasks: newTaskLesson[] = [];
                this.state.data.lessonTasks.map((task: newTaskLesson) => {
                    if (task.taskDate !== undefined && new Date(task.taskDate).toDateString() === day) {
                        tasks.push(task)
                    }
                });
                return (
                    <Badge style={{}} badgeContent={tasks.length} color="error">
                        <div style={{
                            width: '20px',
                            maxWidth: '20px',
                            height: '30px',
                            textAlign: 'right',
                            borderLeft: '1px solid rgba(224, 224, 224, 1)',
                            marginTop: '7px'
                        }}>

                            <Typography style={{color: 'grey', marginLeft: '0.5rem'}} variant="h6">
                                {Number(day.split(' ')[2])}
                            </Typography>
                            {tasks.length >= 1 ?
                                <div style={{marginBottom: '3rem'}}><DialogViewDay tasks={tasks} day={day}/></div> : null}
                        </div>
                    </Badge>
                )
            }

            const CalendarBody = () => {
                let monthArr: any[] = []
                this.state.months.map((month) => {
                    const monthName = new Date(month[0]).toDateString().split(' ')[1];
                    if (this.returnRussianMonthName(monthName) === this.state.selectedMonth) {
                        monthArr = month
                    }
                });
                const dayName = new Date(monthArr[0]).toDateString().split(' ')[0];
                let cells: string[] = [];

                if (dayName === 'Mon') {
                    cells = monthArr
                }
                if (dayName === 'Tue') {
                    cells = ['empty', ...monthArr]
                }
                if (dayName === 'Wed') {
                    cells = ['empty', 'empty', ...monthArr]
                }
                if (dayName === 'Thu') {
                    cells = ['empty', 'empty', 'empty', ...monthArr]
                }
                if (dayName === 'Fri') {
                    cells = ['empty', 'empty', 'empty', 'empty', ...monthArr]
                }
                if (dayName === 'Sat') {
                    cells = ['empty', 'empty', 'empty', 'empty', 'empty', ...monthArr]
                }
                if (dayName === 'Sun') {
                    cells = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', ...monthArr]
                }
                return (
                    <Table style={{tableLayout: 'fixed'}} key={Math.random()}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: '14,28%', paddingLeft: '0px'}}>
                                    <Typography style={{marginLeft: '1rem'}}>Пн</Typography>
                                </TableCell>
                                <TableCell style={{paddingLeft: '0px'}}>
                                    <Typography style={{marginLeft: '1rem'}}>Вт</Typography>
                                </TableCell>
                                <TableCell style={{paddingLeft: '0px'}}>
                                    <Typography style={{marginLeft: '1rem'}}>Ср</Typography>
                                </TableCell>
                                <TableCell style={{paddingLeft: '0px'}}>
                                    <Typography style={{marginLeft: '1rem'}}>Чт</Typography>
                                </TableCell>
                                <TableCell style={{paddingLeft: '0px'}}>
                                    <Typography style={{marginLeft: '1rem'}}>Пт</Typography>
                                </TableCell>
                                <TableCell style={{paddingLeft: '0px'}}>
                                    <Typography style={{marginLeft: '1rem'}}>Сб</Typography>
                                </TableCell>
                                <TableCell style={{paddingLeft: '0px'}}>
                                    <Typography style={{marginLeft: '1rem'}}>Вс</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {cells.slice(0, 7).map((day: any) => {
                                    return (
                                        <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                            {day === 'empty' ? <div/> : dayCardMobile(new Date(day).toDateString())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            <TableRow>
                                {cells.slice(7, 14).map((day: any) => {
                                    return (
                                        <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                            {day === 'empty' ? <div/> : dayCardMobile(new Date(day).toDateString())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            <TableRow>
                                {cells.slice(14, 21).map((day: any) => {
                                    return (
                                        <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                            {day === 'empty' ? <div/> : dayCardMobile(new Date(day).toDateString())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            <TableRow>
                                {cells.slice(21, 28).map((day: any) => {
                                    return (
                                        <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                            {day === 'empty' ? <div/> : dayCardMobile(new Date(day).toDateString())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            <TableRow>
                                {cells.slice(28, 35).map((day: any) => {
                                    return (
                                        <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                            {day === 'empty' ? <div/> : dayCardMobile(new Date(day).toDateString())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            <TableRow>
                                {cells.slice(35, 42).map((day: any) => {
                                    return (
                                        <TableCell style={{paddingLeft: '0px'}} key={Math.random()}>
                                            {day === 'empty' ? <div/> : dayCardMobile(new Date(day).toDateString())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableBody>
                    </Table>
                );
            };


            return (
                <CalendarBody/>
            )
        };

        return (
            <div>
                <div className="top" style={{marginTop: '5rem'}}>
                    <CalendarMenuMobileVersion/>
                    <CalendarBodyMobileVersion/>
                </div>

                <div style={{minWidth: '1216px', overflow: 'auto'}} className="topBarMax">
                    {calendarMenuFullVersion}

                    {this.state.isDataConfirmed ? swipeableViews : LoadingComponent}
                </div>
                {this.state.openSnackbar ? <SnackbarComponent variant="success" message="Задание добавлено"/> : null}
            </div>
        )
    }
}
