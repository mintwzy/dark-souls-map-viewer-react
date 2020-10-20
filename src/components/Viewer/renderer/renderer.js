import * as THREE from 'three'
import $ from 'jquery'

const renderer = new THREE.WebGLRenderer({ antialias: true })

function initRenderer (ref) {
    // set renderer size & append child
    const viewer = $('#viewer')
    renderer.setSize(viewer.width(), viewer.height())
    ref.current.appendChild(renderer.domElement)
}

export {
    renderer,
    initRenderer
}
