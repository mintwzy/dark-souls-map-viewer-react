import React from "react"
import {Canvas} from "react-three-fiber";
import {Box} from "./Box";

import "../stylesheets/Viewer.css"

class Viewer extends React.Component {

    render(){
        return (
            <Canvas id="viewer">
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Canvas>
        )
    }
}

export default Viewer;
