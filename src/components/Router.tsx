import React from 'react';
import {Route, Switch} from 'react-router-dom';
import StartPage from "../pages/StartPage";


export default class RouterTest extends React.Component {


    render() {

        return (
            <Switch>
                <Route path='/index/:id' component={StartPage}/>
            </Switch>
        )
    }
}
