# Dark Souls Map Viewer React

## Tech

- [React.js](https://reactjs.org/)
- [Three.js](https://threejs.org/)

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
