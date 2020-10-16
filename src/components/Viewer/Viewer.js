import React, {useEffect} from "react"
import {Canvas} from "react-three-fiber";
import SceneLoader from "./SceneLoader";

import "./Viewer.css"

export default () => {

    useEffect(() => {
    }, [])

    return (
        <Canvas
            id="viewer"
            camera={{position: [-20, 40, 0], near: 0.1, far: 10000}}
        >
            <SceneLoader></SceneLoader>
        </Canvas>
    )
};
