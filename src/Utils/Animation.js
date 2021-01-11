import {getDfsSteps} from "../Algorithms/Dfs";
import {getDijkstra} from "../Algorithms/Dijkstra";
import {getTremaux} from "../Algorithms/Tremaux";
import {getGreedy} from "../Algorithms/GreedySearch";
import {getAStar} from "../Algorithms/AStar";

class Animation {
    setState; // SetState-method of App
    maze; // Maze-array
    steps; // Steps to find destination
    path; // Path from start to end
    algorithm; // Current algorithm
    algorithmList; // List of all algorithms
    speed; // Speed of animation
    interval; // Interval-object used to animate
    start; // Starting-node
    end; // Destination-node
    pathAnimating; // If path is currently animating
    pathNumber; // Number used to draw maze-elem as path
    lastElem; // Previous element from steps
    addCount; // addCount-method from App
    getStepFunction; // function to get step-array of current algorithm
    stepFunction; // function to make one step in animation of current algorithm
    pathFunction; // function to draw path

    constructor(setState, algorithm, addCountFunction) {
        // Initialize values
        this.setState = setState;
        this.speed = 5;
        this.addCount = addCountFunction;
        this.pathNumber = 5;

        // Create list of algorithms
        this.algorithmList = {
            "a*": {
                getSteps: getAStar,
                step: this.defaultStep,
                path: this.pathStepBack
            },
            "dfs": {
                getSteps: getDfsSteps,
                step: this.arrayStep,
                path: this.pathStepBack
            },
            "dijkstra": {
                getSteps: getDijkstra,
                step: this.arrayStep,
                path: this.pathStepBack
            },
            "greedy": {
                getSteps: getGreedy,
                step: this.defaultStep,
                path: this.pathStepBack
            },
            "tremaux": {
                getSteps: getTremaux,
                step: this.tremauxStep,
                path: this.pathStepFront
            }
        }

        this.changeAlgorithm(algorithm);
    }

    // Returns all algorithm-titles (for NavBar)
    getAlgorithmTitles = () => {
        return Object.keys(this.algorithmList);
    }

    changeAlgorithm(algo, maze) {
        if(maze !== undefined) {
            this.maze = maze;
        }

        this.getStepFunction = this.algorithmList[algo].getSteps;
        this.pathFunction = this.algorithmList[algo].path;
        this.stepFunction = this.algorithmList[algo].step;

        this.algorithm = algo;
        this.steps = [];
        this.path = [];

        this.setState({stepCount: 0});
    }

    changeMaze(maze, steps, start, end) {
        this.maze = maze;
        this.steps = [];
        this.start = start;
        this.end = end;

        let saveMaze = [];
        for(let i = 0; i < maze.length; i++) {
            saveMaze[i] = [];
            for (let j = 0; j < maze[i].length; j++) {
                saveMaze[i][j] = maze[i][j];
            }
        }
        this.setState({maze: this.maze, saveMaze: saveMaze});
    }

    changeSpeed(speed) {
        this.speed = 505 - speed;
    }

    startAnimation() {
        if(this.steps.length !== 0) {
            this.setState({animationRunning: true});
            this.animate(this.stepFunction, this.pathFunction)
            return true;
        }

        if(this.stepFunction === undefined || this.pathFunction === undefined) {
            alert("Error, a needed function is undefined");
            return false;
        }

        let values = this.getStepFunction(this.maze.slice(0), this.start, this.end);

        if(values === null) {
            alert("Error, algorithm could not find destination!");
            return false;
        }

        this.steps = values.steps;
        this.path = values.path;

        this.setState({animationRunning: true});
        this.animate(this.stepFunction, this.pathFunction);
        return true;
    }

    endAnimation(finished, pathFunc) {
        clearInterval(this.interval);
        if (finished) {
            this.animatePath(pathFunc);
        }
        if(this.pathAnimating !== true) {
            this.setState({animationRunning: false});
        }
    }

