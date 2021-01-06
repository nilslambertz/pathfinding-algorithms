import {getPathNeighbours, getPathRecursive} from "../Utils/Functions";

let PriorityQueue = require('priorityqueuejs'); // Using PriorityQueue for A*

let steps;
let maze;
let wasHere;
let queue;
let path;
let end;

// Get heuristic
function getDistance(x, y) {
    return Math.abs(x - end[0]) + Math.abs(y - end[1]);
}

// A*-algorithm
function aStar() {
    // While PriorityQueue has more elements
    while(!queue.isEmpty()) {
        let elem = queue.deq(); // Get "best" element from queue
        if(wasHere[elem.x][elem.y] === true) continue; // Continue, if already visisted

        // If at destination
        if(elem.x === end[0] && elem.y === end[1]) {
            path = getPathRecursive(elem); // Get path
            return;
        }

        // Set visited
        wasHere[elem.x][elem.y] = true;
        steps.push(elem);

        // Get all neighbours
        let neighbours = getPathNeighbours(maze, elem.x, elem.y);

        // For every neighbours
        for(let n of neighbours) {
            if(wasHere[n.x][n.y] === true) continue; // Continue, if already visited

            n.distance = elem.distance + 1; // Increase distance (depth of iteration)
            n.heuristic = getDistance(n.x, n.y); // Set heuristic
            n.parent = elem; // Set current node as parent
            queue.enq(n); // Enqueue them
        }

    }
}

function getAStar(m, s, e) {
    maze = m;
    steps = [];
    end = e;
    wasHere = [];
    path = [];
    for (let i = 0; i < m.length; i++) {
        wasHere[i] = [];
        for (let j = 0; j < m[i].length; j++) {
            wasHere[i][j] = false;
        }
    }

    // Initialize PriorityQueue
    queue = new PriorityQueue(function(a, b) {
        // Best distance + heuristic is at the front
        return (b.distance + b.heuristic) - (a.distance + a.heuristic);
    });

    // Enqueue first element (starting node)
    let h = getDistance(s[0], s[1]);
    queue.enq({x: s[0], y: s[1], distance: 0, heuristic: h, parent: null});

    aStar(); // Start search

    // Remove starting--node from steps
    steps.shift();

    // Return values
    return {
        steps: steps,
        path: path
    };
}

export { getAStar };