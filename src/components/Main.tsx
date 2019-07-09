import {Switch, Route, Link, NavLink, Redirect} from 'react-router-dom'
import React from 'react'
import {AppBar, Button, CircularProgress, Container, Menu, Toolbar, Typography} from "@material-ui/core";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "../Theme";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import {pagesForMenus} from "../pages/AppPagesList";
import {DialogLoginForm} from "./Dialogs/DialogLoginForm";
import {DialogRegisterForm} from "./Dialogs/DialogRegisterForm";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";
import {Input, Star} from "@material-ui/icons";
import CustomizedSnackbars from "./Dialogs/SnackBar";
import StartPage from "../pages/StartPage";
import HelpPage from "../pages/HelpPage";


interface pageData {
    path: string;
    buttonText: string;
    isLogged: boolean
    component: any
}

interface MainState {
    menuEl: any,
    mobileOpenDialogLoginForm: any,
    isDataConfirmed: any,
    data: any
}

export default class Main extends React.Component {

    public storage = new DataStorage(new LocalStorage());

    public state: MainState = {
        menuEl: null,
        mobileOpenDialogLoginForm: false,
        isDataConfirmed: null, // флаг становится true только в том случае, если пришли данные по токену. Флаг прокидывается в детей и внутри проходят запросы
        data: null
    };

