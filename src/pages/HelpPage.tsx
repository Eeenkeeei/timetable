import * as React from "react";
import {DataStorage} from "../serverApi/dataStorage";
import {LocalStorage} from "../serverApi/localStorage";
import Http from "../serverApi/http";

export default class HelpPage extends React.Component {



    public render() {
        document.title = 'Помощь';

        return (
            <div>
               HelpPage

            </div>
        )
    }
}
