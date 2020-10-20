import * as THREE from "three"
import KEY from './KEY'

class BaseControl {

    /**
     * Sets up common elements between pointerlock and non-pointerlock controls.
     * @constructor
     * @param {THREE.Object3D} object The object to be moved by the controls.
     * @param {Element} domElement The element where the controls should be active.
     */
    constructor(object, domElement) {
        this.enable = false;

        this.object = object;
        this.object.rotation.order = "YZX";
        this.domElement = (domElement !== undefined) ? domElement :document;

        this.movementSpeed = 10;
        this.movementSpeedMultiplier = 1;
        this.rollSpeed = 2;

        this.tmpQuaternion = new THREE.Quaternion();

        this.moveState = {
            up: 0, down: 0,
            left: 0, right: 0,
            forward: 0, back: 0,
            pitchUp: 0, pitchDown: 0,
            yawLeft: 0, yawRight: 0
        };

        this.moveVector = new THREE.Vector3(0, 0, 0);
        this.rotationVector = new THREE.Vector3(0, 0, 0);

        const PI_2 = Math.PI / 2;

        // Bind handlers to events.
        window.addEventListener('keydown', this.keydown, false);
        window.addEventListener('keyup', this.keyup, false);
    }

    /**
     * Convenience function to clamp a number into a range.
     * @param {number} num
     * @param {number} min
     * @param {number} max
     */
    clamp = (num, min, max) => {
        return num < min ? min : (num > max ? max : num);
    }

    /**
     * Updates the movement vector based on the current move state.
     */
    updateMovementVector = () => {
        this.moveVector.x = -this.moveState.left + this.moveState.right;
        this.moveVector.y = -this.moveState.down + this.moveState.up;
        this.moveVector.z = -this.moveState.forward + this.moveState.back;
    };

    /**
     * Updates the rotation vector based on the current move state.
     */
    updateRotationVector = () => {
        this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
        this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
    };

    /**
     * Stub for subclass-specific adjustments.
     * @param {number} delta The time since the last update.
     */
    adjust = (delta) => {
        console.log("Please implement adjust(delta)")
    }

    /**
     * Handles key down events and updates the movement state and vector.
     * @param {object} event The keydown event.
     */
    keydown = (event) => {
        if (event.altKey || this.enabled === false) return;

        switch (event.keyCode) {
            case KEY.SHIFT:
                this.movementSpeedMultiplier = 10;
                break;
            case KEY.W:
                this.moveState.forward = 1;
                break;
            case KEY.S:
                this.moveState.back = 1;
                break;
            case KEY.A:
                this.moveState.left = 1;
                break;
            case KEY.D:
                this.moveState.right = 1;
                break;
            case KEY.E:
                this.moveState.up = 1;
                break;
            case KEY.Q:
                this.moveState.down = 1;
                break;
        }

        this.updateMovementVector();
    };


    /**
     * Handles key down events and resets the movement state and vector.
     * @param {object} event the keyup event.
     */
    keyup = (event) => {
        if (this.enabled === false) return;

        switch(event.keyCode) {
            case KEY.SHIFT:
                this.movementSpeedMultiplier = 1;
                break;
            case KEY.W:
                this.moveState.forward = 0;
                break;
            case KEY.S:
                this.moveState.back = 0;
                break;
            case KEY.A:
                this.moveState.left = 0;
                break;
            case KEY.D:
                this.moveState.right = 0;
                break;
            case KEY.E:
                this.moveState.up = 0;
                break;
            case KEY.Q:
                this.moveState.down = 0;
                break;
        }

        this.updateMovementVector();
    };


    /**
     * Update the object's position and rotation based on the movement and
     *   rotation vectors and on how much time has passed.
     * @param {number} delta The time since the last update.
     */
    update = (delta) => {
        let moveMult = delta * this.movementSpeed * this.movementSpeedMultiplier;
        let rotMult = delta * this.rollSpeed;

        this.object.translateX(this.moveVector.x * moveMult);
        this.object.translateY(this.moveVector.y * moveMult);
        this.object.translateZ(this.moveVector.z * moveMult);

        this.tmpQuaternion.set(this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1).normalize();
        this.object.quaternion.multiply(this.tmpQuaternion);
        // Expose the rotation vector for convenience.
        this.object.rotation.setFromQuaternion(this.object.quaternion, this.object.rotation.order);

        // Keep view level.
        this.object.rotation.z = 0;

        // Don't rotate beyond vertical.
        this.object.rotation.x = this.clamp(this.object.rotation.x, -this.PI_2, this.PI_2);

        // Perform any other adjustments
        this.adjust(delta);
    };
}

export default BaseControl;





















