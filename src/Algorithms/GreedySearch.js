import {getPathNeighbours, getPathRecursive} from "../Utils/Functions";

let steps;
let maze;
let wasHere;
let stack;
let path;
let end;

// Get heuristic
function getDistance(x, y) {
    return Math.abs(x - end[0]) + Math.abs(y - end[1]);
}

// Greedy-best-first-search
function greedySearch() {
    // While elements in stack
    while(stack.length !== 0) {
        let elem = stack.pop(); // Get first element
        if(wasHere[elem.x][elem.y]) continue; // If visited, continue

        // If at destination
        if(elem.x === end[0] && elem.y === end[1]) {
            path = getPathRecursive(elem); // Get path
            return;
        }

        // Set visited and push elem to steps
        wasHere[elem.x][elem.y] = true;
        steps.push(elem);

        let neighbours = getPathNeighbours(maze, elem.x, elem.y); // Get neighbours

        // Set distance and parent for all neighbours
        for(let n of neighbours) {
            n.distance = getDistance(n.x, n.y);
            n.parent = elem;
        }

        // Sort neighbours
        neighbours.sort(function(a, b) {
            return b.distance - a.distance;
        });

        // Push sorted list to stack
        for(let n of neighbours) {
            stack.push(n);
        }
    }
}


function getGreedy(m, s, e) {
    maze = m;
    steps = [];
    end = e;
    wasHere = [];
    stack = [];
    path = [];
    for (let i = 0; i < m.length; i++) {
        wasHere[i] = [];
        for (let j = 0; j < m[i].length; j++) {
            wasHere[i][j] = false;
        }
    }

    stack.push({x: s[0], y: s[1], parent: null}); // Push starting-node to stack

    greedySearch(); // Start search

    // Remove starting-node from steps
    steps.shift();

    // Return values
    return {
        steps: steps,
        path: path
    };
}

export { getGreedy };