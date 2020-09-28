import React from 'react';
import './SettingsBar.css';

function SettingsBar({size, solved, animationRunning, animationSpeed, newMazeClick, animationClick, changeSpeed}) {
    const playStyle = {
        color: "lightgreen"
    }
    const stopStyle = {
        color: "orange"
    }

    const newMazeStyle = {
        color: "lightblue"
    }

    return (
        <div id="settingsBar">
            <div id="settingsDiv">
                <table>
                    <tbody>
                    <tr>
                        <td className={"settingsButton" + (solved ? " noClickSetting" : "")} rowSpan="2" style={animationRunning ? stopStyle : playStyle} onClick={animationClick}>
                            {animationRunning ? "stop" : "start"}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className={(animationRunning ? "disabledSetting" : "")}>
                    <tbody>
                    <tr>
                        <td className="settingsButton" rowSpan="2" style={newMazeStyle} onClick={newMazeClick}>
                            new maze
                        </td>
                    </tr>
                    </tbody>
                </table>
                {<table className={(animationRunning ? "disabledSetting" : "")}>
                    <tbody>
                    <tr>
                        <td>
                            <input type="range" min="10" max="500" value={animationSpeed} onChange={changeSpeed}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            animation speed
                        </td>
                    </tr>
                    </tbody>
                </table>}
            </div>
        </div>
    );
}

export default SettingsBar;
