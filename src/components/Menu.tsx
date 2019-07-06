import {Link} from "react-router-dom";
import * as React from "react";


export default class Menu extends React.Component {

    public render() {
        return (
            <div>
                <h1>
                    <Link to="/">Redux example</Link>
                </h1>

            </div>
        )
    }
}
