import React from 'react';
import Main from "./Components/Content/Main";
import NavBar from "./Components/Navigation/NavBar";
import SettingsBar from "./Components/Settings/SettingsBar";
import Animation from "./Utils/Animation";
import { createMaze } from "./Utils/Functions";
import './App.css';

let animation;

class App extends React.Component {
    state = {
        algorithm: 0,
        animationRunning: false,
        generationRunning: false,
        solved: false,
        maze: [],
        start: [],
        end: [],
        /*width: 11,
        height: 7,/**/
        width: 151,
        height: 75,
        animationSpeed: 500
    }

    setAlgorithm = (nr) => {
        nr = parseInt(nr);
        this.setState({algorithm: nr}, () => {
            animation.changeAlgorithm(nr);
        });
    }

    setStart = (arr) => {
        this.setState({start: arr});
    }

    setEnd = (arr) => {
        this.setState({end: arr});
    }

    changeSpeed = (e) => {
        if(this.state.animationRunning) return;
        let newSpeed = parseFloat(e.target.value);
        this.setState({animationSpeed: newSpeed});
        animation.changeSpeed(newSpeed);
    }

    createMaze = () => {
        let values = createMaze(this.state.height, this.state.width);
        let maze = [];
        for(let i = 0; i < this.state.height; i++) {
            maze[i] = [];
            for(let j = 0; j < this.state.width; j++) {
                maze[i][j] = 1;
            }
        }
        this.setState({
            maze: maze,
            start: values.start,
            end: values.end,
            solved: false,
            generationRunning: true
        }, () => {
            animation.changeMaze(maze.slice(0), values.steps, values.start, values.end);
        });
    }

    componentDidMount(){
        animation = new Animation(this.changeState);
        this.createMaze();
    }

    changeState = (e) => {
        this.setState(e);
    }

    animationClick = () => {
        if(this.state.generationRunning) return;

        if(this.state.animationRunning) {
            animation.endAnimation();
        } else if(this.state.solved === false) {
            animation.startAnimation();
        }
    }

    newMazeClick = () => {
        if(this.state.animationRunning || this.state.generationRunning) return;
        this.createMaze();
    }

  render() {
        return(
            <div className="App">
                <NavBar algorithm={this.state.algorithm} animationRunning={this.state.animationRunning} setAlgorithm={this.setAlgorithm}/>
                <SettingsBar
                    size={this.state.width-1}
                    solved={this.state.solved}
                    animationRunning={this.state.animationRunning}
                    animationSpeed={this.state.animationSpeed}
                    changeSize={this.changeSize}
                    newMazeClick={this.newMazeClick}
                    animationClick={this.animationClick}
                    changeSpeed={this.changeSpeed}
                />
                <Main
                    maze={this.state.maze}
                    algorithm={this.state.algorithm}
                />
            </div>
  )};
}

export default App;
