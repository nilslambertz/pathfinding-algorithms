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
        algorithm: "a*", // chosen algorithm, default tremaux
        algorithmList: [], // list of all algorithms
        perfectMaze: true, // if maze should be created without loops
        animationRunning: false, // if the animation is currently running
        solved: false, // if the maze is solved
        maze: [], // maze-array
        saveMaze: [], // saved inital maze to reset animation
        start: [], // starting point, array has two coordinates as values
        end: [], // destination, array has two coordinates as values
        stepCount: 0, // number of steps the algorithm has done
        /*width: 11,
        height: 7,/**/
        /**/width: 151,
        height: 75,/**/
        animationSpeed: 500 // speed of the animation, higher values mean faster animation
    }

    // Sets the algorithm
    setAlgorithm = (algo) => {
        if(algo === this.state.algorithm) return; // If current algorithm was chosen, do nothing

        // Reset stepCount and set algorithm to new number
        this.setState({stepCount: 0});
        this.setState({algorithm: algo}, () => {
            let maze = []; // Create new maze
            let saveMaze = this.state.saveMaze;

            // Copy saveMaze into maze
            for(let i = 0; i < saveMaze.length; i++) {
                maze[i] = [];
                for (let j = 0; j < saveMaze[i].length; j++) {
                    maze[i][j] = saveMaze[i][j];
                }
            }

            // Change algorithm-number in Animation
            animation.changeAlgorithm(algo, maze);

            // Set new maze and set solved to false
            this.setState({maze: maze, solved: false});
        });
    }

    // Sets starting point
    setStart = (arr) => {
        this.setState({start: arr});
    }

    // Sets destination
    setEnd = (arr) => {
        this.setState({end: arr});
    }

    // Changes speed of the animation
    changeSpeed = (e) => {
        if(this.state.animationRunning) return; // Return if animation is currently running

        // Change speed in state and Animation
        let newSpeed = parseFloat(e.target.value);
        this.setState({animationSpeed: newSpeed});
        animation.changeSpeed(newSpeed);
    }

    // Creates new maze
    createMaze = () => {
        let values = createMaze(this.state.height, this.state.width, this.state.perfectMaze); // Calls createMaze function in Functions.js

        // Sets maze, starting point and destination
        this.setState({
            maze: values.maze,
            start: values.start,
            end: values.end,
            solved: false
        }, () => {
            // Sends new values to Animation
            animation.changeMaze(values.maze.slice(0), values.steps, values.start, values.end);
        });
    }

    // Creates new maze when component has mounted
    componentDidMount(){
        animation = new Animation(this.changeState, this.state.algorithm, this.addToStepCount);
        let algos = animation.getAlgorithmTitles();
        this.setState({algorithmList: algos});
        this.createMaze();
    }

    // ChangeState-function to allow Animation to update the maze
    changeState = (e) => {
        this.setState(e);
    }

    // Change perfectMaze-state
    setPerfectMaze = (v) => {
        this.setState({perfectMaze: v});
    }

    // Click-handler for start/stop animation button
    animationClick = () => {
        if(this.state.animationRunning) {
            // If currently running, end animation
            animation.endAnimation();
        } else if(this.state.solved === false) {
            // If not running and not solved, start animation
            animation.startAnimation();
        }
    }

    // Click-handler for new-maze button
    newMazeClick = () => {
        if(this.state.animationRunning) return; // If animation running, do nothing

        // Set stepCount to 0 and create new maze
        this.setState({stepCount: 0});
        this.createMaze();
    }

    // Increases step count
    addToStepCount = (a) => {
        this.setState({stepCount: this.state.stepCount + a});
    }

  render() {
        return(
            <div className="App">
                <NavBar currentAlgorithm={this.state.algorithm} algorithmList={this.state.algorithmList} animationRunning={this.state.animationRunning} setAlgorithm={this.setAlgorithm}/>
                <SettingsBar
                    solved={this.state.solved}
                    animationRunning={this.state.animationRunning}
                    animationSpeed={this.state.animationSpeed}
                    changeSize={this.changeSize}
                    newMazeClick={this.newMazeClick}
                    animationClick={this.animationClick}
                    changeSpeed={this.changeSpeed}
                    perfectMaze={this.state.perfectMaze}
                    setPerfectMaze={this.setPerfectMaze}
                />
                <Main
                    maze={this.state.maze}
                    algorithm={this.state.algorithm}
                    steps={this.state.stepCount}
                />
                <div id="footer">by <a href="http://www.nilslambertz.de" target="_blank" rel="noopener noreferrer">nils lambertz</a> - <a href="https://github.com/nilslambertz/MazeVisualizer" target="_blank" rel="noopener noreferrer">source code</a></div>
            </div>
  )};
}

export default App;
