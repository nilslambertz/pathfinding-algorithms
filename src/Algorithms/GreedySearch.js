import { getPathNeighbours } from "../Utils/Functions";

let steps;
let maze;
let wasHere;
let stack;
let path;
let start;
let end;

function getDistance(x, y) {
    return Math.abs(x - end[0]) + Math.abs(y - end[1]);
}

function greedySearch() {
    while(stack.length !== 0) {
        let elem = stack.pop();

        if(wasHere[elem.x][elem.y]) continue;

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
            n.distance = getDistance(n.x, n.y);
            n.parent = elem;
        }
        neighbours.sort(function(a, b) {
            return b.distance - a.distance;
        });

        for(let n of neighbours) {
            stack.push(n);
        }
    }
}


function getGreedy(m, s, e) {
    maze = m;
    steps = [];
    end = e;
    start = s;
    wasHere = [];
    stack = [];
    path = [];
    for (let i = 0; i < m.length; i++) {
        wasHere[i] = [];
        for (let j = 0; j < m[i].length; j++) {
            wasHere[i][j] = false;
        }
    }
    stack.push({x: s[0], y: s[1], parent: null});

    greedySearch();
    steps.shift();
    steps.pop();
    path.shift();
    path.pop();
    return {
        steps: steps,
        path: path
    };
}

export { getGreedy };