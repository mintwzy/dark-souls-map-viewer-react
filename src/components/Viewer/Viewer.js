import React, {useEffect, useRef} from "react"
import {Canvas, useFrame, useThree} from "react-three-fiber";
import SceneLoader from "./SceneLoader";

import "./Viewer.css"

export default () => {

    return (
        <Canvas
            id="viewer"
            camera={{fov: 75, position: [-100, 200, 0], near: 0.1, far: 10000}}
        >
            <directionalLight color={0xffffff} position={[1, 2, 3]}></directionalLight>
            <SceneLoader></SceneLoader>
        </Canvas>
    )
};
