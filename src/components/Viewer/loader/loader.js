import _ from 'lodash'
import * as THREE from 'three'

// To be passed as a attribute to the shader, to be used in edge detection.
// Always the same, so shared between all geometries.
// 0, 1, 2, 0, 1, 2.....
const vertexNumber = new Float32Array(810000)
for (let i = 0, lenI = vertexNumber.length; i < lenI; i++) {
    vertexNumber[i] = i % 3
}

export default (loadFunc) => {
    // XMLHttpRequest (XHR) objects are used to interact with servers.
    //
    // You can retrieve data from a URL without having to do a full page refresh.
    // This enables a Web page to update just part of a page without disrupting what the user is doing.
    // XMLHttpRequest is used heavily in AJAX programming.
    const request = new XMLHttpRequest()
    request.open('GET', 'models/ds1/Undead Burg.iv', true)
    // The response is a JavaScript ArrayBuffer containing binary data.
    request.responseType = 'arraybuffer'
    request.send()

    request.onreadystatechange = () => {
        // 	DONE	The operation is complete.
        if (request.readyState === 4) {
            // The Uint8Array typed array represents an array of 8-bit unsigned integers.
            // The contents are initialized to 0. Once established, you can reference elements in the array
            // using the object's methods, or using standard array index syntax (that is, using bracket notation).
            const data = new Uint8Array(request.response)

            // .buffer
            //      Returns the ArrayBuffer referenced by the Uint8Array Fixed at construction time and thus read only.

            // First 4 bytes: uint32 containing number of chunks
            const numChunks = new Uint32Array(data.buffer.slice(0, 4))[0]

            // [0, 1, 2...numChunks - 1]
            const chunks = Array.apply(null, { length: numChunks }).map(Number.call, Number)
            // [[null, null], [null, null] ... [null, null]]
            const chunkTriBounds = _.map(chunks, () => [null, null])
            // [0, [null, null]]
            _.each(_.zip(chunks, chunkTriBounds), (chunkInfo) => {
                const i = chunkInfo[0]
                const triRange = chunkInfo[1]

                /*
                Next 16 * (number of chunks) bytes: 4 uint32s containing:

                 - Byte offset for start of vertex index data.
                 - Number of indices.
                 - Byte offset for start of vertex position data.
                 - Number of vertices.
                 */
                // 16 * (number of chunks)
                const modelData = new Uint32Array(data.buffer.slice(16 * (i + 1), 16 * (i + 1) + 16))
                const trisOffset = modelData[0] // Byte offset for start of index data
                const numTris = modelData[1] / 3 // number of triangles is number of indices / 3
                const vertsOffset = modelData[2] // Byte offset for start of vertex position data
                const numVerts = modelData[3] // number of vertices

                const verts = new Float32Array(data.buffer.slice(vertsOffset, vertsOffset + numVerts * 12)) // vertex position data
                const tris = new Uint16Array(data.buffer.slice(trisOffset, trisOffset + numTris * 6)) // num_tris * 6 == 2 * indices

                const start = triRange[0] || 0
                const end = triRange[1] || numTris
                const positions = new Float32Array((end - start) * 9)

                // Explode vertices, as we want non-shared attributes for normals
                // and for vertex numbering.
                for (let j = start; j < end; j++) {
                    for (let k = 0; k < 9; k++) {
                        positions[9 * (j - start) + k] = verts[3 * tris[3 * j + Math.floor(k / 3)] + k % 3]
                    }
                }

                // create and update model
                var model = new THREE.BufferGeometry()
                model.addAttribute('position', new THREE.BufferAttribute(positions, 3))
                model.addAttribute('vertexNumber', new THREE.BufferAttribute(vertexNumber, 1))
                model.computeVertexNormals()

                loadFunc(model)
            })
        }
    }
}
