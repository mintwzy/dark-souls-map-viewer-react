import React from "react";

import Guide from "./Guide";
import GraphicControl from "./GraphicControl"
import GameControl from "./GameControl";

import './SideBar.css'

class SideBar extends React.Component {

    render () {
        return (
            <div id="sidebar">
                <h4>Dark Souls Map Viewer</h4>
                <Guide></Guide>
                <GraphicControl></GraphicControl>
                <GameControl></GameControl>
            </div>
        )
    }
}

export default SideBar;
