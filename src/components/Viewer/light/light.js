import * as THREE from 'three'

// A light that gets emitted in a specific direction.
//
// This light will behave as though it is infinitely far away and the rays produced from it are all parallel.
// The common use case for this is to simulate daylight; the sun is far enough away that its position can be
// considered to be infinite, and all light rays coming from it are parallel.
const light = new THREE.DirectionalLight(0xffffff)
light.position.set(1, 2, 3)

export default light
