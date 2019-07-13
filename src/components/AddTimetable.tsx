import * as React from "react";
import {
    AppBar,
    Divider, Grid,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import {theme} from "../Theme";
import SwipeableViews from "react-swipeable-views";
import {DialogAddLesson, newLesson} from "./Dialogs/DialogAddLesson";
import {DialogDeleteLesson} from "./Dialogs/DialogDeleteLesson";
import {DialogEditLesson} from "./Dialogs/DialogEditLesson";

interface AddTimetableProps {
    lessons: { evenWeek: newLesson[], unevenWeek: newLesson[] }
    addLessonInData: any,
    deleteLessonInData: any
    editLessonInData: any
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

    public editLessonInData = (lessonObject: newLesson) => {
        this.props.editLessonInData(lessonObject)
    }


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

                                            {this.props.lessons.evenWeek.map((lesson: newLesson) => {
                                                if (lesson.lessonDay === day && lesson.lessonWeek === week) {
                                                    return (
                                                        <div key={Math.random()}>
                                                            <Grid container spacing={3} key={Math.random()} style={{marginLeft: '1rem'}}>
                                                            <Grid item xs={12} sm={3}>
                                                                <Typography variant="h6">{lesson.lessonName}</Typography>
                                                                <Typography  style={{color: 'grey'}}>{lesson.lessonNumber}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <Typography >{lesson.lessonType}</Typography>
                                                                <Typography style={{color: 'grey'}}>{lesson.lessonTeacher}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6} sm={3} >
                                                                <Typography>{lesson.lessonLocation}</Typography>
                                                            </Grid>
                                                            <Grid item sm={3} style={{display: 'flex', justifyContent: 'center' }}>
                                                                <DialogDeleteLesson lesson={lesson} deleteLessonInData={this.deleteLessonInData}/>
                                                                <DialogEditLesson lesson={lesson} editLessonInData={this.editLessonInData}/>

                                                            </Grid>
                                                            </Grid>
                                                            <Divider/>
                                                        </div>
                                                    )
                                                }
                                            })}
                                            {this.props.lessons.unevenWeek.map((lesson: newLesson) => {
                                                if (lesson.lessonDay === day && lesson.lessonWeek === week) {
                                                    return (
                                                        <div key={Math.random()}>
                                                            <Grid container spacing={3} key={Math.random()} style={{marginLeft: '1rem'}}>
                                                                <Grid item xs={12} sm={3}>
                                                                    <Typography variant="h6">{lesson.lessonName}</Typography>
                                                                    <Typography  style={{color: 'grey'}}>{lesson.lessonNumber}</Typography>
                                                                </Grid>
                                                                <Grid item xs={12} sm={3}>
                                                                    <Typography >{lesson.lessonType}</Typography>
                                                                    <Typography style={{color: 'grey'}}>{lesson.lessonTeacher}</Typography>
                                                                </Grid>
                                                                <Grid item xs={6} sm={3} >
                                                                    <Typography>{lesson.lessonLocation}</Typography>
                                                                </Grid>
                                                                <Grid item sm={3} style={{display: 'flex', justifyContent: 'center' }}>
                                                                    <DialogDeleteLesson lesson={lesson} deleteLessonInData={this.deleteLessonInData}/>
                                                                    <DialogEditLesson lesson={lesson} editLessonInData={this.editLessonInData}/>
                                                                </Grid>
                                                            </Grid>
                                                            <Divider/>
                                                        </div>
                                                    )
                                                }
                                            })}

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