    animatePath(func) {
        this.pathAnimating = true;
        let int = setInterval(() => {
            if(this.path.length === 0) {
                clearInterval(int);
                this.setState({animationRunning: false});
                this.setState({solved: true});
                this.pathAnimating = false;
                return;
            }
            func();
        }, 10);
    }

    pathStepBack = () => {
        let elem = this.path.pop();
        this.maze[elem.x][elem.y] = this.pathNumber;
        this.setState({maze: this.maze});
    }

    pathStepFront = () => {
        let elem = this.path.shift();
        this.maze[elem.x][elem.y] = this.pathNumber;
        this.setState({maze: this.maze});
    }

    animate(step, pathFunc) {
        this.interval = setInterval(() => {
            if (this.steps.length === 0) {
                this.endAnimation(true, pathFunc);
                return;
            }
            step();
        }, this.speed);
    }

    defaultStep = () => {
        let elem = this.steps.shift();
        this.maze[elem.x][elem.y] = 4;
        this.addCount(1);
        this.setState({maze: this.maze});
    }

    arrayStep = () => {
        let arr = this.steps.shift();
        for(let elem of arr) {
            this.maze[elem.x][elem.y] = 4;
        }
        this.addCount(arr.length);
        this.setState({maze: this.maze});
    }

    tremauxStep = () => {
        let arr = this.steps.shift();

        if(arr.end === true) {
            let lastArr = this.lastElem;
            if(lastArr.junctionX !== undefined && lastArr.junctionY !== undefined) {
                this.maze[lastArr.junctionX][lastArr.junctionY] = 0;
                this.addCount(1);
            } else {
                for (let i = 1; i < lastArr.length-1; i++) {
                    this.maze[lastArr[i].x][lastArr[i].y] = 0;
                }

                let mark = lastArr[0];
                if(mark !== null && mark.markedX !== undefined && mark.markedY !== undefined) {
                    this.maze[mark.markedX][mark.markedY] = mark.markCount;
                }
            }
            this.maze[this.start[0]][this.start[1]] = 2;
            this.maze[this.end[0]][this.end[1]] = 3;
            this.setState({maze: this.maze});
            return;
        }

        if(arr.junctionX !== undefined && arr.junctionY !== undefined) {
            this.maze[this.start[0]][this.start[1]] = 2;
            this.maze[this.end[0]][this.end[1]] = 3;
            this.maze[arr.junctionX][arr.junctionY] = 4;
            this.addCount(1);
            if(this.lastElem !== undefined) {
                let lastArr = this.lastElem;
                let first = lastArr[0];
                let last = lastArr[lastArr.length-1];

                let x1;
                let x2;
                let y1;
                let y2;

                if(first !== null && (last.markedX !== first.markedX || last.markedY !== first.markedY)) {
                    if(first.markedX !== null && first.markedY !== null) {
                        x1 = first.markedX;
                        y1 = first.markedY;
                        this.maze[x1][y1] = first.markCount;
                    }
                }
                x2 = last.markedX;
                y2 = last.markedY;
                this.maze[x2][y2] = last.markCount;

                for (let i = 1; i < lastArr.length-1; i++) {
                    if((lastArr[i].x !== x1 || lastArr[i].y !== y1) && (lastArr[i].x !== x2 || lastArr[i].y !== y2)) {
                        this.maze[lastArr[i].x][lastArr[i].y] = 0;
                    }
                }
            }
        } else {
            this.maze[this.start[0]][this.start[1]] = 2;
            this.maze[this.end[0]][this.end[1]] = 3;
            if(this.lastElem !== undefined && this.lastElem.junctionX !== undefined && this.lastElem.junctionY !== undefined) {
                this.maze[this.lastElem.junctionX][this.lastElem.junctionY] = 0;
            }
            for(let i = 1; i < arr.length -1; i++) {
                this.maze[arr[i].x][arr[i].y] = 4;
            }
            this.addCount(arr.length-2);
        }
        this.lastElem = arr;
        this.setState({maze: this.maze});
    }
}

export default Animation;