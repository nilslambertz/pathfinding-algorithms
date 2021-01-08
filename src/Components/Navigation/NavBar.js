import React from 'react';
import './NavBar.css';

function NavBar({algorithmList, algorithm, setAlgorithm, animationRunning}) {

    function changeAlgorithm(algo) {
        if(animationRunning) return;

        setAlgorithm(algo);
    }

    return (
        <div id="navbar">
            {algorithmList.map(function(c, i, a) {
                let className = "navElem";
                if(c === algorithm) {
                    className += " active";
                } else if (animationRunning) {
                    className += " disabled"
                }
                return <div className={className} onClick={() => changeAlgorithm(c)}>{c}</div>;
            })}
        </div>
    );
}

export default NavBar;
