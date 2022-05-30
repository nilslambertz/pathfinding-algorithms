import { getPathNeighbours, getPathRecursive } from "../Utils/Functions";
import {
  CellState,
  CellStates,
  PathElem,
  StepDetails,
  StepsAndCorrectPath,
} from "../Utils/Types";

interface GreedyArgs {
  maze: CellState[][];
  end: [number, number];
  visited: boolean[][];
  steps: StepDetails[];
  correctPath: [number, number][];
  stack: PathElem[];
}

// Get heuristic
function getDistance(x: number, y: number, end: [number, number]) {
  return Math.abs(x - end[0]) + Math.abs(y - end[1]);
}

// Greedy-best-first-search
function greedySearch({
  maze,
  end,
  visited,
  steps,
  correctPath,
  stack,
}: GreedyArgs) {
  // While elements in stack
  while (stack.length !== 0) {
    let elem = stack.pop(); // Get first element
    if (!elem || (elem && visited[elem.x][elem.y])) continue; // If visited, continue

    // If at destination
    if (elem.x === end[0] && elem.y === end[1]) {
      correctPath.push(
        ...getPathRecursive(elem).map(
          (coords) => [coords.x, coords.y] as [number, number]
        )
      );
      return;
    }

    // Set visited and push elem to steps
    visited[elem.x][elem.y] = true;
    steps.push({
      nextState: CellStates.Visited,
      cells: [[elem.x, elem.y]],
    });

    let neighbours = getPathNeighbours(maze, elem.x, elem.y); // Get neighbours

    // Set distance and parent for all neighbours
    for (let n of neighbours) {
      n.distance = getDistance(n.x, n.y, end);
      n.parent = elem;
    }

    // Sort neighbours
    neighbours.sort(function (a, b) {
      return (b.distance ?? 0) - (a.distance ?? 0);
    });

    // Push sorted list to stack
    for (let n of neighbours) {
      stack.push(n);
    }
  }
}

export const getGreedySteps = (
  maze: CellState[][],
  start: [number, number],
  end: [number, number]
): StepsAndCorrectPath => {
  const visited = maze.map((row) => Array(row.length).fill(false));
  const steps: StepDetails[] = [];
  const correctPath: [number, number][] = [];

  // Push starting-node to stack
  const stack: PathElem[] = [{ x: start[0], y: start[1] }];

  greedySearch({ maze, end, visited, correctPath, stack, steps });

  // Return values
  return {
    steps,
    correctPath,
  };
};
