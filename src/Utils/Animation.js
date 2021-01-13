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

    // Changes algorithm and sets maze if passed as argument
    changeAlgorithm(algo, maze) {
        // Set maze if passed
        if(maze !== undefined) {
            this.maze = maze;
        }

        // Set functions for new algorithm
        this.getStepFunction = this.algorithmList[algo].getSteps;
        this.pathFunction = this.algorithmList[algo].path;
        this.stepFunction = this.algorithmList[algo].step;

        // Set algorithm and reset step- and path-array
        this.algorithm = algo;
        this.steps = [];
        this.path = [];
        this.lastElem = undefined;

        // Reset step-count
        this.setState({stepCount: 0});
    }

    // Changes the maze
    changeMaze(maze, steps, start, end) {
        // Set maze, start- and end-node and reset step-array
        this.maze = maze;
        this.steps = [];
        this.start = start;
        this.end = end;
        this.lastElem = undefined;

        // Create saveMaze used when switching algorithms while animation has already started
        let saveMaze = [];
        for(let i = 0; i < maze.length; i++) {
            saveMaze[i] = [];
            for (let j = 0; j < maze[i].length; j++) {
                saveMaze[i][j] = maze[i][j];
            }
        }
        this.setState({maze: this.maze, saveMaze: saveMaze});
    }

    // Changes speed of animation
    changeSpeed(speed) {
        this.speed = 505 - speed;
    }

    // Starts animation
    startAnimation() {
        // If we have more steps in our array
        if(this.steps.length !== 0) {
            this.setState({animationRunning: true}); // Set animation to running
            this.animate(this.stepFunction, this.pathFunction); // Start animation
            return true; // Animation has started, return true
        }

        // If one of the needed functions is not set
        if(this.stepFunction === undefined || this.pathFunction === undefined) {
            alert("Error, a needed function is undefined");
            return false; // Animation couldn't start, return false
        }

        // Get values from current algorithm
        let values = this.getStepFunction(this.maze.slice(0), this.start, this.end);

        // If algorithm encountered error
        if(values === null) {
            alert("Error, algorithm could not find destination!");
            return false; // Animation couldn't start, return false
        }

        // Set path and steps from received values
        this.steps = values.steps;
        this.path = values.path;

        this.setState({animationRunning: true}); // Animation is now running
        this.animate(this.stepFunction, this.pathFunction); // Start animation
        return true; // Animation has started, return true
    }

    // Stops animation
    endAnimation(finished, pathFunc) {
        clearInterval(this.interval); // Clear interval

        // If step-array is empty, animate path
        if (finished) {
            this.animatePath(pathFunc);
        }

        // If button was pressed and path is not currently animating, set animationRunning to false
        if(this.pathAnimating !== true) {
            this.setState({animationRunning: false});
        }
    }

    // Animates path step-by-step
    animatePath(func) {
        this.pathAnimating = true; // Set pathAnimating to true
        let int = setInterval(() => {
            // If path-animation is finished
            if(this.path.length === 0) {
                clearInterval(int);

                // Set states and return
                this.setState({animationRunning: false});
                this.setState({solved: true});
                this.pathAnimating = false;
                return;
            }
            func(); // Call path-drawing function
        }, 10);
    }

    // Animates next step from path with last element from array
    pathStepBack = () => {
        let elem = this.path.pop();
        this.maze[elem.x][elem.y] = this.pathNumber;
        this.setState({maze: this.maze});
    }

    // Animates next step from path with first element from array
    pathStepFront = () => {
        let elem = this.path.shift();
        this.maze[elem.x][elem.y] = this.pathNumber;
        this.setState({maze: this.maze});
    }

    // Animates one step with current algorithm
    animate(step, pathFunc) {
        this.interval = setInterval(() => {
            // If steps is empty
            if (this.steps.length === 0) {
                // End animation and return
                this.endAnimation(true, pathFunc);
                return;
            }
            step(); // Do one step with current algorithm
        }, this.speed);
    }

    // Does one step
    defaultStep = () => {
        let elem = this.steps.shift(); // Get next element from step-array
        this.maze[elem.x][elem.y] = 4; // Set element to "searched"
        this.addCount(1); // Add step
        this.setState({maze: this.maze}); // Set new maze
    }

    // Does multiple steps at once
    arrayStep = () => {
        let arr = this.steps.shift(); // Get next elements from step-array

        // For each element, set element to searched
        for(let elem of arr) {
            this.maze[elem.x][elem.y] = 4;
        }
        this.addCount(arr.length); // Add steps
        this.setState({maze: this.maze}); // Set new maze
    }

    // Does one step with tremaux algorithm
    tremauxStep = () => {
        let arr = this.steps.shift(); // Get next element from step-array

        // If we found our destination
        if(arr.end === true) {
            let lastArr = this.lastElem; // Get last element

            // If last element was a junction
            if(lastArr.junctionX !== undefined && lastArr.junctionY !== undefined) {
                this.maze[lastArr.junctionX][lastArr.junctionY] = 0; // Clear last element
            } else {
                // If last element was a path

                // Clear every element in the path
                for (let i = 1; i < lastArr.length-1; i++) {
                    this.maze[lastArr[i].x][lastArr[i].y] = 0;
                }

                // Mark entry to path
                let mark = lastArr[0];
                if(mark !== undefined && mark.markedX !== undefined && mark.markedY !== undefined) {
                    this.maze[mark.markedX][mark.markedY] = mark.markCount;
                }
            }

            // Set new start-, end-node (in case they were overwritten) and maze and return
            this.maze[this.start[0]][this.start[1]] = 2;
            this.maze[this.end[0]][this.end[1]] = 3;
            this.setState({maze: this.maze});
            return;
        }

        // If we are at a junction
        if(arr.junctionX !== undefined && arr.junctionY !== undefined) {
            // If lastElem exists
            if(this.lastElem !== undefined) {
                let lastArr = this.lastElem;

                // If last element was a junction too, reset it
                if(lastArr.junctionX !== undefined && lastArr.junctionY !== undefined) {
                    this.maze[lastArr.junctionX][lastArr.junctionY] = 0;
                } else {
                    // If last element was a path

                    let first = lastArr[0]; // First element of array is number of marks at entry
                    let last = lastArr[lastArr.length - 1]; // Last element of array is number of marks at exit

                    let x1, x2, y1, y2; // Coordinates of entry and exit

                    // Set marks on entry
                    if (first !== undefined && last !== undefined && (last.markedX !== first.markedX || last.markedY !== first.markedY)) {
                        if (first.markedX !== undefined && first.markedY !== undefined) {
                            x1 = first.markedX;
                            y1 = first.markedY;
                            this.maze[x1][y1] = first.markCount;
                        }
                    }

                    // Set marks on exit
                    if (last !== undefined && last.markedX !== undefined && last.markedY !== undefined) {
                        x2 = last.markedX;
                        y2 = last.markedY;
                        this.maze[x2][y2] = last.markCount;
                    }

                    // Reset all other nodes in path
                    for (let i = 1; i < lastArr.length - 1; i++) {
                        if ((lastArr[i].x !== x1 || lastArr[i].y !== y1) && (lastArr[i].x !== x2 || lastArr[i].y !== y2)) {
                            this.maze[lastArr[i].x][lastArr[i].y] = 0;
                        }
                    }
                }
            }

            // Set start- and end-nodes in case they were overwritten in the last step
            this.maze[this.start[0]][this.start[1]] = 2;
            this.maze[this.end[0]][this.end[1]] = 3;

            // Mark current node as searched and add one step
            this.maze[arr.junctionX][arr.junctionY] = 4;
            this.addCount(1);
        } else {
            // If we are inside a path

            // If last element was a junction, clear element
            if(this.lastElem !== undefined && this.lastElem.junctionX !== undefined && this.lastElem.junctionY !== undefined) {
                this.maze[this.lastElem.junctionX][this.lastElem.junctionY] = 0;
            }

            // Set start- and end-nodes in case they were overwritten
            this.maze[this.start[0]][this.start[1]] = 2;
            this.maze[this.end[0]][this.end[1]] = 3;

            // Set all nodes inside path to searched
            for(let i = 1; i < arr.length -1; i++) {
                this.maze[arr[i].x][arr[i].y] = 4;
            }
            this.addCount(arr.length-2); // Add number of nodes to count
        }
        this.lastElem = arr; // Set last element
        this.setState({maze: this.maze}); // Set maze
    }
}

export default Animation;