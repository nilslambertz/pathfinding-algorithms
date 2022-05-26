import { getPathNeighbours, getPathRecursive } from "../Utils/Functions";
import PriorityQueue from "priorityqueuejs";
import {
  CellState,
  CellStates,
  PathElem,
  StepDetails,
  StepsAndCorrectPath,
} from "../Utils/Types";

interface DijkstraArgs {
  maze: CellState[][];
  start: [number, number];
  end: [number, number];
  steps: StepDetails[];
  correctPath: [number, number][];
}

// Dijkstra's algorithm
function dijkstra({ maze, start, end, steps, correctPath }: DijkstraArgs) {
  const queue = new PriorityQueue(function (a: PathElem, b: PathElem) {
    if (!b.distance || !a.distance) return 0;

    return b.distance - a.distance;
  });
  const visited = maze.map((row) => Array(row.length).fill(false));

  queue.enq({ x: start[0], y: start[1], distance: 0 });

  // While more elements are in the queue
  while (!queue.isEmpty()) {
    let elem = queue.deq(); // Get first element
    if (visited[elem.x][elem.y]) continue; // Continue, if already visisted

    visited[elem.x][elem.y] = true; // Set visisted

    // If at destination
    if (elem.x === end[0] && elem.y === end[1]) {
      correctPath.push(
        ...getPathRecursive(elem).map(
          (coords) => [coords.x, coords.y] as [number, number]
        )
      );
      return;
    }

    steps.push({
      nextState: CellStates.Visited,
      cells: [[elem.x, elem.y]],
    });

    let neighbours = getPathNeighbours(maze, elem.x, elem.y); // Get neighbours

    // For all neighbours
    for (let n of neighbours) {
      if (visited[n.x][n.y] === true) continue; // Continue, if visited

      // Set new distance and current element as parent and enqueue the neighbour
      n.distance = (elem.distance ?? 0) + 1;
      n.parent = elem;
      queue.enq(n);
    }
  }
}

export const getDijkstraSteps = (
  maze: CellState[][],
  start: [number, number],
  end: [number, number]
): StepsAndCorrectPath => {
  const steps: StepDetails[] = [];
  const correctPath: [number, number][] = [];

  dijkstra({ maze, start, end, steps, correctPath });

  return {
    steps,
    correctPath,
  };
};
