import * as React from "react";
import {Card, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";

export default class StartPage extends React.Component {


    public render() {

        const cardTextArray = [
            {
                id: '0',
                title: 'Задание на дом',
                subtitle: '',
                textBody: 'Добавь домашнее задание на любую дату',
                img: 'https://pp.userapi.com/c849032/v849032912/1d354c/o7psD1MZyB8.jpg'
            },
            {
                id: '1',
                title: 'Новости',
                subtitle: '',
                textBody: 'Получай всегда актуальные новости КАИ и не только',
                img: 'https://pp.userapi.com/c849032/v849032912/1d354c/o7psD1MZyB8.jpg'
            },
            {
                id: '2',
                title: 'Уведомления',
                subtitle: 'Псс... хочешь немного уведомлений?',
                textBody: 'Отклоняй надоедливые уведомления каждый раз, когда они почему-то приходят',
                img: 'https://pp.userapi.com/c849032/v849032912/1d354c/o7psD1MZyB8.jpg'
            },
            {
                id: '3',
                title: 'Внеси собственное расписание',
                subtitle: '',
                textBody: 'Сервис позволяет тебе внести свое расписание, записывать задания на каждый отдельный предмет и отмечать, если оно было уже выполнено!',
                img: ''
            },
            {
                id: '4',
                title: 'Следи за своими задачами',
                subtitle: '',
                textBody: 'Внеси свои задачи, чтобы не забыть, что нужно сделать. Редактируй их, отмечай выполненные и просматривай их в отдельном хранилище!',
                img: ''
            },
            {
                id: '5',
                title: 'Сохрани все важные ссылки',
                subtitle: '',
                textBody: 'Сохрани важные ссылки, чтобы не забыть прочитать их позже! Редактируй, добавляй теги, используй поиск по названиям и тегам!',
                img: ''
            },

        ];
        return (
            <div>
                <div style={{flexGrow: 1}}>
                    <Grid container spacing={3}>
                        <Grid style={{textAlign: 'center'}} item xs={12} sm={12} >
                            <Card>

                                <CardContent>
                                    <Typography variant="h5">
                                        ЗДЕСЬ БУДЕТ БЛОК С НОВОСТЯМИ
                                    </Typography>
                                    <Typography color="textSecondary">
                                        КОГДА-НИБУДЬ
                                    </Typography>
                                </CardContent>
                            </Card>
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

                                        <CardContent>
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
