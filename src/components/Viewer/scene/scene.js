import * as THREE from "three";
import light from "../light/light";
import loadIVFile from "../loader/loader";
import material from "../material/material";

const scene = new THREE.Scene();

function addLightAndMesh(){
    // add light and mesh
    scene.add(light)
    loadIVFile((bufferGeometry) => {
        const mesh = new THREE.Mesh(bufferGeometry, material)
        scene.add(mesh)
    })
}

export {
    scene,
    addLightAndMesh
};
