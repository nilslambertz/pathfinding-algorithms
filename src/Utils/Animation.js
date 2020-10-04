import {getRecursiveSteps} from "../Algorithms/Recursive";
import {getDijkstra} from "../Algorithms/Dijkstra";
import {getTremaux} from "../Algorithms/Tremaux";

class Animation {
    setState;
    maze;
    steps;
    path;
    algorithm;
    speed;
    interval;
    start;
    end;
    pathAnimating;
    count;
    dijkstraMax;
    pathNumber;
    lastElem;

    constructor(setState, algorithm) {
        this.setState = setState;
        this.algorithm = algorithm;
        this.speed = 5;
        this.steps = [];
    }

    changeAlgorithm(algo, maze) {
        this.algorithm = algo;
        this.steps = [];
        this.maze = maze;
    }

    changeAlgorithmSafe(nr) {
        this.algorithm = nr;
    }

    changeMaze(maze, steps, start, end) {
        this.animateMaze(steps, start, end);
        this.maze = maze;
        this.steps = [];
        this.start = start;
        this.end = end;
    }

    animateMaze(steps, start, end) {
        let int = setInterval(() => {
            if(steps.length === 0) {
                clearInterval(int);
                this.maze[start[0]][start[1]] = 2;
                this.maze[end[0]][end[1]] = 3;
                let saveMaze = [];
                for(let i = 0; i < this.maze.length; i++) {
                    saveMaze[i] = [];
                    for (let j = 0; j < this.maze[i].length; j++) {
                        saveMaze[i][j] = this.maze[i][j];
                    }
                }
                this.setState({maze: this.maze, saveMaze: saveMaze, generationRunning: false});
                return;
            }
            let nextArray = steps.splice(0, 1000);
            for(let next of nextArray) {
                this.maze[next[0]][next[1]] = 0;
            }
            this.setState({maze: this.maze});
        }, 400);
    }

    changeSpeed(speed) {
        this.speed = 505 - speed;
    }

    startAnimation() {
        switch (this.algorithm) {
            case 0: {
                if (this.steps.length === 0) {
                    let values = getRecursiveSteps(this.maze.slice(0), this.start, this.end);
                    this.steps = values.steps;
                    this.path = values.path;
                }
                this.pathNumber = 5;
                this.setState({animationRunning: true});
                this.animate(this.recursiveStep, this.pathStepBack);
                return true;
            }
            case 1: {
                if (this.steps.length === 0) {
                    let values = getDijkstra(this.maze.slice(0), this.start, this.end);
                    this.steps = values.steps;
                    this.path = values.path;
                    this.count = 0;
                    this.dijkstraMax = this.steps.length-1;
                }
                this.pathNumber = 4;
                this.setState({animationRunning: true});
                this.animate(this.dijkstraStep, this.pathStepFront);
                return true;
            }
            case 2: {
                if (this.steps.length === 0) {
                    let values = getTremaux(this.maze.slice(0), this.start, this.end);
                    this.steps = values.steps;
                    this.path = values.path;
                }
                this.pathNumber = 5;
                this.setState({animationRunning: true});
                this.animate(this.tremauxStep, this.pathStepFront);
                return true;
            }
            default: {
                this.setState({animationRunning: false});
                return false;
            }
        }
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

    recursiveStep = () => {
        let arr = this.steps.shift();
        for(let elem of arr) {
            this.maze[elem.x][elem.y] = 4;
        }
        this.setState({maze: this.maze});
    }

    tremauxStep = () => {
        let arr = this.steps.shift();

        if(arr.end === true) {
            let lastArr = this.lastElem;
            if(lastArr.junctionX !== undefined && lastArr.junctionY !== undefined) {
                this.maze[lastArr.junctionX][lastArr.junctionY] = 0;
            } else {
                for (let i = 1; i < lastArr.length-1; i++) {
                    this.maze[lastArr[i].x][lastArr[i].y] = 0;
                }

                let mark = lastArr[0];
                if(mark !== null && mark.markedX !== undefined && mark.markedY !== undefined) {
                    console.log(mark);
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
        }
        this.lastElem = arr;
        this.setState({maze: this.maze});
    }

    dijkstraStep = () => {
        let arr = this.steps.shift();
        let c = this.count;
        let val = this.pickColor(c);
        for(let elem of arr) {
            this.maze[elem.x][elem.y] = val;
        }
        this.maze[this.end[0]][this.end[1]] = 3;
        this.count++;
        this.setState({maze: this.maze});
    }

    pickColor = (c) => {
        let firstColor = [129,255,0];
        let secondColor = [255,76,0];
        let diffR = secondColor[0] - firstColor[0];
        let diffG = secondColor[1] - firstColor[1];
        let diffB = secondColor[2] - firstColor[2];
        let percent = c / this.dijkstraMax;
        let newR = firstColor[0] + Math.round(diffR * percent);
        let newG = firstColor[1] + Math.round(diffG * percent);
        let newB = firstColor[2] + Math.round(diffB * percent);
        return [newR, newG, newB];
    }
}

export default Animation;