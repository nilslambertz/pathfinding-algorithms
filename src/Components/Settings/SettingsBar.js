import React from 'react';
import './SettingsBar.css';

function SettingsBar({size, solved, animationRunning, animationSpeed, newMazeClick, animationClick, changeSpeed, perfectMaze, setPerfectMaze}) {
    const playStyle = {
        color: "lightgreen"
    }
    const stopStyle = {
        color: "orange"
    }

    let perfectMazeStyle = {
        color: perfectMaze ? "#62D40C" : "#E98A45"
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
                        <td id="newMaze" className="settingsButton" rowSpan="2" onClick={newMazeClick}>
                            new maze
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className={(animationRunning ? "disabledSetting" : "")}>
                    <tbody>
                    <tr>
                        <td id="perfectMaze" style={perfectMazeStyle} className="settingsButton" rowSpan="2" onClick={() => {
                            if(animationRunning) return;
                            setPerfectMaze(!perfectMaze)
                        }}>
                            perfect maze: {perfectMaze ? "✅" : "❌"}
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
