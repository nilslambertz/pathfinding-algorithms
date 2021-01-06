import { getPathNeighbours } from "../Utils/Functions";

let PriorityQueue = require('priorityqueuejs'); // Using PriorityQueue

let steps;
let maze;
let wasHere;
let queue;
let path;
let end;

// Dijkstra's algorithm
function dijkstra() {
    // While more elements are in the queue
    while(!queue.isEmpty()) {
        let elem = queue.deq(); // Get first element
        if(wasHere[elem.x][elem.y] === true) continue; // Continue, if already visisted

        wasHere[elem.x][elem.y] = true; // Set visisted

        // If at destination
        if(elem.x === end[0] && elem.y === end[1]) {
            // Iterate over parents and push nodes to path
            do {
                path.push(elem);
            } while((elem = elem.parent) !== null);
            return;
        }

        // Create array if in new step, add current element to step
        if(steps[elem.distance] === undefined) steps[elem.distance] = [];
        steps[elem.distance].push(elem);

        let neighbours = getPathNeighbours(maze, elem.x, elem.y); // Get neighbours

        // For all neighbours
        for(let n of neighbours) {
            if(wasHere[n.x][n.y] === true) continue; // Continue, if visited

            // Set new distance and current element as parent and enqueue the neighbour
            n.distance = elem.distance + 1;
            n.parent = elem;
            queue.enq(n);
        }
    }
}

function getDijkstra(m, s, e) {
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

    // Initialize PriorityQueue, element with smallest distance is at the front
    queue = new PriorityQueue(function(a, b) {
        return b.distance - a.distance;
    });

    queue.enq({x: s[0], y: s[1], distance: 0, parent: null}); // Enqueue first element

    dijkstra(); // Start search

    // Remove starting- and desination-node from path and steps
    steps.shift();
    path.shift();
    path.pop();

    // Return values
    return {
        steps: steps,
        path: path
    };
}

export { getDijkstra };