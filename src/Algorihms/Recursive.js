import { getPathNeighbours } from "../Utils/Functions";

let steps;
let maze;
let wasHere;
let correctPath;
let path;
let end;

function recursiveSolve(x, y, i) {
    if(x === end[0] && y === end[1]) return true;
    if(wasHere[x][y] === true) return false;

    if(steps[i] === undefined) {
        steps[i] = [];
    }

    wasHere[x][y] = true;
    steps[i].push({x: x, y: y});

    let n = getPathNeighbours(maze, x, y);
    for(let elem of n) {
        if(recursiveSolve(elem.x, elem.y, i+1) === true) {
            correctPath[x][y] = true;
            path.push({x: x, y: y});
            return true;
        }
    }
    return false;
}

function getRecursiveSteps(m, s, e) {
    maze = m;
    steps = [];
    end = e;
    wasHere = [];
    correctPath = [];
    path = [];
    for(let i = 0; i < m.length; i++) {
        wasHere[i] = [];
        correctPath[i] =[];
        for(let j = 0; j < m[i].length; j++) {
            wasHere[i][j] = false;
            correctPath[i][j] = false;
        }
    }
    recursiveSolve(s[0],s[1], 0);
    steps.splice(0,1);
    path.splice(path.length-1,1);
    return {
        steps: steps,
        path: path
    };
}

export { getRecursiveSteps };