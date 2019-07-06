import {Switch, Route, Link} from 'react-router-dom'
import StartPage from "../pages/StartPage";
import RegisterPage from "../pages/RegisterPage";
import React from 'react'
import {AppBar, Button, Toolbar} from "@material-ui/core";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "../Theme";


export const Main = () => {

    return (
        <Switch>
            <MuiThemeProvider theme={theme}>
                <div color={"primary"}>
                    <AppBar>
                        <Toolbar className="topBarMin">
                            ICON
                            <Button color="secondary">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <AppBar>
                        <Toolbar className="topBarMax">
                            <Link to="/start" title="Домашняя"><Button color="secondary">Home</Button></Link>
                            <Link to="/register"><Button color="secondary">About</Button></Link>

                            <Button color="secondary">Login</Button>
                        </Toolbar>
                    </AppBar>

                    <div style={{marginTop: '5rem'}}>
                        <Route path="/start" component={StartPage} />
                        <Route path="/register" component={RegisterPage}/>
                    </div>
                </div>
            </MuiThemeProvider>
        </Switch>
    )

}
