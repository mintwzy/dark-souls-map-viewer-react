import * as THREE from 'three'

import {renderer} from "../renderer/renderer";
import {scene} from "../scene/scene";
import camera from "../camera/camera";

import {control} from "../controls";
const clock = new THREE.Clock();

const animate = () => {
    requestAnimationFrame(animate)

    control.update(clock.getDelta());
    renderer.render(scene, camera);
}

export default animate;
