let steps;
let maze;
let wasHere;
let correctPath;
let end;

function recursiveSolve(x, y, i) {
    if(x === end[0] && y === end[1]) return true;
    if(wasHere[x][y] === true) return false;

    if(steps[i] === undefined) {
        steps[i] = [];
    }

    wasHere[x][y] = true;
    steps[i].push({x: x, y: y});
    if(x !== 0 && maze[x-1][y] !== 1) {
        if(recursiveSolve(x-1, y, i+1) === true) {
            correctPath[x][y] = true;
            return true;
        }
    }
    if(x !== maze.length-1 && maze[x+1][y] !== 1) {
        if(recursiveSolve(x+1, y, i+1) === true) {
            correctPath[x][y] = true;
            return true;
        }
    }
    if(y !== 0 && maze[x][y-1] !== 1) {
        if(recursiveSolve(x, y-1, i+1) === true) {
            correctPath[x][y] = true;
            return true;
        }
    }
    if(y !== maze[0].length-1 && maze[x][y+1] !== 1) {
        if(recursiveSolve(x, y+1, i+1) === true) {
            correctPath[x][y] = true;
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
    return {
        steps: steps,
        path: correctPath
    };
}

export { getRecursiveSteps };