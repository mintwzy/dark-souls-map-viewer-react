import * as THREE from 'three'
import $ from 'jquery'

// The WebGL renderer displays your beautifully crafted scenes using WebGL.
const renderer = new THREE.WebGLRenderer({ antialias: true })

function initRenderer (ref) {
    // set renderer size & append child
    const viewer = $('#viewer')
    // Resizes the output canvas to (width, height) with device pixel ratio taken into account,
    // and also sets the viewport to fit that size, starting in (0, 0).
    renderer.setSize(viewer.width(), viewer.height())
    // The Node.appendChild() method adds a node to the end of the list of children of a specified parent node.
    // If the given child is a reference to an existing node in the document, appendChild() moves it from its
    // current position to the new position
    ref.current.appendChild(renderer.domElement)
}

export {
    renderer,
    initRenderer
}
