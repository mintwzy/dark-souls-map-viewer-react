import React, { useEffect, useRef } from 'react'

import { initRenderer } from './renderer/renderer'
import { addLightAndMesh } from './scene/scene'
import animate from './animate/animate'

import './Viewer.css'
import { initControl } from './controls'

export default function Viewer() {
    /*
    const refContainer = useRef(initialValue);

    useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
    The returned object will persist for the full lifetime of the component.

    A common use case is to access a child imperatively
     */
    const myRenderer = useRef()

    useEffect(() => {
        initRenderer(myRenderer)
        initControl()
        addLightAndMesh()
        animate()
    }, [])

    return (
        <div ref={myRenderer}/>
    )
}
