import {theme} from "../Theme";
import {
    Card,
    CardContent,
    CardMedia,
    CircularProgress, Divider,
    Grid,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/styles";
import React from "react";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";
import {DialogDeleteNews} from "./Dialogs/DialogDeleteNews";
import {DialogEditNews} from "./Dialogs/DialogEditNews";
import {newsData} from "../pages/StartPage";
import {DialogAddLesson, newLesson} from "./Dialogs/DialogAddLesson";
import {DialogDeleteLesson} from "./Dialogs/DialogDeleteLesson";
import {DialogEditLesson} from "./Dialogs/DialogEditLesson";
import {DialogAddTaskLesson} from "./Dialogs/DialogAddTaskLesson";
import {TeacherData} from "../pages/AccountPage";

export const LoadingComponent = (
    <MuiThemeProvider theme={theme}>
        <div style={{marginTop: '1rem', textAlign: 'center'}}>
            <CircularProgress/>
            <div>
                <Typography variant={"h6"}>Пожалуйста, подождите. Данные обновляются.</Typography>
            </div>
        </div>
    </MuiThemeProvider>
)

export function checkUserData() {
    let flag: boolean;
    const storage = new DataStorage(new LocalStorage());
    const http = new Http();
    if (storage.getUserData !== null) {
        http.loginWithToken(storage.getUserData, '/user')
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.email !== undefined) {
                        flag = true;
                        return (flag)
                    } else {
                        storage.logOut();
                        flag = false;
                        return (flag)

                    }
                }, (error) => {
                    console.log(error)
                }
            );
    } else {
        flag = false;
        return (flag)
    }
}

interface NewsComponentProps {
    newsData: newsData,
    admin: boolean,
    getNewsCb?: any
}

export default class NewsComponent extends React.Component<NewsComponentProps> {

    public render() {
        return (
            <div key={this.props.newsData._id}>

                <Card style={{marginTop: '1rem'}}>
                    {this.props.admin ? <div style={{display: 'flex', margin: '10px'}}>
                        <DialogDeleteNews newsData={this.props.newsData}
                                          getNews={this.props.getNewsCb}/>
                        <DialogEditNews newsData={this.props.newsData}
                                        getNews={this.props.getNewsCb}/>
                    </div> : null}

                    <div style={{textAlign: 'center'}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <CardMedia
                                    style={{
                                        width: '220px',
                                        height: '220px',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        margin: '1.5rem',
                                        gridRowStart: 1,
                                        gridRowEnd: 2
                                    }}
                                    className="boxShadow"
                                    image={this.props.newsData.img}
                                    title={this.props.newsData.header}
                                />

                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <CardContent>
                                    <Typography
                                        variant="h6">{this.props.newsData.header}</Typography>
                                </CardContent>
                                <Typography
                                    variant="body1">{this.props.newsData.body}</Typography>
                                <Typography variant="caption"
                                            style={{
                                                color: 'grey',
                                                marginLeft: 'auto',
                                            }}>Дата:&nbsp; {this.props.newsData.data}, &nbsp; Автор: &nbsp;{this.props.newsData.author}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </div>
        )
    }
}

const daysInWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const scheduleString = (teachers: TeacherData[], lesson: newLesson, editLessonInData: any, deleteLessonInData: any, addNewTaskLesson?: any ) => {
    return (
        <div key={Math.random()} style={{marginTop: '7px'}}>
            <Grid container spacing={3} key={Math.random()} style={{marginLeft: '1rem', width: '95%'}}>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h6">{lesson.lessonName}</Typography>
                    <Typography style={{color: 'grey'}}>{lesson.lessonNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography>{lesson.lessonType}</Typography>
                    <Typography style={{color: 'grey'}}>{lesson.lessonTeacher}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography>{lesson.lessonLocation}</Typography>
                </Grid>
                <Grid item sm={3} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {editLessonInData === false ? null :
                        <DialogDeleteLesson lesson={lesson} deleteLessonInData={deleteLessonInData}/>}
                    {editLessonInData === false ? null :
                        <DialogEditLesson teachers={teachers} lesson={lesson} editLessonInData={editLessonInData}/>}
                    {addNewTaskLesson === undefined ? null :
                        <DialogAddTaskLesson lesson={lesson} addNewTaskLesson={addNewTaskLesson}/>}
                </Grid>
            </Grid>
            <Divider/>
        </div>
    )
};


export const scheduleListComponent = (teachers: TeacherData[], handleAddLesson: any, editLessonInData: any, deleteLessonInData: any, week: 'Четная' | 'Нечетная', evenWeek: newLesson[], unevenWeek: newLesson[], addNewTaskLesson?: any) => {
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
                                    {addNewTaskLesson !== undefined ? null :
                                        <DialogAddLesson lessonDay={day} lessonWeek={week}
                                                         addLesson={handleAddLesson} teachers={teachers}/>}
                                </ListItemSecondaryAction>
                            </ListItem>
                            {evenWeek.map((lesson: newLesson) => {
                                if (lesson.lessonDay === day && lesson.lessonWeek === week) {
                                    return (scheduleString(teachers, lesson, editLessonInData, deleteLessonInData, addNewTaskLesson))
                                }
                            })}
                            {unevenWeek.map((lesson: newLesson) => {
                                if (lesson.lessonDay === day && lesson.lessonWeek === week) {
                                    return (scheduleString(teachers, lesson, editLessonInData, deleteLessonInData, addNewTaskLesson))
                                }
                            })}
                        </div>
                    )
                })}
            </List>
        </div>
    )
};


