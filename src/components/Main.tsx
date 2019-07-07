import {Switch, Route, Link, NavLink} from 'react-router-dom'
import React from 'react'
import {AppBar, Button, Menu, Toolbar, Typography} from "@material-ui/core";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "../Theme";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import {pagesForMenus} from "../pages/AppPagesList";
import {DialogLoginForm} from "./Dialogs/DialogLoginForm";
import {DialogRegisterForm} from "./Dialogs/DialogRegisterForm";


interface pageData {
    path: string | null;
    buttonText: string;
    isLogged: boolean
    component: any
}

export default class Main extends React.Component {

    public state = {
        menuEl: null,
        mobileOpenDialogLoginForm: false
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
                    <div>
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
                                    {/* ОТДЕЛЬНО ВОЗВРАЩАЕТСЯ КНОПКА ВХОДА */}
                                    <div>
                                        <MenuItem>
                                           <DialogLoginForm mobile={true}/>
                                        </MenuItem>
                                    </div>
                                    <div>
                                        <MenuItem>
                                            <DialogRegisterForm mobile={true}/>
                                        </MenuItem>
                                    </div>
                                    {pagesForMenus.pages.map((dataPage: pageData) => {
                                            if (dataPage.path !== null) {
                                                return (
                                                    <div key={dataPage.buttonText}>
                                                        <NavLink to={dataPage.path} style={{color: "black"}}
                                                                 activeStyle={{color: "black", fontWeight: "bold"}}>
                                                            <MenuItem onClick={this.handleClose}>
                                                                <Typography variant="button">{dataPage.buttonText}</Typography>
                                                            </MenuItem>
                                                        </NavLink>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={dataPage.buttonText}>
                                                        <MenuItem onClick={this.handleClose}>
                                                            <Typography variant="button">{dataPage.buttonText}</Typography>
                                                        </MenuItem>
                                                    </div>
                                                )
                                            }
                                        }
                                    )}

                                </Menu>
                            </Toolbar>
                        </AppBar>

                        {/* МЕНЮ В ПОЛНОЙ ВЕРСИИ */}
                        <AppBar>
                            <Toolbar className="topBarMax" style={{textAlign: 'right'}}>
                                {/* ОТДЕЛЬНО ВОЗВРАЩАЕТСЯ КНОПКА ВХОДА */}
                                    <DialogLoginForm mobile={false}/>
                                    <DialogRegisterForm mobile={false}/>
                                {pagesForMenus.pages.map((dataPage: pageData) => {
                                    if (dataPage.path !== null) {
                                        return (
                                            <div key={dataPage.buttonText}>
                                                <Link to={dataPage.path}>
                                                    <Button color="secondary">
                                                        {dataPage.buttonText}
                                                    </Button>
                                                </Link>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={dataPage.buttonText}>
                                                <Button color="secondary">
                                                    {dataPage.buttonText}
                                                </Button>
                                            </div>
                                        )
                                    }
                                })}

                            </Toolbar>
                        </AppBar>

                        {/*{ ТЕЛО ВСЕЙ СТРАНИЦЫ }*/}
                        <div style={{marginTop: '5rem'}}>


                            {pagesForMenus.pages.map((dataPage: pageData) => {
                                if (dataPage.path !== null) {
                                    return (
                                        <div key={dataPage.buttonText}>
                                            <Route exact path={dataPage.path} component={dataPage.component}/>
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </div>
                    </div>
                </MuiThemeProvider>
            </Switch>
        )
    }
};
