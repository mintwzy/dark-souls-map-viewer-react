# Dark Souls Map Viewer React

## Tech

- [React.js](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [digiaonline/react-foundation](https://github.com/digiaonline/react-foundation)

### .iv File Format

The .iv file format stores a number of triangle meshes together in index array format.

First 4 bytes: uint32 containing number of chunks.<br>
Next 12 bytes: 3 float32s, use unknown.<br>
Next 16 * (number of chunks) bytes: 4 uint32s containing:

 - Byte offset for start of vertex index data.
 - Number of indices.
 - Byte offset for start of vertex position data.
 - Number of vertices.

Vertex index data, 2 * (number of indices) bytes: 1 uint16 per index.<br>
Vertex position data, 12 * (number of vertices) bytes: 3 float32s per vertex.

## Notes

I found the [colevk/dark-souls-map-viewer](https://github.com/colevk/dark-souls-map-viewer) is based on `three@0.73`,
while [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) has

```
"peerDependencies": {
    "react": ">=16.13",
    "react-dom": ">=16.13",
    "three": ">=0.115"
}
```

This causes the old shaders do not work as expected. So I use `Three.js` directly.

## References

- [colevk/dark-souls-map-viewer](https://github.com/colevk/dark-souls-map-viewer)
