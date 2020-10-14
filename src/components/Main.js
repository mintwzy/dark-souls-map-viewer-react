import React from "react";
import {Grid, Cell} from 'react-foundation';
import SideBar from './SideBar'
import Viewer from "./Viewer";

import 'foundation-sites/dist/css/foundation.min.css';

export function Main(){
    return (
        <Grid className="display">
            <Cell medium={3}>
                <SideBar></SideBar>
            </Cell>
            <Cell medium={9}>
                <Viewer></Viewer>
            </Cell>
        </Grid>

    )
}
