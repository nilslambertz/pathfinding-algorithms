import { getPathNeighbours } from "../Utils/Functions";

let steps;
let maze;
let wasHere;
let distance;
let distanceVisited;
let distanceSteps;
let path;
let start;
let end;

function setDistances(x, y, dist) {
    if(x < 0 || y < 0 || x > maze.length-1 || y > maze[0].length - 1) return;
    console.log(x + ":" + y);
    if(distanceVisited[x][y] === true) return;

    distanceVisited[x][y] = true;

    if(maze[x][y] !== 1) {
        if(distanceSteps[dist] === undefined) {
            distanceSteps[dist] = [];
        }
        distance[x][y] = dist;
        distanceSteps[dist].push({x: x, y: y});
    }
    setDistances(x-1, y, dist+1);
    setDistances(x+1, y, dist+1);
    setDistances(x, y-1, dist+1);
    setDistances(x, y+1, dist+1);
}

function getGreedy(m, s, e) {
    maze = m;
    steps = [];
    end = e;
    start = s;
    wasHere = [];
    distanceSteps = [];
    distanceVisited = [];
    path = [];
    distance = [];
    for (let i = 0; i < m.length; i++) {
        wasHere[i] = [];
        distance[i] = [];
        distanceVisited[i] = [];
        for (let j = 0; j < m[i].length; j++) {
            wasHere[i][j] = false;
            distanceVisited[i][j] = false;
            distance[i][j] = -1;
        }
    }
    console.log(distanceVisited);
    setDistances(end[0], end[1], 0);
    //dijkstra(s[0], s[1], 0);

    return {
        steps: steps,
        path: path,
        distance: distanceSteps
    };
}

export { getGreedy };