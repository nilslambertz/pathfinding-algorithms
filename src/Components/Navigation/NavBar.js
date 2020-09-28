import React from 'react';
import './NavBar.css';
import NavElem from './NavElem';

function NavBar({algorithm, setAlgorithm, animationRunning}) {
    return (
        <div id="navbar">
            <NavElem title="A*" algoNumber="0" setAlgorithm={setAlgorithm} currentAlgorithm={algorithm} animationRunning={animationRunning}/>
            <NavElem title="test" algoNumber="1" setAlgorithm={setAlgorithm} currentAlgorithm={algorithm} animationRunning={animationRunning}/>
        </div>
    );
}

export default NavBar;
