import React from "react"
import {Canvas} from "react-three-fiber";
import SceneLoader from "./SceneLoader";

import "./Viewer.css"

class Viewer extends React.Component {

    render(){
        return (
            <Canvas id="viewer">
                <SceneLoader></SceneLoader>
            </Canvas>
        )
    }
}

export default Viewer;
