import {theme} from "../Theme";
import {Card, CardContent, CardMedia, CircularProgress, Grid, Typography} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/styles";
import React from "react";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";
import {DialogDeleteNews} from "./Dialogs/DialogDeleteNews";
import {DialogEditNews} from "./Dialogs/DialogEditNews";
import {newsData} from "../pages/StartPage";

export const LoadingComponent = (
    <MuiThemeProvider theme={theme}>
        <CircularProgress/>
        <div>
            <Typography variant={"h6"}>Пожалуйста, подождите. Данные обновляются.</Typography>
        </div>
    </MuiThemeProvider>
)

export function checkUserData () {
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
        flag = false
        return (flag)
    }
}

interface NewsComponentProps {
    newsData: newsData,
    admin: boolean,
    getNewsCb?: any
}

export default class NewsComponent extends React.Component<NewsComponentProps> {

    public render (){
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
                                            style={{color: 'grey', marginLeft: 'auto',}}>Дата:&nbsp; {this.props.newsData.data}, &nbsp; Автор: &nbsp;{this.props.newsData.author}
                                </Typography>
                            </Grid>

                        </Grid>
                    </div>

                </Card>

            </div>
        )
    }


}
