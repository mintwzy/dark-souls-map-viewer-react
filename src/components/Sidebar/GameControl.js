import React from "react"

class GameControl extends React.Component {
    render(){
        return (
            <>
                <select id="swapGames">
                    <option value="ds1">Dark Souls 1</option>
                    <option value="ds2">Dark Souls 2</option>
                </select>
                <div id="ds1" className="file-list"></div>
                <div id="ds2" className="file-list"></div>
            </>
        )
    }
}

export default GameControl;
