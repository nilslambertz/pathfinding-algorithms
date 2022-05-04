import { getPathNeighbours } from "../Utils/Functions";
import {
  CellState,
  CellStates,
  StepDetails,
  StepsAndCorrectPath,
} from "../Utils/Types";

interface DfsArgs {
  maze: CellState[][];
  start: [number, number];
  end: [number, number];
  visited: boolean[][];
  steps: StepDetails[];
  currentStep: [number, number][];
  x: number;
  y: number;
  correctPath: [number, number][];
}

function dfs({
  maze,
  visited,
  steps,
  currentStep,
  start,
  end,
  x,
  y,
  correctPath,
}: DfsArgs) {
  // If at the destination, return true
  if (x === end[0] && y === end[1]) return true;

  // If already visited, start new step-iteration
  if (visited[x][y] === true) {
    steps.push({
      nextState: CellStates.Visited,
      cells: [...currentStep],
    });
    currentStep.splice(0);
    return false;
  }

  // Adding current node to steps and marking it as visited
  currentStep.push([x, y]);
  visited[x][y] = true;

  // Get neighbours
  let n = getPathNeighbours(maze, x, y);

  // If at junction, start new "step" after this one
  if (n.length > 2) {
    steps.push({
      nextState: CellStates.Visited,
      cells: [...currentStep],
    });
    currentStep.splice(0);
  }

  // For every neighbour
  for (let i = 0; i < n.length; i++) {
    // Call dfs recursively, if we found the destination we push current node to path and return true
    if (
      dfs({
        maze,
        visited,
        steps,
        currentStep,
        start,
        end,
        x: n[i].x,
        y: n[i].y,
        correctPath,
      }) === true
    ) {
      correctPath.push([x, y]);
      return true;
    }
  }

  // Not correct path
  return false;
}

export const getDfsSteps = (
  maze: CellState[][],
  start: [number, number],
  end: [number, number]
): StepsAndCorrectPath => {
  const visited = maze.map((row) => Array(row.length).fill(false));
  const steps: StepDetails[] = [];
  const correctPath: [number, number][] = [];

  dfs({
    maze,
    visited,
    steps,
    currentStep: [],
    start,
    end,
    x: start[0],
    y: start[1],
    correctPath,
  });

  return {
    steps,
    correctPath,
  };
};
