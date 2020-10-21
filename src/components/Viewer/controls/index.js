import $ from 'jquery'
import PointerLockControl from './PointerLockControl'
import camera from '../camera/camera'
import { renderer } from '../renderer/renderer'
import KEY from "./KEY";

let control;

const havePointerLock = () => {
    return ('pointerLockElement' in document) ||
        ('mozPointerLockElement' in document) ||
        ('webkitPointerLockElement' in document)
}


function initControl () {
    const viewer = $('#viewer')
    // Retrieve the elements matched by the jQuery object.
    const element = viewer.get()[0]

    if (havePointerLock()) {
        control = new PointerLockControl(camera, renderer.domElement)

        // Enable control only when pointer is locked.
        const pointerlockchange = () => { control.enabled = (document.pointerLockElement === element) }
        const mozpointerlockchange =  () => { control.enabled = (document.mozPointerLockElement === element) }
        const webkitpointerlockchange = () => { control.enabled = (document.webkitPointerLockElement === element) }

        // Hook pointer lock state change events
        document.addEventListener('pointerlockchange', pointerlockchange, false)
        document.addEventListener('mozpointerlockchange', mozpointerlockchange, false)
        document.addEventListener('webkitpointerlockchange', webkitpointerlockchange, false)

        // he Element.requestPointerLock() method lets you asynchronously ask for the pointer to be locked on the given element.
        //
        // To track the success or failure of the request, it is necessary to listen for the pointerlockchange and pointerlockerror events at the Document level.
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock
        viewer.click(function () {
            element.requestPointerLock()
        })

        // Pointer lock exit must be manual in Chrome Apps
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock
        $(document).keyup(function (e) {
            if (e.which === KEY.ESC) {
                document.exitPointerLock()
            }
        })
    }
}

export {
    control,
    initControl
}
