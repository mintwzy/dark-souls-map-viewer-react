import * as THREE from "three";
import uniforms from "../shaders/uniforms";
import vertexShader from "../shaders/vertexShader.vert";
import fragmentShader from "../shaders/fragmentShader.frag";

const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    derivatives: true,
    lights: true,
    uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.lights,
        uniforms,
    ]),
    vertexShader,
    fragmentShader
});

export default material;
