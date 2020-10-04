import { getPathNeighbours } from "../Utils/Functions";

let steps;
let maze;
let wasHere;
let cost;
let path;
let start;
let end;

function dijkstra(x, y, c) {
    if(steps[c] === undefined) {
        steps[c] = [];
    }

    cost[x][y] = c;
    steps[c].push({x:x, y:y});
    wasHere[x][y] = true;

    let n = getPathNeighbours(maze, x, y);
    for(let elem of n) {
        if(wasHere[elem.x][elem.y] === false) {
            dijkstra(elem.x, elem.y, c+1);
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
    cost = [];
    for (let i = 0; i < m.length; i++) {
        wasHere[i] = [];
        cost[i] = []
        for (let j = 0; j < m[i].length; j++) {
            wasHere[i][j] = false;
            cost[i][j] = -1;
        }
    }
    dijkstra(s[0], s[1], 0);
    let x = end[0];
    let y = end[1];

    while(x !== start[0] || y !== start[1]) {
        let currectCost = cost[x][y];
        if(x > 0 && cost[x-1][y] < currectCost && cost[x-1][y] !== -1) {
            path.push({x: x-1, y: y});
            x--;
            continue;
        }
        if(x < maze.length-1 && cost[x+1][y] < currectCost && cost[x+1][y] !== -1) {
            path.push({x: x+1, y: y});
            x++;
            continue;
        }
        if(y > 0 && cost[x][y-1] < currectCost && cost[x][y-1] !== -1) {
            path.push({x: x, y: y-1});
            y--;
            continue;
        }
        if(y < maze[0].length-1 && cost[x][y+1] < currectCost && cost[x][y+1] !== -1) {
            path.push({x: x, y: y+1});
            y++;
            continue;
        }
    }
    steps.splice(0,1);
    path.splice(path.length-1,1);

    return {
        steps: steps,
        path: path
    };
}

export { getDijkstra };