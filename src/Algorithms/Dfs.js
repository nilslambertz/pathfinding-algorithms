import { getPathNeighbours } from "../Utils/Functions";

let steps;
let maze;
let wasHere;
let correctPath;
let path;
let end;
let count;

function dfs(x, y, c) {
    if(x === end[0] && y === end[1]) return true;

    if(wasHere[x][y] === true) {
        if(c !== 0) steps[++count] = [];
        return false;
    }
    steps[count].push({x: x, y: y});
    wasHere[x][y] = true;

    let n = getPathNeighbours(maze, x, y);
    if(n.length > 2) {
        steps[++count] = [];
    }
    for(let i = 0; i < n.length; i++) {
        if(dfs(n[i].x, n[i].y, i) === true) {
            correctPath[x][y] = true;
            path.push({x: x, y: y});
            return true;
        }
    }
    return false;
}

function getDfsSteps(m, s, e) {
    maze = m;
    steps = [];
    end = e;
    wasHere = [];
    correctPath = [];
    path = [];
    count = 0;
    for(let i = 0; i < m.length; i++) {
        wasHere[i] = [];
        correctPath[i] =[];
        for(let j = 0; j < m[i].length; j++) {
            wasHere[i][j] = false;
            correctPath[i][j] = false;
        }
    }
    steps = [];
    steps[0] = [];
    dfs(s[0],s[1], 0);
    steps[0].splice(0,1);
    path.splice(path.length-1,1);
    return {
        steps: steps,
        path: path
    };
}

export { getDfsSteps };