import React from "react";

import Guide from "./Sidebar/Guide";
import GraphicControl from "./Sidebar/GraphicControl"
import GameControl from "./Sidebar/GameControl";

import '../stylesheets/SideBar.css'

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
