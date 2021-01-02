import { getPathNeighbours } from "../Utils/Functions";

let PriorityQueue = require('priorityqueuejs');

let steps;
let maze;
let wasHere;
let queue;
let path;
let start;
let end;

function dijkstra() {
    while(!queue.isEmpty()) {
        let elem = queue.deq();

        if(wasHere[elem.x][elem.y] === true) continue;
        wasHere[elem.x][elem.y] = true;
        if(steps[elem.distance] === undefined) steps[elem.distance] = [];
        steps[elem.distance].push(elem);

        if(elem.x === end[0] && elem.y === end[1]) {
            do {
                path.push(elem);
            } while((elem = elem.parent) !== null);
            return;
        }

        let neighbours = getPathNeighbours(maze, elem.x, elem.y);
        for(let n of neighbours) {
            if(wasHere[n.x][n.y] === true) continue;

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
    start = s;
    wasHere = [];
    path = [];
    for (let i = 0; i < m.length; i++) {
        wasHere[i] = [];
        for (let j = 0; j < m[i].length; j++) {
            wasHere[i][j] = false;
        }
    }

    queue = new PriorityQueue(function(a, b) {
        return b.distance - a.distance;
    });

    queue.enq({x: s[0], y: s[1], distance: 0, parent: null});

    dijkstra();

    steps.shift();
    steps[steps.length-1].pop();
    path.shift();
    path.pop();

    return {
        steps: steps,
        path: path
    };
}

export { getDijkstra };