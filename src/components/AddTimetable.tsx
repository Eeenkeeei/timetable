import * as React from "react";
import {
    AppBar,
    Card,
    CardContent, Divider, Grid,
    IconButton,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    Tab, Table, TableBody, TableCell, TableRow,
    Tabs,
    Typography
} from "@material-ui/core";
import {theme} from "../Theme";
import SwipeableViews from "react-swipeable-views";
import {DialogAddLesson, newLesson} from "./Dialogs/DialogAddLesson";
import {DialogDeleteLesson} from "./Dialogs/DialogDeleteLesson";

interface AddTimetableProps {
    lessons: { evenWeek: newLesson[], unevenWeek: newLesson[] }
    addLessonInData: any,
    deleteLessonInData: any
}

export default class AddTimetable extends React.Component<AddTimetableProps> {

    state = {
        tabValue: 0,
    };

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

    public handleAddLesson = (lessonObject: newLesson) => {
        this.props.addLessonInData(lessonObject)
    };

    public deleteLessonInData = (lessonObject: newLesson) =>{
        this.props.deleteLessonInData(lessonObject)
    };


    public render() {
        const stylesForTab = {
            textTransform: 'none',
            minWidth: 72,
        } as React.CSSProperties;

        const daysInWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

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

        const tableCellStyle = {
            width: '1000px',
        } as React.CSSProperties;

        const dayListComponent = (week: string) => {
            return (
                <div>
                    <List dense={true}>
                        {daysInWeek.map((day: string) => {
                            return (
                                <div key={'day' + Math.random()}>
                                    <ListItem>
                                        <ListItemText
                                            primary={<Typography variant='h6'>{day}</Typography>}
                                        />
                                        <ListItemSecondaryAction>
                                            <DialogAddLesson lessonDay={day} lessonWeek={week}
                                                             addLesson={this.handleAddLesson}/>
                                        </ListItemSecondaryAction>
                                    </ListItem>

                                    <Table size="small">
                                        <TableBody>
                                            {this.props.lessons.evenWeek.map((lesson: newLesson) => {
                                                if (lesson.lessonDay === day && lesson.lessonWeek === week) {

                                                    return (
                                                        <TableRow key={Math.random()}>
                                                            <Grid container spacing={3}>
                                                            <Grid item style={{maxWidth: '10%', paddingRight: '5px'}}><Typography>{lesson.lessonName}</Typography><Typography  style={{color: 'grey'}}>{lesson.lessonNumber}</Typography>
                                                            </Grid>
                                                            <TableCell style={{maxWidth: '20%', padding: 0}}><Typography>{lesson.lessonType}</Typography> <Typography style={{color: 'grey'}}>{lesson.lessonTeacher}</Typography>
                                                            </TableCell>
                                                            <TableCell style={{maxWidth: '40%', paddingRight: 0}}><Typography>{lesson.lessonLocation}</Typography></TableCell>
                                                            <TableCell style={{padding: 0}}>
                                                                <DialogDeleteLesson lesson={lesson} deleteLessonInData={this.deleteLessonInData}/>
                                                                <DialogDeleteLesson lesson={lesson} deleteLessonInData={this.deleteLessonInData}/>
                                                            </TableCell>
                                                            </Grid>
                                                        </TableRow>
                                                    )
                                                }
                                            })}
                                            {this.props.lessons.unevenWeek.map((lesson: newLesson) => {
                                                if (lesson.lessonDay === day && lesson.lessonWeek === week) {

                                                    return (
                                                        <TableRow key={Math.random()}>
                                                            <TableCell style={{width: '15%'}}><Typography>{lesson.lessonName}</Typography><Typography  style={{color: 'grey'}}>{lesson.lessonNumber}</Typography>
                                                            </TableCell>
                                                            <TableCell style={{width: '35%'}}><Typography>{lesson.lessonType}</Typography> <Typography style={{color: 'grey'}}>{lesson.lessonTeacher}</Typography>
                                                            </TableCell>
                                                            <TableCell style={{width: '30%'}}><Typography>{lesson.lessonLocation}</Typography></TableCell>
                                                            <TableCell style={{width: '20%'}}><DialogDeleteLesson lesson={lesson} deleteLessonInData={this.deleteLessonInData}/></TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            )
                        })}
                    </List>
                </div>
            )
        };




        return (
            <div>
                {timetableMenu}
                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.tabValue}
                                onChangeIndex={this.handleChangeIndexTab}>
                    <div dir={theme.direction}>{dayListComponent('Четная')}</div>
                    <div dir={theme.direction}>{dayListComponent('Нечетная')}</div>
                </SwipeableViews>
            </div>
        )
    }
}
