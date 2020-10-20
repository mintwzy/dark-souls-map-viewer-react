import React from 'react'
import { Grid, Cell } from 'react-foundation'
import SideBar from './Sidebar/SideBar'
import Viewer from './Viewer/Viewer'

import 'foundation-sites/dist/css/foundation.min.css'

export function Main () {
    return (
        <Grid className="display">
            <Cell medium={3}>
                <SideBar />
            </Cell>
            <Cell medium={9} id={'viewer'}>
                <Viewer />
            </Cell>
        </Grid>
    )
}
