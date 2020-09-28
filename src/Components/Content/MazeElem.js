import React from 'react';
import "./MazeElem.css";

class MazeElem extends React.Component {
    render() {
        let className = "mazeElem";
        if(this.props.special) className += " " + this.props.special;
        return (
            <div className={className} style={this.props.style}/>
        )
    }
}

export default MazeElem;