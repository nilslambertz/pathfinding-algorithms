import React from 'react';
import './Main.css';
import "./MazeElem.css";

class Main extends React.Component {
    render() {
        let className = "";
        if(this.props.solved === true) className = "solved";
        return (
            <div id="mainDiv" className={className}>
                <div id="mazeGrid">{this.printMaze()}</div>
                <div id="footer">by <a href="http://www.nilslambertz.de" target="_blank" rel="noopener noreferrer">nils lambertz</a></div>
            </div>
        )
    }

    printMaze() {
        return this.props.maze.map(function(c, i, a) {
            return c.map(function(c2, i2, a2) {
                let special;
                if(c2 === 0) {
                    special = "empty";
                } else if(c2 === 1) {
                    special = "wall";
                } else if(c2 === 2) {
                    special = "start";
                } else if(c2 === 3) {
                    special = "end";
                } else if(c2 === 4) {
                    special = "test";
                }
                return <div className={"mazeElem " + special} key={i+i2}/>;
            })
        });
    }
}

export default Main;
