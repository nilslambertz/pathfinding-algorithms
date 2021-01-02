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
        algorithm: 2,
        animationRunning: false,
        solved: false,
        maze: [],
        saveMaze: [],
        start: [],
        end: [],
        stepCount: 0,
        /*width: 11,
        height: 7,/**/
        /**/width: 151,
        height: 75,/**/
        animationSpeed: 500
    }

    setAlgorithm = (nr) => {
        nr = parseInt(nr);
        if(nr === this.state.algorithm) return;
        this.setState({stepCount: 0});
        this.setState({algorithm: nr}, () => {
            let maze = [];
            let saveMaze = this.state.saveMaze;
            for(let i = 0; i < saveMaze.length; i++) {
                maze[i] = [];
                for (let j = 0; j < saveMaze[i].length; j++) {
                    maze[i][j] = saveMaze[i][j];
                }
            }
            animation.changeAlgorithm(nr, maze);
            this.setState({maze: maze, solved: false});
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
            maze: values.maze,
            start: values.start,
            end: values.end,
            solved: false
        }, () => {
            animation.changeMaze(values.maze.slice(0), values.steps, values.start, values.end);
        });
    }

    componentDidMount(){
        animation = new Animation(this.changeState, this.state.algorithm, this.addToStepCount);
        this.createMaze();
    }

    changeState = (e) => {
        this.setState(e);
    }

    animationClick = () => {
        if(this.state.animationRunning) {
            animation.endAnimation();
        } else if(this.state.solved === false) {
            animation.startAnimation();
        }
    }

    newMazeClick = () => {
        if(this.state.animationRunning) return;
        this.setState({stepCount: 0});
        this.createMaze();
    }

    addToStepCount = (a) => {
        this.setState({stepCount: this.state.stepCount + a});
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
                    steps={this.state.stepCount}
                />
            </div>
  )};
}

export default App;
