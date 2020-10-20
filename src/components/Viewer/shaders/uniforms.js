import * as THREE from 'three'

/**
 * Shader program that does edge detection and lambert shading, and accepts a
 * number of switches. Having everything together in one big shader with
 * switches is probably bad practice.
 */
export default {
    uniforms: {
        edgeColor: { type: 'c', value: new THREE.Color(0x000000) },
        edgeHighlight: { type: 'i', value: 0 },
        edgeAttenuation: { type: 'i', value: 1 },
        wrapAround: { type: 'i', value: 1 },
        normalShading: { type: 'i', value: 0 }
    }
}
