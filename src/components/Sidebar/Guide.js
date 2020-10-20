import React from 'react'

class Guide extends React.Component {
    render () {
        return (
            <p>
                W, A, S, D, Q, E &mdash; Move<br/>
                Shift &mdash; Speed up<br/>
                Mouse &mdash; Look<br/>
                <span id="pl-controls">Esc &mdash; Free mouse<br/></span>
            </p>
        )
    }
}

export default Guide
