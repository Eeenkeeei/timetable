import * as React from "react";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";
import {LoadingComponent} from "../components/UniversalComponents";
import {AppBar, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import {theme} from "../Theme";
import {Dashboard, Fingerprint, ListAlt, Person, Security} from "@material-ui/icons";
import AdminComponent from "./AdminComponent";

interface AccountPageState {
    isDataConfirmed: boolean | null,
    data: AccountData,
    tabValue: number
}

interface AccountData {
    email: string,
    registrationDate: string,
    password: string,
    admin: boolean,
    lastLoginDate: string
}

export default class AccountPage extends React.Component<AccountPageState> {

    state = {
        isDataConfirmed: null,
        tabValue: 0,
        data: {email: '', registrationDate: '', password: '', admin: false, lastLoginDate: ''}
    };

    public theme: any;

    componentDidMount(): void {
        document.title = 'Аккаунт';
        const storage = new DataStorage(new LocalStorage());
        const http = new Http();
        if (storage.getUserData !== null) {
            http.loginWithToken(storage.getUserData, '/user')
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.email !== undefined) {
                            this.setState({
                                data: result
                            }, () => {
                                this.setState({
                                    isDataConfirmed: true
                                })
                            })
                        } else {
                            this.setState({
                                isDataConfirmed: false
                            }, () => {
                                storage.logOut()
                            })
                        }
                    }, (error) => {
                        console.log(error)
                    }
                );
        } else {
            this.setState({
                isDataConfirmed: false
            })
        }
    }

    public handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            tabValue: newValue
        })
    };

    public handleChangeIndexTab = (index: number) => {
        this.setState({
            tabValue: index
        })
    }

    componentWillUnmount(): void {
    }

    public render() {

        const stylesForTab = {
            textTransform: 'none',
            minWidth: 72,
        } as React.CSSProperties;

        const tabsArray = [
            {label: 'Учетная запись', icon: <Person/>},
            {label: 'Мое расписание', icon: <ListAlt/>},
            {label: 'Безопасность', icon: <Security/>},
            {label: 'Сервисы', icon: <Dashboard/>},
            {label: 'Админ', icon: <Fingerprint/>, admin: true},
        ];

        const mobileMenu = (
            <AppBar position="static" color="default" className="topBarMin top">
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    {tabsArray.map((tabData: any) => {
                        if (this.state.data.admin === true && tabData.label === 'Админ') {
                            return (
                                <Tab icon={tabData.icon} style={stylesForTab}
                                     key={tabData.label}/>
                            )
                        } else {
                            if (tabData.admin === undefined) {
                                return (
                                    <Tab icon={tabData.icon} style={stylesForTab}
                                         key={tabData.label}/>
                                )
                            }
                        }
                    })}
                </Tabs>
            </AppBar>
        );

        const fullMenu = (
            <AppBar position="static" color="default" className="topBarMax">
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    {tabsArray.map((tabData: any) => {
                        if (this.state.data.admin === true && tabData.label === 'Админ') {
                            return (
                                <Tab label={tabData.label} icon={tabData.icon} style={stylesForTab}
                                     key={tabData.label}/>
                            )
                        } else {
                            if (tabData.admin === undefined) {
                                return (
                                    <Tab label={tabData.label} icon={tabData.icon} style={stylesForTab}
                                         key={tabData.label}/>
                                )
                            }
                        }
                    })}
                </Tabs>
            </AppBar>
        );

        const accountDataComponent = (
            <div style={{marginTop: '1rem', overflow: 'hidden'}}>
                <Grid container spacing={3}>
                    <Grid style={{textAlign: 'center'}} item xs={6} sm={6}>

                        <Typography variant="body1">
                            Email:
                        </Typography>

                    </Grid>
                    <Grid style={{textAlign: 'center'}} item xs={6} sm={6}>

                        <Typography variant="body1">
                            {this.state.data.email}
                        </Typography>

                    </Grid>
                </Grid>
            </div>
        )

        const accountPageBody = (
            <div>
                {mobileMenu}
                {fullMenu}
                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.tabValue}
                                onChangeIndex={this.handleChangeIndexTab}>

                    {this.state.isDataConfirmed ? <div dir={theme.direction}>{accountDataComponent}</div> : <div></div>}
                    <div dir={theme.direction}>text2</div>
                    <div dir={theme.direction}>text3</div>
                    <div dir={theme.direction}>text4</div>
                    <div dir={theme.direction}><AdminComponent/></div>

                </SwipeableViews>
            </div>
        );

        const waitingComponent = (
            <div>
                <Typography variant={"h6"}>Пожалуйста, подождите. Данные обновляются.</Typography>
            </div>
        );


        return (
            <div>
                {this.state.isDataConfirmed === null ? LoadingComponent : null}
                {this.state.data !== undefined ? accountPageBody : waitingComponent}
            </div>
        )
    }
}
