import React, {useEffect, useRef} from "react"

import {initRenderer} from "./renderer/renderer";
import {addLightAndMesh} from "./scene/scene";
import animate from "./animate/animate";

import "./Viewer.css"
import {initControl} from "./controls";

export default () => {

    const myRenderer = useRef()

    useEffect(() => {

        initRenderer(myRenderer)
        initControl()
        addLightAndMesh()
        animate();

    }, [])

    return (
        <div ref={myRenderer}/>
    )
};
