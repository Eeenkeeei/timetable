import * as React from "react";
import {
    AppBar,
    Tab,
    Tabs,
} from "@material-ui/core";
import {theme} from "../Theme";
import SwipeableViews from "react-swipeable-views";
import {newLesson} from "./Dialogs/DialogAddLesson";
import {scheduleListComponent} from "./UniversalComponents";

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

    public deleteLessonInData = (lessonObject: newLesson) => {
        this.props.deleteLessonInData(lessonObject)
    };

    public editLessonInData = (lessonObject: newLesson) => {
        this.props.editLessonInData(lessonObject)
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

        return (
            <div>
                {timetableMenu}
                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.tabValue}
                                onChangeIndex={this.handleChangeIndexTab}>
                    <div dir={theme.direction}>
                        {scheduleListComponent(this.handleAddLesson, this.editLessonInData, this.deleteLessonInData, 'Четная', this.props.lessons.evenWeek, this.props.lessons.unevenWeek)}
                    </div>
                    <div dir={theme.direction}>
                        {scheduleListComponent(this.handleAddLesson, this.editLessonInData, this.deleteLessonInData, 'Нечетная', this.props.lessons.evenWeek, this.props.lessons.unevenWeek)}
                    </div>
                </SwipeableViews>

            </div>
        )
    }
}
