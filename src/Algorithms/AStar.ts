import { getPathNeighbours, getPathRecursive } from "../Utils/Functions";
import PriorityQueue from "priorityqueuejs";
import {
  CellState,
  CellStates,
  PathElem,
  StepDetails,
  StepsAndCorrectPath,
} from "../Utils/Types";

interface PathElemWithHeuristic extends PathElem {
  heuristic?: number;
}

// Get heuristic
function getDistance(x: number, y: number, end: [number, number]) {
  return Math.abs(x - end[0]) + Math.abs(y - end[1]);
}

interface AStarArgs {
  maze: CellState[][];
  start: [number, number];
  end: [number, number];
  steps: StepDetails[];
  correctPath: [number, number][];
}

// A*-algorithm
function aStar({ maze, start, end, steps, correctPath }: AStarArgs) {
  const queue = new PriorityQueue(function (
    a: PathElemWithHeuristic,
    b: PathElemWithHeuristic
  ) {
    // Best distance + heuristic is at the front
    return (
      (b.distance ?? 0) +
      (b.heuristic ?? 0) -
      ((a.distance ?? 0) + (a.heuristic ?? 0))
    );
  });
  const visited = maze.map((row) => Array(row.length).fill(false));

  // Enqueue first element (starting node)
  let h = getDistance(start[0], start[1], end);
  queue.enq({ x: start[0], y: start[1], distance: 0, heuristic: h });

  // While PriorityQueue has more elements
  while (!queue.isEmpty()) {
    let elem = queue.deq(); // Get "best" element from queue
    if (visited[elem.x][elem.y] === true) continue; // Continue, if already visisted

    // If at destination
    if (elem.x === end[0] && elem.y === end[1]) {
      correctPath.push(
        ...getPathRecursive(elem).map(
          (coords) => [coords.x, coords.y] as [number, number]
        )
      );
      return;
    }

    // Set visited
    visited[elem.x][elem.y] = true;
    steps.push({
      nextState: CellStates.Visited,
      cells: [[elem.x, elem.y]],
    });

    // Get all neighbours
    let neighbours = getPathNeighbours(
      maze,
      elem.x,
      elem.y
    ) as PathElemWithHeuristic[];

    // For every neighbours
    for (let n of neighbours) {
      if (visited[n.x][n.y] === true) continue; // Continue, if already visited

      n.distance = (elem.distance ?? 0) + 1; // Increase distance (depth of iteration)
      n.heuristic = getDistance(n.x, n.y, end); // Set heuristic
      n.parent = elem; // Set current node as parent
      queue.enq(n); // Enqueue them
    }
  }
}

export const getAStarSteps = (
  maze: CellState[][],
  start: [number, number],
  end: [number, number]
): StepsAndCorrectPath => {
  const steps: StepDetails[] = [];
  const correctPath: [number, number][] = [];

  aStar({
    maze,
    start,
    end,
    steps,
    correctPath,
  });

  return {
    steps,
    correctPath,
  };
};
