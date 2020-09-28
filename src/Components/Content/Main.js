import React from 'react';
import './Main.css';
import MazeElem from "./MazeElem";

class Main extends React.Component {
    render() {
        let className = "";
        if(this.props.solved === true) className = "solved";
        let height = this.props.maze.height + 2;
        let width = this.props.width + 2;
        let style = {
            gridTemplateRows: "repeat(" + height + ", " + 100/height + "%)",
            gridTemplateColumns: "repeat(" + width + ", " + 100/width + "%)"
        }
        return (
            <div id="mainDiv" className={className}>
                <div id="mazeGrid" style={style}>{this.printMaze()}</div>
                <div id="footer">by <a href="http://www.nilslambertz.de" target="_blank" rel="noopener noreferrer">nils lambertz</a></div>
            </div>
        )
    }

    printMaze() {
        return this.props.maze.map(function(c, i, a) {
            return c.map(function(c2, i2, a2) {
                let special = "empty";
                if(c2 === 1) {
                    special = "border";
                } else if(c2 === 2) {
                    special = "entry";
                } else if(c2 === 3) {
                    special = "exit";
                } else if(c2 === 4) {
                    special = "wall";
                }
                return <MazeElem special={special} key={i+i2} />
            })
        });
    }
}

export default Main;
