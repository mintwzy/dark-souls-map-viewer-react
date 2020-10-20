import BaseControl from "./BaseControl";

/**
 * Controls for browsers that support pointer lock. View moves with mouse.
 * @constructor
 * @param {THREE.Object3D} object The object to be moved by the controls.
 * @param {Element} domElement The element where the controls should be active.
 */
class PointerLockControl extends BaseControl{

    constructor(object, domElement) {
        super(object, domElement);

        // Bind handlers to events.
        window.addEventListener('mousemove', this.mousemove, false);
    }

    /**
     * Handle the movemouse event by rotating the view directly.
     * @param {object} event The mousemove event.
     */
    mousemove = (event) => {
        if (this.enabled === false) return;

        let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.moveState.yawLeft = - movementX * 0.07;
        this.moveState.pitchDown = movementY * 0.07;

        this.updateRotationVector();
    };

    /**
     * Make view slow to a halt in absence of mouse movement.
     * @param {number} delta The time since the last update.
     */
    adjust = (delta) => {
        this.moveState.yawLeft *= Math.pow(0.8, delta * 60);
        this.moveState.pitchDown *= Math.pow(0.8, delta * 60);
        this.updateRotationVector();
    }
}

export default PointerLockControl;
