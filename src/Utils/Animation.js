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

    changeMaze(maze) {
        this.maze = maze;
        this.steps = [];
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