import React, {useEffect, useRef} from "react"

import {initRenderer} from "./renderer/renderer";
import {addLightAndMesh} from "./scene/scene";
import animate from "./animate/animate";

import "./Viewer.css"

export default () => {

    const myRenderer = useRef()

    useEffect(() => {

        initRenderer(myRenderer)
        addLightAndMesh()
        animate();

    }, [])

    return (
        <div ref={myRenderer}/>
    )
};
