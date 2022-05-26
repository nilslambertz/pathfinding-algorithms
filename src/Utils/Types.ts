export interface PathElem {
  x: number;
  y: number;
  parent?: PathElem;
  distance?: number;
}

export interface StepsAndCorrectPath {
  steps: StepDetails[];
  correctPath: [number, number][];
}

export interface StepDetails {
  cells: [number, number][];
  nextState: CellState;
  // TODO
}

export type PathfindingAlgorithms = {
  [key in Algorithms]: (
    maze: CellState[][],
    start: [number, number],
    end: [number, number]
  ) => StepsAndCorrectPath;
};

export enum Algorithms {
  aStar = "a*",
  dfs = "dfs",
  dijkstra = "dijkstra",
  greedy = "greedy",
  //  tremaux = "tremaux",
}

export type BorderState = "red" | "orange";
export interface CellStateWithBorder {
  top?: BorderState;
  right?: BorderState;
  bottom?: BorderState;
  left?: BorderState;
}

export enum CellStates {
  Empty,
  Wall,
  Start,
  End,
  Visited,
  Correct,
}

export type CellState =
  | CellStates.Empty
  | CellStates.Wall
  | CellStates.Start
  | CellStates.End
  | CellStates.Visited
  | CellStates.Correct
  | CellStateWithBorder;
