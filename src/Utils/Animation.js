import {getRecursiveSteps} from "../Algorihms/Recursive";

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

    constructor(setState) {
        this.setState = setState;
        this.algorithm = 0;
        this.speed = 5;
        this.steps = [];
    }

    changeAlgorithm(algo) {
        this.algorithm = algo;
        this.steps = [];
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
                setTimeout(() => {
                    this.maze[start[0]][start[1]] = 2;
                    this.maze[end[0]][end[1]] = 3;
                    this.setState({maze: this.maze});
                },200);
                this.setState({generationRunning: false});
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
                this.animate(this.recursiveStep);
                return true;
            }
            default: {
                alert("error");
                return false;
            }
        }
    }

    endAnimation(finished) {
        clearInterval(this.interval);
        if (finished) {
            let int = setInterval(() => {
                if(this.path.length === 0) {
                    clearInterval(int);
                    this.setState({animationRunning: false});
                    return;
                }
                let elem = this.path.pop();
                this.maze[elem.x][elem.y] = 5;
                this.setState({maze: this.maze});
            }, 10);
        }
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
}

export default Animation;