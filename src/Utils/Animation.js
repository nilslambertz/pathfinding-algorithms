import { steps } from "./Functions";

class Animation {
    setState;
    maze;
    steps;
    algorithm;
    speed;
    interval;

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

    changeMaze(maze, steps) {
        this.animateMaze(steps);
        console.log(steps);
        this.maze = maze;
        this.steps = [];
    }

    animateMaze(steps) {
        let int = setInterval(() => {
            if(steps.length === 0) {
                clearInterval(int);
                this.setState({generationRunning: false});
                return;
            }
            let nextTwoHundred = steps.splice(0, 200);
            for(let next of nextTwoHundred) {
                this.maze[next[0]][next[1]] = 0;
            }
            this.setState({maze: this.maze});
        }, 10);
    }

    changeSpeed(speed) {
        this.speed = 505 - speed;
    }

    startAnimation() {
        switch (this.algorithm) {
            case 0: {
                if (this.steps.length === 0) {
                    //      this.swap = getBubbleSortSwap(this.array.slice(0));
                }
               // this.animate(this.bubbleSortStep);
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
        this.setState({animationRunning: false});
        if (finished) {
            // this.setState({firstIndex: null, secondIndex: null, leftBorder: null, rightBorder: null, mid: null});
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
}

export default Animation;