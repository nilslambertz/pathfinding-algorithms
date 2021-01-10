import React from 'react';
import './Main.css';
import "./MazeElem.css";

class Main extends React.Component {
    render() {
        let className = "transition";
        if(this.props.algorithm === "tremaux") {
            className = "noTransition";
        }
        if(this.props.solved === true) className += " solved";
        return (
            <div id="mainDiv" className={className}>
                <div id="mazeGrid">
                    {this.printMaze()}
                    <div id="stepCountDiv">steps: {this.props.steps}</div>
                </div>
            </div>
        )
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
                } else {
                    let width = "2px solid ";
                    let left = c2.left > 0 ? (c2.left > 1 ? "red" : "orange") : "none";
                    let right = c2.right > 0 ? (c2.right > 1 ? "red" : "orange") : "none";
                    let top = c2.top > 0 ? (c2.top > 1 ? "red" : "orange") : "none";
                    let bottom = c2.bottom > 0 ? (c2.bottom > 1 ? "red" : "orange") : "none";
                    let style = {
                        borderBottom: width + bottom,
                        borderLeft: width + left,
                        borderTop: width + top,
                        borderRight: width + right
                    }
                    return <div className={"mazeElem empty"} style={style} key={i+i2}/>;
                }
            })
        });
    }
}

export default Main;
