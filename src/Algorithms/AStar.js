import { getPathNeighbours } from "../Utils/Functions";

let PriorityQueue = require('priorityqueuejs');

let steps;
let maze;
let wasHere;
let queue;
let path;
let start;
let end;

function getDistance(x, y) {
    return Math.abs(x - end[0]) + Math.abs(y - end[1]);
}

function aStar() {
    while(!queue.isEmpty()) {
        let elem = queue.deq();

        if(wasHere[elem.x][elem.y] === true) continue;
        wasHere[elem.x][elem.y] = true;
        steps.push(elem);

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
            n.heuristic = getDistance(n.x, n.y);
            n.parent = elem;
            queue.enq(n);
        }

    }
}

function getAStar(m, s, e) {
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
        return (b.distance + b.heuristic) - (a.distance + a.heuristic);
    });

    let h = getDistance(s[0], s[1]);
    queue.enq({x: s[0], y: s[1], distance: 0, heuristic: h, parent: null});

    aStar();

    steps.shift();
    steps.pop();
    path.shift();
    path.pop();

    console.log(path);

    return {
        steps: steps,
        path: path
    };
}

export { getAStar };