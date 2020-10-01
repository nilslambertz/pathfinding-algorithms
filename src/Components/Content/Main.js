import React from 'react';
import './Main.css';
import "./MazeElem.css";

class Main extends React.Component {
    render() {
        let className = "";
        if(this.props.solved === true) className = "solved";
        return (
            <div id="mainDiv" className={className}>
                <div id="mazeGrid">{this.props.algorithm === 1 ? this.printDijkstraMaze() : this.printMaze()}</div>
                <div id="footer">by <a href="http://www.nilslambertz.de" target="_blank" rel="noopener noreferrer">nils lambertz</a></div>
            </div>
        )
    }

    printDijkstraMaze() {
        return this.props.maze.map(function(c, i, a) {
            return c.map(function(c2, i2, a2) {
                if(c2 === 0) {
                    return <div className={"mazeElem empty"} key={i+i2}/>;
                } else if(c2 === 1) {
                    return <div className={"mazeElem wall"} key={i+i2}/>;
                } else if(c2 === 2) {
                    return <div className={"mazeElem start"} key={i+i2}/>;
                } else if(c2 === 3) {
                    return <div className={"mazeElem end"} key={i+i2}/>
                } else if(c2 === 4) {
                    return <div className={"mazeElem correctPath"} key={i+i2}/>;
                } else {
                    let val = c2;
                    let style = {
                        backgroundColor: "rgb(" + val[0] + "," + val[1] + "," + val[2] + ")"
                    }
                    return <div className={"mazeElem"} style={style} key={i+i2}/>;
                }
            })
        });
    }

    printMaze() {
        return this.props.maze.map(function(c, i, a) {
            return c.map(function(c2, i2, a2) {
                if(c2 === 0) {
                    return <div className={"mazeElem empty"} key={i+i2}/>;
                } else if(c2 === 1) {
                    return <div className={"mazeElem wall"} key={i+i2}/>;
                } else if(c2 === 2) {
                    return <div className={"mazeElem start"} key={i+i2}/>;
                } else if(c2 === 3) {
                    return <div className={"mazeElem end"} key={i+i2}/>
                } else if(c2 === 4) {
                    return <div className={"mazeElem searched"} key={i+i2}/>;
                } else if(c2 === 5) {
                    return <div className={"mazeElem correctPath"} key={i+i2}/>;
                }
                return <div className={"mazeElem"} key={i+i2}/>;
            })
        });
    }
}

export default Main;
