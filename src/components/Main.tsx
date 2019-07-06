import {Switch, Route, Link, NavLink} from 'react-router-dom'
import React from 'react'
import {AppBar, Button, Menu, Toolbar} from "@material-ui/core";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "../Theme";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import {pagesForMenus} from "../pages/AppPagesList";


interface pageData {
    path: string;
    buttonText: string;
    isLogged: boolean
    component: any
}

export default class Main extends React.Component {

    public state = {
        menuEl: null
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
                                    {pagesForMenus.pages.map((dataPage: pageData) => {
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
                            </Toolbar>
                        </AppBar>

                        {/*{ ТЕЛО ВСЕЙ СТРАНИЦЫ }*/}
                        <div style={{marginTop: '5rem'}}>
                            {pagesForMenus.pages.map((dataPage: pageData) => {
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
