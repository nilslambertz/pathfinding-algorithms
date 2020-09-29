import React from 'react';
import './NavBar.css';
import NavElem from './NavElem';

function NavBar({algorithm, setAlgorithm, animationRunning}) {
    return (
        <div id="navbar">
            <NavElem title="Recursive" algoNumber="0" setAlgorithm={setAlgorithm} currentAlgorithm={algorithm} animationRunning={animationRunning}/>
        </div>
    );
}

export default NavBar;