    // вспомогательное для меню
    public handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            menuEl: evt.currentTarget
        })
    };

    // открытие - закрытие меню на мобильной версии
    public handleClose = () => {
        this.setState({
            menuEl: null
        })
    };

    // поднимается через пропсы с форм регистрации и логина
    public isLoginSuccess = (data: any) => {
        this.setState({
            data: data
        }, () => {
            this.setState({
                isDataConfirmed: true
            })
        })
    };

    // обработчик кнопки выхода
    public handleExitButton = () => {
        this.storage.logOut();
        this.setState({
            isDataConfirmed: false,
            data: null
        })
    };

    componentDidMount(): void {
        const storage = new DataStorage(new LocalStorage());
        const http = new Http();
        if (storage.getUserData !== null) {
            http.loginWithToken(storage.getUserData, '/user')
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
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

    public render() {

        const isDataConfirmedMobileMenu = (
            <AppBar>
                <Toolbar className="topBarMin">
                    <Button color="secondary" aria-controls="customized-menu" aria-haspopup="true"
                            onClick={this.handleClick}>
                        <MenuIcon/>
                    </Button>
                    <Menu
                        id="customized-menu" anchorEl={this.state.menuEl} keepMounted
                        open={Boolean(this.state.menuEl)} onClose={this.handleClose}
                        style={{marginTop: '2rem'}}>
                        {/* ОТДЕЛЬНО ВОЗВРАЩАЕТСЯ КНОПКА ВХОДА */}
                        <div>
                            {pagesForMenus.pages.map((dataPage: pageData) => {
                                    return (
                                        <div key={dataPage.buttonText + 'logged'}>
                                            <NavLink to={dataPage.path} style={{color: "black"}}
                                                     activeStyle={{color: "black", fontWeight: "bold"}}>
                                                <MenuItem onClick={this.handleClose}>
                                                    <Typography
                                                        variant="button">{dataPage.buttonText}</Typography>
                                                </MenuItem>
                                            </NavLink>
                                        </div>
                                    )

                                }
                            )}
                            <MenuItem onClick={this.handleExitButton}>
                                <Input/>&nbsp;&nbsp;Выйти
                            </MenuItem>
                        </div>
                    </Menu>
                    {this.state.data === null ? null :
                        <Typography variant="button">{this.state.data.email}</Typography>}
                </Toolbar>
            </AppBar>
        )

        const isDataNotConfirmedMobileMenu = (
            <AppBar>
                <Toolbar className="topBarMin">
                    <Button color="secondary" aria-controls="customized-menu" aria-haspopup="true"
                            onClick={this.handleClick}>
                        <MenuIcon/>
                    </Button>
                    <Menu
                        id="customized-menu" anchorEl={this.state.menuEl} keepMounted
                        open={Boolean(this.state.menuEl)} onClose={this.handleClose}
                        style={{marginTop: '2rem'}}>
                        {pagesForMenus.pages.map((dataPage: pageData) => {
                                return (
                                    <div key={dataPage.buttonText}>
                                        <NavLink to={dataPage.path} style={{color: "black"}}
                                                 activeStyle={{color: "black", fontWeight: "bold"}}>
                                            <MenuItem onClick={this.handleClose}>
                                                <Typography
                                                    variant="button">{dataPage.buttonText}</Typography>
                                            </MenuItem>
                                        </NavLink>
                                    </div>
                                )

                            }
                        )}
                        {/* ОТДЕЛЬНО ВОЗВРАЩАЕТСЯ КНОПКА ВХОДА */}

                        <div>
                            <MenuItem>
                                <DialogLoginForm mobile={true} isLoginSuccess={this.isLoginSuccess}/>
                            </MenuItem>
                        </div>
                        <div>
                            <MenuItem>
                                <DialogRegisterForm mobile={true} isLoginSuccess={this.isLoginSuccess}/>
                            </MenuItem>
                        </div>

                    </Menu>
                </Toolbar>
            </AppBar>
        );


        const isLoadingComponent = (
            <MuiThemeProvider theme={theme}>

                <AppBar>
                    <Toolbar className="topBarMax" style={{textAlign: 'right'}}>
                        <CircularProgress color="inherit"/>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        );

        const isDataConfirmed = (
            <Switch>
                <MuiThemeProvider theme={theme}>
                    {/* МЕНЮ В МОБИЛЬНОЙ ВЕРСИИ */}

                    {isDataConfirmedMobileMenu}

                    {/* МЕНЮ В ПОЛНОЙ ВЕРСИИ */}
                    <AppBar>
                        <Toolbar className="topBarMax" style={{textAlign: 'right'}}>
                            {/* ОТДЕЛЬНО ВОЗВРАЩАЕТСЯ КНОПКА ВХОДА */}

                            {pagesForMenus.pages.map((dataPage: pageData) => {
                                return (
                                    <div key={dataPage.buttonText + 'logged'}>
                                        <Link to={dataPage.path}>
                                            <Button color="secondary">
                                                {dataPage.buttonText}
                                            </Button>
                                        </Link>
                                    </div>
                                )

                            })}
                            <Button onClick={this.handleExitButton} color="secondary">
                                <Input/>&nbsp;&nbsp;ВЫХОД
                            </Button>
                            &nbsp;
                            {this.state.data === null ? null :
                                <Typography variant="button">{this.state.data.email}</Typography>}
                        </Toolbar>
                    </AppBar>

                    {/*{ ТЕЛО ВСЕЙ СТРАНИЦЫ }*/}
                    <Container>

                    <div style={{marginTop: '5rem'}}>
                        {pagesForMenus.pages.map((dataPage: pageData) => {
                            return (
                                <div key={dataPage.buttonText}>
                                    <Route exact path={dataPage.path} component={dataPage.component}/>
                                </div>
                            )

                        })}
                        <Redirect to="/"/>
                        <Route exact path='/help' component={HelpPage}/>
                    </div>
                    </Container>

                </MuiThemeProvider>
                <StartPage/>
            </Switch>
        );

        const isDataNotConfrimed = (
            <Switch>
                <MuiThemeProvider theme={theme}>
                    <div>

                        {/* МЕНЮ В МОБИЛЬНОЙ ВЕРСИИ */}

                        {isDataNotConfirmedMobileMenu}
                        {/* МЕНЮ В ПОЛНОЙ ВЕРСИИ */}
                        <AppBar>
                            <Toolbar className="topBarMax" style={{textAlign: 'right'}}>
                                {/* ОТДЕЛЬНО ВОЗВРАЩАЕТСЯ КНОПКА ВХОДА */}

                                {pagesForMenus.pages.map((dataPage: pageData) => {
                                    return (
                                        <div key={dataPage.buttonText}>
                                            <Link to={dataPage.path}>
                                                <Button color="secondary">
                                                    {dataPage.buttonText}
                                                </Button>
                                            </Link>
                                        </div>
                                    )
                                })}

                                <DialogLoginForm mobile={false} isLoginSuccess={this.isLoginSuccess}/>
                                <DialogRegisterForm mobile={false} isLoginSuccess={this.isLoginSuccess}/>

                            </Toolbar>
                        </AppBar>

                        {/* ТЕЛО ВСЕЙ СТРАНИЦЫ */}
                        <Container>
                            <div style={{marginTop: '5rem'}}>
                                {pagesForMenus.pages.map((dataPage: pageData) => {
                                    return (
                                        <div key={dataPage.buttonText}>
                                            <Route exact path={dataPage.path} component={dataPage.component}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </Container>
                    </div>
                </MuiThemeProvider>
            </Switch>
        );

        // ВОЗВРАЩАЕТСЯ ЕСЛИ ОЖИДАНИЕ ЗАПРОСА
        if (this.state.isDataConfirmed === null) {
            return (isLoadingComponent)
        }
        // ВОЗВРАЩАЕТСЯ ЕСЛИ ДАННЫЕ НЕ ПРИШЛИ
        if (!this.state.isDataConfirmed) {
            return (isDataNotConfrimed)
        } else {
            return (isDataConfirmed)
        }

    }
};
