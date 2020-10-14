import {Box} from './Box'
import {Canvas} from "react-three-fiber";
import React from "react";

export function Main(){
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
    )
}
