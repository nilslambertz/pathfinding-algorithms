import { getPathNeighbours } from "../Utils/Functions";

let steps;
let maze;
let wasHere;
let path;
let end;
let count;

function dfs(x, y, c) {
    // If at the destination, return true
    if(x === end[0] && y === end[1]) return true;

    // If already visited, start new step-iteration
    if(wasHere[x][y] === true) {
        if(c !== 0) steps[++count] = [];
        return false;
    }

    // Adding current node to steps and marking it as visited
    steps[count].push({x: x, y: y});
    wasHere[x][y] = true;

    // Get neighbours
    let n = getPathNeighbours(maze, x, y);

    // If at junction, start new "step" after this one
    if(n.length > 2) {
        steps[++count] = [];
    }

    // For every neighbour
    for(let i = 0; i < n.length; i++) {
        // Call dfs recursively, if we found the destination we push current node to path and return true
        if(dfs(n[i].x, n[i].y, i) === true) {
            path.push({x: x, y: y});
            return true;
        }
    }

    // Not correct path
    return false;
}

function getDfsSteps(m, s, e) {
    maze = m;
    steps = [];
    end = e;
    wasHere = [];
    path = [];
    count = 0;
    for(let i = 0; i < m.length; i++) {
        wasHere[i] = [];
        for(let j = 0; j < m[i].length; j++) {
            wasHere[i][j] = false;
        }
    }
    steps = [[]];
    dfs(s[0],s[1], 0); // Start search
    steps[0].shift(); // Remove first step (on starting node)
    path.pop(); // Remove last node from path (destination)

    // Return values
    return {
        steps: steps,
        path: path
    };
}

export { getDfsSteps };