import * as React from "react";
import {Card, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";

export default class StartPage extends React.Component {


    public render() {
        document.title = 'Стартовая страница';

        const cardTextArray = [
            {
                id: '0',
                title: 'Задание на дом',
                subtitle: '',
                textBody: 'Добавь домашнее задание на любую дату',
                img: 'https://psv4.userapi.com/c848216/u27991797/docs/d11/90fe7dac2e3c/Screen-Shot-2017-04-27-at-9_32_54-AM.jpg?extra=cbXeM8kTA7ZV7p8uO3Hw8nSvxC4aw97-aCvsm0134kAJ38Qv6uxyrSMK4154aNWwBlzbJajxolkr7K2ZRWPcRG1vpzzdSE-BUEcm_TPvBfjl_O7rvI2gIl74Wd0CO5D_Qs1V_V_n57J0bIY-Kb3pRSY7'
            },
            {
                id: '1',
                title: 'Новости',
                subtitle: '',
                textBody: 'Получай всегда актуальные новости КАИ и не только',
                img: 'https://psv4.userapi.com/c848216/u27991797/docs/d17/0913e7b2c895/laptop-header.jpg?extra=QjBepeem_sHiXRAaPXBzn_kRQBnKN-766UGhj6vuYxlkBYfCPp4g8VZeLXdM2bIbXA9MjKRBzpB6QmHVr051ekx64X5sy3DgAawW9o1hAnGONW1I26tbpt0jyCV5dUozWHHJkShlAa7L57tlbXHUCWGZ'
            },
            {
                id: '2',
                title: 'Уведомления',
                subtitle: 'Псс... хочешь немного уведомлений?',
                textBody: 'Отклоняй надоедливые уведомления каждый раз, когда они почему-то приходят',
                img: 'https://psv4.userapi.com/c848420/u27991797/docs/d4/02e06819a0f8/3922152297274a839d5a7d14e0db3e44.jpg?extra=GmBB6qppUF1BxdE88LXbVZE7NBw2Pk-jf5w7xTC8CdHwSg9UWaNzqzGwNCbrllB9aYnrDkrUIH5KCG54zsoztrKAThK11Fj9gjwteLQVC-cs6mWaDZQY6sJkBACMOtU4h-s0gJSF5lET3zhoUpeqf6kI'
            },
            {
                id: '3',
                title: 'Внеси собственное расписание',
                subtitle: '',
                textBody: 'Сервис позволяет тебе внести свое расписание, записывать задания на каждый отдельный предмет и отмечать, если оно было уже выполнено!',
                img: 'https://psv4.userapi.com/c848216/u27991797/docs/d11/f7c767e1e755/gramotnoe-motivatsionnoe-pismo.jpg?extra=Tq3QBjFGN3R8-BNut6Rh72XDW03LKVoUf8htMiFgUI_AokvJDqj7338GNQSPaTCWkEoRt-7VPw01DF12dRgUWeis1uVpIybMuxzKxU5To7o5Xel72A_IJMPj8CxV-W3_qRfeDmzzr8GNB5lOtn_ju5J6'
            },
            {
                id: '4',
                title: 'Следи за своими задачами',
                subtitle: '',
                textBody: 'Внеси свои задачи, чтобы не забыть, что нужно сделать. Редактируй их, отмечай выполненные и просматривай их в отдельном хранилище!',
                img: 'https://psv4.userapi.com/c848136/u27991797/docs/d15/ac7d6911831c/CoXSx9QWcAAHEZj.jpg?extra=i_D31o0d3zO2vXaiyH0MPE0xhhfPSyVu95LtugPiTorg32h3KVJl9JdZlGxFzkcEPVpL4uPcymMzEXGmv0KTctDdKyO8mps5ylapd4jR3Jmnhmhbi1NkP4709wB3Nk7CReX7Ud3w1cPAh0y_BEU9PRZs'
            },
            {
                id: '5',
                title: 'Сохрани все важные ссылки',
                subtitle: '',
                textBody: 'Сохрани важные ссылки, чтобы не забыть прочитать их позже! Редактируй, добавляй теги, используй поиск по названиям и тегам!',
                img: 'https://psv4.userapi.com/c848216/u27991797/docs/d11/f7c767e1e755/gramotnoe-motivatsionnoe-pismo.jpg?extra=Tq3QBjFGN3R8-BNut6Rh72XDW03LKVoUf8htMiFgUI_AokvJDqj7338GNQSPaTCWkEoRt-7VPw01DF12dRgUWeis1uVpIybMuxzKxU5To7o5Xel72A_IJMPj8CxV-W3_qRfeDmzzr8GNB5lOtn_ju5J6'
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
