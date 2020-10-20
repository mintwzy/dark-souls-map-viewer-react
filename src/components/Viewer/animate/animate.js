// do the animation
import {renderer} from "../renderer/renderer";
import {scene} from "../scene/scene";
import camera from "../camera/camera";

const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
}

export default animate;
