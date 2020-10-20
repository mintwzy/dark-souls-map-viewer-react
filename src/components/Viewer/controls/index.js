import $ from "jquery";
import PointerLockControl from "./PointerLockControl";
import camera from "../camera/camera";
import {renderer} from "../renderer/renderer";

let control;

function initControl() {

    const viewer = $("#viewer")
    const element =viewer.get()[0];

    const havePointerLock =
        ('pointerLockElement' in document) ||
        ('mozPointerLockElement' in document) ||
        ('webkitPointerLockElement' in document);

    if(havePointerLock){
        control = new PointerLockControl(camera, renderer.domElement);

        // Enable control only when pointer is locked.
        let pointerlockchange = function() { control.enabled = (document.pointerLockElement === element) }
        let mozpointerlockchange = function() { control.enabled = (document.mozPointerLockElement === element) }
        let webkitpointerlockchange = function() { control.enabled = (document.webkitPointerLockElement === element) }

        // Hook pointer lock state change events
        document.addEventListener('pointerlockchange', pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', mozpointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', webkitpointerlockchange, false);

        element.requestPointerLock =
            element.requestPointerLock ||
            element.mozRequestPointerLock ||
            element.webkitRequestPointerLock;

        viewer.click(function() {
            element.requestPointerLock();
        });

        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

        // Pointer lock exit must be manual in Chrome Apps
        $(document).keyup(function(e) {
            if (e.which === 27) {
                document.exitPointerLock();
            }
        });
    }
}


export {
    control,
    initControl
};
