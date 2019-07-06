import {Switch, Route, Link, NavLink} from 'react-router-dom'
import StartPage from "../pages/StartPage";
import RegisterPage from "../pages/RegisterPage";
import React from 'react'
import {AppBar, Button, Menu, Paper, Toolbar, Typography} from "@material-ui/core";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "../Theme";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";

interface pageData {
    path: string;
    buttonText: string;
    isLogged: boolean
    component: any
}

interface pageDataArray {
    pages: pageData[]
}

export default class Main extends React.Component {

    public state = {
        menuEl: null
    };

    public pagesForMenus: pageDataArray =
        {
            pages:
                [
                    {path: '/start', buttonText: 'Вход', isLogged: false, component: StartPage},
                    {path: '/registration', buttonText: 'Регистрация', isLogged: false, component: RegisterPage},
                    {path: '/help', buttonText: 'Помощь', isLogged: false, component: null}
                ]
        };

    public handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            menuEl: evt.currentTarget
        })
    };

    public handleClose = () => {
        this.setState({
            menuEl: null
        })
    };

    public render() {
        return (
            <Switch>
                <MuiThemeProvider theme={theme}>
                    <div color={"primary"}>

                        {/* МЕНЮ В МОБИЛЬНОЙ ВЕРСИИ */}
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
                                    {this.pagesForMenus.pages.map((dataPage: pageData) => {
                                        return (
                                            <div key={dataPage.buttonText}>
                                                <NavLink to={dataPage.path} style={{color:"black"}} activeStyle={{color:"black", fontWeight:"bold"}}>
                                                    <MenuItem onClick={this.handleClose}>
                                                        {dataPage.buttonText}
                                                    </MenuItem>
                                                </NavLink>
                                            </div>
                                        )
                                    })}
                                </Menu>
                            </Toolbar>
                        </AppBar>

                        {/* МЕНЮ В ПОЛНОЙ ВЕРСИИ */}
                        <AppBar>
                            <Toolbar className="topBarMax" style={{textAlign: 'right'}}>
                                {this.pagesForMenus.pages.map((dataPage: pageData) => {
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
                            </Toolbar>
                        </AppBar>

                        {/*{ ТЕЛО ВСЕЙ СТРАНИЦЫ }*/}
                        <div style={{marginTop: '5rem'}}>
                            {this.pagesForMenus.pages.map((dataPage: pageData) => {
                                return (
                                    <div key={dataPage.buttonText}>
                                        <Route exact path={dataPage.path} component={dataPage.component}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </MuiThemeProvider>
            </Switch>
        )
    }
};
