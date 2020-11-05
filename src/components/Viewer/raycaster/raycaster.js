import * as THREE from 'three'

const origin = new THREE.Vector3(-54, 10 ,6)
const direction = new THREE.Vector3(0, -1, 0)
const raycaster = new THREE.Raycaster(origin, direction, 0, 20)

export default raycaster;
