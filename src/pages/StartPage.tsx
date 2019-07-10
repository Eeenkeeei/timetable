import * as React from "react";
import {Card, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";
import {LoadingComponent} from "../components/UniversalComponents";

interface newsData {
    _id: string
    header: string,
    body: string,
    img: string
}

export default class StartPage extends React.Component {

    state = {
        news: []
    }

    public componentDidMount(): void {
        const http = new Http();
        http.getNewsList('/getNewsList')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        news: [...result]
                    })
                }
            )
    }


    public render() {
        document.title = 'Стартовая страница';

        const NewsBlock = () => {
            this.state.news.map((newsData: newsData) => {
                // @ts-ignore
                return (
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{newsData.header}</Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="body1">{newsData.body}</Typography>
                        </CardContent>
                    </Card>
                )
            })
        };

        const cardTextArray = [
            {
                id: '0',
                title: 'Задание на дом',
                subtitle: '',
                textBody: 'Добавь домашнее задание на любую дату',
                img: 'https://1.bp.blogspot.com/-rIHSvpNC0ac/W7AMioDMmZI/AAAAAAAATEY/4Kw38DZpWV0Fry7vz29PaO0YMm5qwy5sQCK4BGAYYCw/w1200-h630-p-k-no-nu/IMedia9_Writing.jpg'
            },
            {
                id: '1',
                title: 'Новости',
                subtitle: '',
                textBody: 'Получай всегда актуальные новости КАИ и не только',
                img: 'https://i.imgur.com/plWb1GA.jpg'
            },
            {
                id: '2',
                title: 'Уведомления',
                subtitle: 'Псс... хочешь немного уведомлений?',
                textBody: 'Отклоняй надоедливые уведомления каждый раз, когда они почему-то приходят',
                img: 'http://www.twseo.com.tw/wp-content/uploads/2018/05/a3749ad203d8f65ac6290fde65778583.jpeg'
            },
            {
                id: '3',
                title: 'Внеси собственное расписание',
                subtitle: '',
                textBody: 'Сервис позволяет тебе внести свое расписание, записывать задания на каждый отдельный предмет и отмечать, если оно было уже выполнено!',
                img: 'https://miro.medium.com/max/4043/0*gzqObH33C3zVLxKg.jpg'
            },
            {
                id: '4',
                title: 'Следи за своими задачами',
                subtitle: '',
                textBody: 'Внеси свои задачи, чтобы не забыть, что нужно сделать. Редактируй их, отмечай выполненные и просматривай их в отдельном хранилище!',
                img: 'https://i.imgur.com/plWb1GA.jpg'
            },
            {
                id: '5',
                title: 'Сохрани все важные ссылки',
                subtitle: '',
                textBody: 'Сохрани важные ссылки, чтобы не забыть прочитать их позже! Редактируй, добавляй теги, используй поиск по названиям и тегам!',
                img: 'https://i.imgur.com/plWb1GA.jpg'
            },

        ];
        return (
            <div>
                <div style={{flexGrow: 1}}>
                    <Grid container spacing={3}>
                        <Grid style={{textAlign: 'center'}} item xs={12} sm={12}>

                                {this.state.news.length === 0 ?
                                    <CardContent>
                                        {LoadingComponent}
                                    </CardContent> :
                                    <div>
                                        {this.state.news.map((newsData: newsData) => {
                                            return (
                                                <Card key={newsData._id} style={{ marginTop: '1rem'}}>
                                                    <CardContent>
                                                        <Typography variant="h6">{newsData.header}</Typography>
                                                    </CardContent>
                                                    <CardContent>
                                                        <Typography variant="body1">{newsData.body}</Typography>
                                                    </CardContent>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                }

                        </Grid>
                        {cardTextArray.map((cardBody) => {
                            return (
                                <Grid style={{textAlign: 'center'}} item xs={12} sm={4} key={cardBody.id}>
                                    <Card>
                                        {cardBody.img.length > 0 ? <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={cardBody.img}
                                            title="Contemplative Reptile"
                                        /> : null}

                                        <CardContent style={{height: '130px'}}>
                                            <Typography variant="h5">
                                                {cardBody.title}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {cardBody.subtitle}
                                            </Typography>
                                            <Typography variant="body1" component="p">
                                                {cardBody.textBody}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </div>
        )
    }
}
