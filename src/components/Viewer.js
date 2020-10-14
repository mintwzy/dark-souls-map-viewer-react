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
    }

    /*
    The .iv file format stores a number of triangle meshes together in index array format.
        First 4 bytes: uint32 containing number of chunks.<br>
        Next 12 bytes: 3 float32s, use unknown.<br>
        Next 16 * (number of chunks) bytes: 4 uint32s containing:

         - Byte offset for start of vertex index data.
         - Number of indices.
         - Byte offset for start of vertex position data.
         - Number of vertices.

        Vertex index data, 2 * (number of indices) bytes: 1 uint16 per index.<br>
        Vertex position data, 12 * (number of vertices) bytes: 3 float32s per vertex.
    */
    componentDidMount = () => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if(request.readyState === 4) {
                let data = new Uint8Array(request.response)

                // First 4 bytes: uint32 containing number of chunks
                const num_models = new Uint32Array(data.buffer.slice(0, 4))[0];
                const chunks = Array.apply(null, {length: num_models}).map(Number.call, Number);
            }
        }
        request.open("GET", "data/ds1/Undead Burg.iv", true)
        request.responseType = "arraybuffer";
        request.send()
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
