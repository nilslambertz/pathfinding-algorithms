export const createMaze = (height, width) => {
    let maze = [];
    for(let i = 0; i < height; i++) {
        maze[i] = [];
        for(let j = 0; j < width; j++) {
            maze[i][j] = 4;
        }
    }

    primsAlgorithm(maze);

    let top = new Array(width).fill(4);
    maze = [top].concat(maze).concat([top]);
    for(let i = 0; i < maze.length; i++) {
        maze[i] = [4].concat(maze[i]).concat([4]);
    }

    return maze;
}

function primsAlgorithm(maze) {
    let walls = new Set();
    let firstX = Math.floor(Math.random() * maze.length);
    if(firstX % 2 === 1) firstX--;
    let firstY = Math.floor(Math.random() * maze[0].length);
    if(firstY % 2 === 1) firstY--;
    addWalls(firstX,firstY, walls, maze);
    maze[firstX][firstY] = 0;
    while(walls.size > 0) {
        let random = getRandomItem(walls);
        let x = parseInt(random.substring(0, random.indexOf(",")));
        let y = parseInt(random.substring(random.indexOf(",") + 1));
        let neighbours = getNeighbours(x, y, maze);
        let randomNeighbour = neighbours.splice(Math.floor(Math.random() * neighbours.length), 1)[0];
        createPath(x, y, randomNeighbour[0], randomNeighbour[1], maze);
        maze[x][y] = 0;
        walls.delete(random);
        addWalls(x, y, walls,maze);
    }
}

function createPath(x1, y1, x2, y2, maze) {
    if(x1 === x2) {
        if(y1 < y2) {
            maze[x1][y1+1] = 0;
        } else {
            maze[x1][y1-1] = 0;
        }
    } else {
        if(x1 < x2) {
            maze[x1+1][y1] = 0;
        } else {
            maze[x1-1][y1] = 0;
        }
    }
}

function getNeighbours(x,y, maze) {
    let neighbours = [];
    if(x-2 >= 0 && maze[x-2][y] === 0) {
        neighbours.push([x-2, y]);
    }
    if(x+2 < maze.length && maze[x+2][y] === 0) {
        neighbours.push([x+2, y]);
    }
    if(y-2 >= 0 && maze[x][y-2] === 0) {
        neighbours.push([x, y-2]);
    }
    if(y+2 < maze[0].length && maze[x][y+2] === 0) {
        neighbours.push([x, y+2]);
    }
    return neighbours;
}

function addWalls(x,y, walls, maze) {
    if(x-2 >= 0 && maze[x-2][y] !== 0) {
        walls.add((x-2) + "," + y);
    }
    if(x+2 < maze.length && maze[x+2][y] !== 0) {
        walls.add((x+2) + "," + y);
    }
    if(y-2 >= 0 && maze[x][y-2] !== 0) {
        walls.add(x + "," + (y-2));
    }
    if(y+2 < maze[0].length && maze[x][y+2] !== 0) {
        walls.add(x + "," + (y+2));
    }
}

function getRandomItem(set) {
    let items = Array.from(set);
    return items[Math.floor(Math.random() * items.length)];
}