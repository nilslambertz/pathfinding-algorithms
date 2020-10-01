import {getRecursiveSteps} from "../Algorihms/Recursive";
import {getDijkstra} from "../Algorihms/Dijkstra";

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

    constructor(setState) {
        this.setState = setState;
        this.algorithm = 0;
        this.speed = 5;
        this.steps = [];
    }

    changeAlgorithm(algo, maze) {
        this.algorithm = algo;
        this.steps = [];
        this.maze = maze;
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
                this.setState({animationRunning: true});
                this.animate(this.recursiveStep);
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
                this.setState({animationRunning: true});
                this.animate(this.dijkstraStep);
                return true;
            }
            default: {
                this.setState({animationRunning: false});
                return false;
            }
        }
    }

    endAnimation(finished) {
        clearInterval(this.interval);
        if (finished) {
            this.animatePath();
        }
        if(this.pathAnimating !== true) {
            this.setState({animationRunning: false});
        }
    }

    animatePath() {
        this.pathAnimating = true;
        let int = setInterval(() => {
            if(this.path.length === 0) {
                clearInterval(int);
                this.setState({animationRunning: false});
                this.setState({solved: true});
                this.pathAnimating = false;
                return;
            }
            let elem = this.path.shift();
            this.maze[elem.x][elem.y] = 4;
            this.setState({maze: this.maze});
        }, 10);
    }

    animate(step) {
        this.interval = setInterval(() => {
            if (this.steps.length === 0) {
                this.endAnimation(true);
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