import * as React from "react";
import {
    CardContent,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary, Grid,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Http from "../serverApi/http";
import {newsData} from "./StartPage";
import NewsComponent, {LoadingComponent} from "../components/UniversalComponents";
import {DialogAddNews} from "../components/Dialogs/DialogAddNews";
import SetAdmin from "../components/SetAdmin";

export default class AdminComponent extends React.Component {

    state = {
        expanded: '',
        news: [],
        isNoOneNews: false
    };

    public handleChangeExpand = (panel: any) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        if (isExpanded) {
            this.setState({
                expanded: panel
            })
        } else {
            this.setState({
                expanded: false
            })
        }
        if (panel === 'getNews') {
            const http = new Http();
            http.getNewsList('/getNewsList')
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.length > 0) {
                            this.setState({
                                news: [...result]
                            });
                        } else {
                            this.setState({
                                isNoOneNews: true
                            })
                        }
                    }
                )
        }
    };

    public getNewsList = () => {
        const http = new Http();
        http.getNewsList('/getNewsList')
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.length > 0) {
                        this.setState({
                            news: [...result]
                        }, () => {
                            console.log(this.state.news)
                        });
                    } else {
                        this.setState({
                            isNoOneNews: true
                        })
                    }

                }
            )
    };

    public render() {

        return (
            <div style={{marginTop: '1rem'}}>
                <div>
                    {/* ПРОСМОТР ВСЕХ НОВОСТЕЙ */}

                    <ExpansionPanel expanded={this.state.expanded === 'getNews'}
                                    onChange={this.handleChangeExpand('getNews')}
                                    style={{width: '95%', margin: '1em auto'}}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography>Новости на сайте</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12}>
                                    <DialogAddNews getNews={this.getNewsList}/>

                                    {this.state.news.length === 0 ?
                                        <CardContent>
                                            {this.state.isNoOneNews ?
                                                <Typography>Новостей нет</Typography> : LoadingComponent}
                                        </CardContent> :
                                        <div>
                                            {this.state.news.reverse().map((newsData: newsData) => {
                                                return (
                                                    <NewsComponent key={newsData._id} newsData={newsData} admin={true} getNewsCb={this.getNewsList}/>
                                                )
                                            })}
                                        </div>

                                    }
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>


                    <ExpansionPanel expanded={this.state.expanded === 'getUserData'}
                                    onChange={this.handleChangeExpand('getUserData')}
                                    style={{width: '95%', margin: '1em auto'}}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography>Найти пользователя</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <SetAdmin/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </div>
            </div>
        )
    }


}
