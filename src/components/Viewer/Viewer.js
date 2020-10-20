import React, {useEffect, useRef} from "react"

import * as THREE from "three"

import loadIVFile from './loader/loader'
import material from "./material/material";
import camera from "./camera/camera";
import light from "./light/light";
import renderer from "./renderer/renderer";
import scene from "./scene/scene";

import "./Viewer.css"

export default () => {

    const myRenderer = useRef()

    useEffect(() => {

        // add dom element
        myRenderer.current.appendChild(renderer.domElement)

        // add light and mesh
        scene.add(light)
        loadIVFile((bufferGeometry) => {
            const mesh = new THREE.Mesh(bufferGeometry, material)
            scene.add(mesh)
        })

        // do the animation
        const animate = () => {
            requestAnimationFrame(animate)
            renderer.render(scene, camera);
        }
        animate();

    }, [])

    return (
        <div ref={myRenderer}/>
    )
};
