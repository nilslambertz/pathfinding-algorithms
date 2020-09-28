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
        solved: false,
        maze: [],
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

    changeSpeed = (e) => {
        if(this.state.animationRunning) return;
        let newSpeed = parseFloat(e.target.value);
        this.setState({animationSpeed: newSpeed});
        animation.changeSpeed(newSpeed);
    }


    createMaze = () => {
        let maze = createMaze(this.state.height, this.state.width);
        animation.changeMaze(maze);
        this.setState({maze});
    }

    componentDidMount(){
        animation = new Animation(this.changeState);
        this.createMaze();
    }

    changeState = (e) => {
        this.setState(e);
    }

    animationClick = () => {
        if(this.state.animationRunning) {
            animation.endAnimation();
            this.setState({animationRunning: false});
        } else if(this.state.solved === false) {
            this.setState({animationRunning: true}, () =>
            {
                let success = animation.startAnimation();
                if(!success) {
                    this.setState({animationRunning: false});
                }
            });
        }
    }

    newMazeClick = () => {
        if(this.state.animationRunning) return;
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
