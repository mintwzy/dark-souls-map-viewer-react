import _ from 'lodash'
import * as THREE from 'three'

const vertexNumber = new Float32Array(810000)
for (let i = 0, lenI = vertexNumber.length; i < lenI; i++) {
    vertexNumber[i] = i % 3
}

export default (loadFunc) => {
    const request = new XMLHttpRequest()
    request.open('GET', 'models/ds1/Undead Burg.iv', true)
    request.responseType = 'arraybuffer'
    request.send()

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            const data = new Uint8Array(request.response)

            // First 4 bytes: uint32 containing number of chunks
            const numModels = new Uint32Array(data.buffer.slice(0, 4))[0]

            const chunks = Array.apply(null, { length: numModels }).map(Number.call, Number)
            const chunkTriBounds = _.map(chunks, () => [null, null])
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

                var model = new THREE.BufferGeometry()

                model.addAttribute('position', new THREE.BufferAttribute(positions, 3))
                model.addAttribute('vertexNumber', new THREE.BufferAttribute(vertexNumber, 1))
                model.computeVertexNormals()

                loadFunc(model)
            })
        }
    }
}
