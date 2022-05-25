import { CellState, CellStates, PathElem } from "./Types";

export const createMaze = (
  height: number,
  width: number,
  perfectMaze: boolean
): {
  maze: CellState[][];
  start: [number, number];
  end: [number, number];
} => {
  let maze: CellState[][] = [];
  for (let i = 0; i < height; i++) {
    maze[i] = [];
    for (let j = 0; j < width; j++) {
      maze[i][j] = CellStates.Wall;
    }
  }

  let walls = primsAlgorithm(maze);

  if (!perfectMaze) {
    let max = 100;
    for (let n = 0; n < max; n++) {
      let elem = getRandomItem(walls);
      let i = parseInt(elem.substring(0, elem.indexOf(",")));
      let j = parseInt(elem.substring(elem.indexOf(",") + 1));

      let neighbours = getPathNeighbours(maze, i, j);
      if (neighbours.length !== 2) continue;

      let x = neighbours[0].x - neighbours[1].x;
      let y = neighbours[0].y - neighbours[1].y;

      if (y === 0) {
        maze[i][j] = CellStates.Empty;
      } else if (x === 0) {
        maze[i][j] = CellStates.Empty;
      }
    }
  }

  let startX = Math.floor(Math.random() * maze.length);
  let startY = Math.floor(Math.random() * maze[0].length);
  while (maze[startX][startY] !== CellStates.Empty) {
    startX = Math.floor(Math.random() * maze.length);
    startY = Math.floor(Math.random() * maze[0].length);
  }
  maze[startX][startY] = CellStates.Start;

  let endX = Math.floor(Math.random() * maze.length);
  let endY = Math.floor(Math.random() * maze[0].length);
  while (maze[endX][endY] !== 0 || (startX === endX && startY === endY)) {
    endX = Math.floor(Math.random() * maze.length);
    endY = Math.floor(Math.random() * maze[0].length);
  }
  maze[endX][endY] = CellStates.End;

  return {
    maze: maze,
    start: [startX, startY],
    end: [endX, endY],
  };
};

function primsAlgorithm(maze: CellState[][]) {
  let remainingWalls = new Set<string>();
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      remainingWalls.add(i + "," + j);
    }
  }

  let walls = new Set<string>();
  let firstX = Math.floor(Math.random() * maze.length);
  if (firstX % 2 === 1) firstX--;
  let firstY = Math.floor(Math.random() * maze[0].length);
  if (firstY % 2 === 1) firstY--;
  addWalls(firstX, firstY, walls, maze);
  maze[firstX][firstY] = CellStates.Empty;
  remainingWalls.delete(firstX + "," + firstY);
  while (walls.size > 0) {
    let random = getRandomItem(walls);
    let x = parseInt(random.substring(0, random.indexOf(",")));
    let y = parseInt(random.substring(random.indexOf(",") + 1));
    let neighbours = getNeighbours(x, y, maze);
    let randomNeighbour = neighbours.splice(
      Math.floor(Math.random() * neighbours.length),
      1
    )[0];
    createPath(
      x,
      y,
      randomNeighbour[0],
      randomNeighbour[1],
      maze,
      remainingWalls
    );
    maze[x][y] = CellStates.Empty;
    remainingWalls.delete(x + "," + y);
    walls.delete(random);
    addWalls(x, y, walls, maze);
  }

  return remainingWalls;
}

function createPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  maze: CellState[][],
  remainingWalls: Set<string>
) {
  if (x1 === x2) {
    if (y1 < y2) {
      maze[x1][y1 + 1] = CellStates.Empty;
      remainingWalls.delete(x1 + "," + (y1 + 1));
    } else {
      maze[x1][y1 - 1] = CellStates.Empty;
      remainingWalls.delete(x1 + "," + (y1 - 1));
    }
  } else {
    if (x1 < x2) {
      maze[x1 + 1][y1] = CellStates.Empty;
      remainingWalls.delete(x1 + 1 + "," + y1);
    } else {
      maze[x1 - 1][y1] = CellStates.Empty;
      remainingWalls.delete(x1 - 1 + "," + y1);
    }
  }
}

function getNeighbours(x: number, y: number, maze: CellState[][]) {
  let neighbours = [];
  if (x - 2 >= 0 && maze[x - 2][y] === CellStates.Empty) {
    neighbours.push([x - 2, y]);
  }
  if (x + 2 < maze.length && maze[x + 2][y] === CellStates.Empty) {
    neighbours.push([x + 2, y]);
  }
  if (y - 2 >= 0 && maze[x][y - 2] === CellStates.Empty) {
    neighbours.push([x, y - 2]);
  }
  if (y + 2 < maze[0].length && maze[x][y + 2] === CellStates.Empty) {
    neighbours.push([x, y + 2]);
  }
  return neighbours;
}

function addWalls(
  x: number,
  y: number,
  walls: Set<string>,
  maze: CellState[][]
) {
  if (x - 2 >= 0 && maze[x - 2][y] !== CellStates.Empty) {
    walls.add(x - 2 + "," + y);
  }
  if (x + 2 < maze.length && maze[x + 2][y] !== CellStates.Empty) {
    walls.add(x + 2 + "," + y);
  }
  if (y - 2 >= 0 && maze[x][y - 2] !== CellStates.Empty) {
    walls.add(x + "," + (y - 2));
  }
  if (y + 2 < maze[0].length && maze[x][y + 2] !== CellStates.Empty) {
    walls.add(x + "," + (y + 2));
  }
}

function getRandomItem(set: Set<string>) {
  let items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}

export const getPathNeighbours = (
  maze: CellState[][],
  x: number,
  y: number
): PathElem[] => {
  let n = [];

  if (x > 0 && maze[x - 1][y] !== CellStates.Wall) {
    n.push({
      x: x - 1,
      y: y,
    });
  }
  if (x < maze.length - 1 && maze[x + 1][y] !== CellStates.Wall) {
    n.push({
      x: x + 1,
      y: y,
    });
  }
  if (y > 0 && maze[x][y - 1] !== CellStates.Wall) {
    n.push({
      x: x,
      y: y - 1,
    });
  }
  if (y < maze[0].length - 1 && maze[x][y + 1] !== CellStates.Wall) {
    n.push({
      x: x,
      y: y + 1,
    });
  }
  return n;
};

export function getPathRecursive(elem: PathElem) {
  let path = [];
  let tmp: PathElem | undefined = elem;

  // Until element before starting node is reached
  while ((tmp = tmp?.parent)?.parent) {
    path.push(tmp); // Push element to path
  }
  return path;
}

export const coordiatesAreTheSame = (
  first: [number, number],
  second: [number, number]
): boolean => {
  return first[0] === second[0] && first[1] === second[1];
};
