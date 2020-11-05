import * as THREE from 'three'

import { renderer } from '../renderer/renderer'
import {scene} from '../scene/scene'
import camera from '../camera/camera'

import { control } from '../controls'
import raycaster from "../raycaster/raycaster";
const clock = new THREE.Clock()

const animate = () => {
    requestAnimationFrame(animate)

    raycaster.ray.origin.copy(camera.position)
    const intersections = raycaster.intersectObjects(scene.children)
    const onObject = intersections.length > 0;

    control.update(clock.getDelta())
    renderer.render(scene, camera)
}

export default animate
