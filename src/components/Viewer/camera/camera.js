import * as THREE from "three";
import config from "../config/config";

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.copy(config.camera.position);
camera.lookAt(config.camera.lookAt);

export default camera
