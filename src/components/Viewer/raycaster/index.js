import * as THREE from 'three'
import raycaster from "./raycaster";
import { scene } from '../scene/scene'

function initRaycaster(){
    scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 100, 0xff0000) );
}

export default initRaycaster;
