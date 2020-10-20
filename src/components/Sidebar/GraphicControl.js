import React from 'react'

class GraphicControl extends React.Component {
    render () {
        return (
            <div>
                <label><input id="normalShading" type="checkbox" /><span> Show normals</span></label>
                <label><input id="edgeHighlight" type="checkbox" /><span> Highlight edges</span></label>
                <label><input id="edgeAttenuation" type="checkbox" /><span> Attenuate edge highlighting with distance</span></label>
                <label><input id="backfaceCulling" type="checkbox" /><span> Cull backfaces</span></label>
                <label><input id="wrapAround" type="checkbox" /><span> Wrap-around lighting</span></label>

                <label><input id="edgeColor" type="color" /><span> Edge color</span></label>
                <label><input id="lightColor" type="color" /><span> Light color</span></label>

                <label className="inline">x: <input id="light-x" className="pos" /></label>
                <label className="inline">y: <input id="light-y" className="pos" /></label>
                <label className="inline">z: <input id="light-z" className="pos" /><span> Light direction</span></label>

                <button id="resetCamera" className="button tiny">Reset camera position</button>
            </div>
        )
    }
}

export default GraphicControl
