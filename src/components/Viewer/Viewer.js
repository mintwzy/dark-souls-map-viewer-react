import React, {useEffect, useRef} from "react"
import {extend, Canvas, useThree} from "react-three-fiber";
import SceneLoader from "./SceneLoader";

import "./Viewer.css"

import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

// Calling extend with the native PointerLockControls class from Three.js
// will make pointerLockControls available as a native JSX element.
// Notice how the PointerLockControls classname becomes lowercase pointerLockControls when used as JSX element.
extend({ PointerLockControls });

function useKeyboardEvent(key, callback) {
    useEffect(() => {
        const handler = function(event) {
            if (event.key === key) {
                callback()
            }
        }
        window.addEventListener('keydown', handler)
        return () => {
            window.removeEventListener('keydown', handler)
        }
    }, [])
}

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the PointerLockControls class.
    // https://threejs.org/docs/#examples/en/controls/PointerLockControls

    const {
        camera,
        gl: { domElement }
    } = useThree();

    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();

    useKeyboardEvent('a', () => {
        controls.current.moveRight(-50);
    })
    useKeyboardEvent('d', () => {
        controls.current.moveRight(50);
    })
    useKeyboardEvent('w', () => {
        controls.current.moveForward(50);
    })
    useKeyboardEvent('s', () => {
        controls.current.moveForward(-50);
    })
    useKeyboardEvent('q', () => {
        console.log('q pressed')
        controls.current.unlock();
    })
    useKeyboardEvent('e', () => {
        console.log('e pressed')
        controls.current.lock();
    })

    return (
        <pointerLockControls
            ref={controls}
            args={[camera, domElement]}
            isLocked={false}
        />
    );
};

export default () => {

    return (
        <Canvas
            id="viewer"
            camera={{fov: 75, position: [-200, 40, 0], near: 0.1, far: 10000}}
        >
            <CameraControls></CameraControls>
            <directionalLight color={0xffffff} position={[1, 2, 3]}></directionalLight>
            <SceneLoader></SceneLoader>
        </Canvas>
    )
};
