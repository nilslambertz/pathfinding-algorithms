import React from 'react';
import './NavBar.css';

function NavElem({title, algoNumber, setAlgorithm, currentAlgorithm, animationRunning}) {
    function algoChange() {
        if(animationRunning) return;
        setAlgorithm(algoNumber);
    }

    let className = "navElem";
    if(parseInt(algoNumber) === parseInt(currentAlgorithm)) {
        className += " active";
    }
    if(animationRunning){
        className += " disabled"
    }

    return (
        <div className={className} onClick={algoChange}>
            <span>{title}</span>
        </div>
    );
}

export default NavElem;