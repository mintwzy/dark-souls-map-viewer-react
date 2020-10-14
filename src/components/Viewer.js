import React from "react"
import {Canvas} from "react-three-fiber";
import {Box} from "./Box";

import "../stylesheets/Viewer.css"

class Viewer extends React.Component {

    constructor(props) {
        super(props);

        const size = 810000
        let vertexNumber = new Float32Array(size)
        for(let i = 0; i < size; i++){
            vertexNumber[i] = i % 3;
        }
        this.state = {
            size: size,
            vertexNumber: vertexNumber,
            data: null
        }
        this.loadFile()
    }

    loadFile = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/ds1/Undead Burg.iv", true)
        request.responseType = "arraybuffer";
        request.send()
        request.onreadystatechange = () => {
            if(request.readyState === 4) {
                console.log(request.response)
                let data = new Uint8Array(request.response)
            }
        }
    }


    render(){
        return (
            <Canvas id="viewer">
                {/*
                    This light globally illuminates all objects in the scene equally
                    This light cannot be used to case shadows as it does not have a direction
                */}
                <ambientLight color={0x000000}/>
                {/*
                    A light that gets emitted from a single point in all directions. A common use case for this is to
                    replicate the light emitted from a bare lightbulb
                 */}
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Canvas>
        )
    }
}

export default Viewer;
