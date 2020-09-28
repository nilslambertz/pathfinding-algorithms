import React from 'react';
import "./MazeElem.css";

class MazeElem extends React.Component {
    render() {
        let className = "mazeElem";
        let c2 = this.props.c2;
        let top = this.props.top;
        let bottom = this.props.bottom;
        let i2 = this.props.i2;
        let a2 = this.props.a2;
        let special = "empty";
        if(c2 === 2) {
            special = "entry";
        } else if(c2 === 3) {
            special = "exit";
        } else if(c2 === 4) {
            special = "wall";
        }
        if(top) {
            special += " topBorder";
        }
        if(bottom) {
            special += " bottomBorder";
        }
        if(i2 === 0) {
            special += " leftBorder";
        }
        if(i2 === a2.length-1) {
            special += " rightBorder";
        }

        if(special) className += " " + special;
        return (
            <div className={className} style={this.props.style}/>
        )
    }
}

export default MazeElem;