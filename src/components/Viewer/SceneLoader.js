import React, {useEffect, useRef, useState} from "react"
import _ from "lodash";
import * as THREE from "three";
import BigShader from "./BigShader";

let vertexNumber = new Float32Array(810000)
for(let i = 0, lenI = vertexNumber.length; i < lenI; i++){
    vertexNumber[i] = i % 3;
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
const loadIVFile = (loadFunc) => {
    const request = new XMLHttpRequest();
    // request.open("GET", "data/ds1/Undead Burg.iv", true)
    request.open("GET", "data/ds1/Darkroot Garden + Basin.iv", true)
    request.responseType = "arraybuffer";
    request.send()

    request.onreadystatechange = () => {
        if(request.readyState === 4) {
            let data = new Uint8Array(request.response)

            // First 4 bytes: uint32 containing number of chunks
            const num_models = new Uint32Array(data.buffer.slice(0, 4))[0];
            console.log(num_models)

            const chunks = Array.apply(null, {length: num_models}).map(Number.call, Number);
            const chunk_tri_bounds = _.map(chunks, (c) => [null, null])
            _.each(_.zip(chunks, chunk_tri_bounds), (chunk_info) => {
                const i = chunk_info[0];
                const tri_range = chunk_info[1]
                let model = new THREE.BufferGeometry()

                /*
                Next 16 * (number of chunks) bytes: 4 uint32s containing:

                 - Byte offset for start of vertex index data.
                 - Number of indices.
                 - Byte offset for start of vertex position data.
                 - Number of vertices.
                 */
                // 16 * (number of chunks)
                const modeldata = new Uint32Array(data.buffer.slice(16*(i + 1), 16*(i + 1) + 16))
                const tris_offset = modeldata[0]    // Byte offset for start of index data
                const num_tris = modeldata[1] / 3   // number of triangles is number of indices / 3
                const verts_offset = modeldata[2]   // Byte offset for start of vertex position data
                const num_verts = modeldata[3]      // number of vertices

                const verts = new Float32Array(data.buffer.slice(verts_offset, verts_offset + num_verts * 12))  // vertex position data
                const tris = new Uint16Array(data.buffer.slice(tris_offset, tris_offset + num_tris * 6))         // num_tris * 6 == 2 * indices

                const start =tri_range[0] || 0;
                const end = tri_range[1] || num_tris;
                const positions = new Float32Array((end - start)*9);

                // Explode vertices, as we want non-shared attributes for normals
                // and for vertex numbering.
                for (let j = start; j < end; j++) {
                    for (let k = 0; k < 9; k++) {
                        positions[9 * (j - start) + k] = verts[3 * tris[3 * j + Math.floor(k / 3)] + k % 3]
                    }
                }

                model.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                model.setAttribute('vertexNumber', new THREE.BufferAttribute(vertexNumber, 1));

                model.computeVertexNormals();
                loadFunc(model)
            })
        }
    }
}

export default () => {
    const mesh = useRef();

    const [model, setModel] = useState()

    useEffect(() => {
        loadIVFile( (model) => {
            setModel(model)
        })
    }, [])


    return (
        <mesh
            ref={mesh}
            geometry={model}
        >
            <shaderMaterial
                side={THREE.DoubleSide}
                extensions={{derivatives: true}}
                lights={true}
                uniforms={THREE.UniformsUtils.merge([THREE.UniformsLib.lights, BigShader.uniforms])}
                vertexShader={BigShader.vertexShader}
                fragmentShader={BigShader.fragmentShader}
            ></shaderMaterial>
        </mesh>
    )
}
