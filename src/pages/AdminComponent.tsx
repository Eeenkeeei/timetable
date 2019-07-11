import * as React from "react";
import {
    Button,
    Card,
    CardContent,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary, Grid,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Http from "../serverApi/http";
import {newsData} from "./StartPage";
import {LoadingComponent} from "../components/UniversalComponents";
import {Delete} from "@material-ui/icons";
import {DialogDeleteNews} from "../components/Dialogs/DialogDeleteNews";
import {DialogEditNews} from "../components/Dialogs/DialogEditNews";
import {DialogAddNews} from "../components/Dialogs/DialogAddNews";
import SetAdmin from "../components/SetAdmin";


interface AdminComponentState {
    expanded: string
    news: []
    isNoOneNews: boolean
}

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
                                    onChange={this.handleChangeExpand('getNews')}>
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

                                    {this.state.news.length === 0 ?
                                        <CardContent>
                                            {this.state.isNoOneNews ?
                                                <Typography>Новостей нет</Typography> : LoadingComponent}
                                        </CardContent> :
                                        <div>
                                            <DialogAddNews getNews={this.getNewsList}/>
                                            {this.state.news.map((newsData: newsData) => {
                                                return (
                                                    <div key={newsData._id}>
                                                        <Card style={{marginTop: '1rem'}}>
                                                            <div style={{display: 'flex', margin: '10px'}}>
                                                                <DialogDeleteNews newsData={newsData}
                                                                                  getNews={this.getNewsList}/>
                                                                <DialogEditNews newsData={newsData}
                                                                                getNews={this.getNewsList}/>
                                                            </div>
                                                            <div style={{textAlign: 'center'}}>
                                                                <CardContent>
                                                                    <Typography
                                                                        variant="h6">{newsData.header}</Typography>
                                                                </CardContent>
                                                                <Typography variant="body1">{newsData.body}</Typography>
                                                                <Typography variant="subtitle1"
                                                                            style={{color: 'grey'}}>Дата:&nbsp; {newsData.data}, &nbsp; Автор: &nbsp;{newsData.author}
                                                                </Typography>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel expanded={this.state.expanded === 'panel3'}
                                    onChange={this.handleChangeExpand('panel3')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography>Дать права админа</Typography>
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
