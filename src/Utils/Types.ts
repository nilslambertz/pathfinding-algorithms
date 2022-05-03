export interface PathElem {
  parent?: PathElem;
}

export interface StepDetails {
  x: number;
  y: number;
  nextState: CellState;
  // TODO
}

export type PathfindingAlgorithms = {
  [key in Algorithms]: (maze: CellState[][]) => StepDetails[];
};

export enum Algorithms {
  aStar = "a*",
  dfs = "dfs",
  dijkstra = "dijkstra",
  greedy = "greedy",
  tremaux = "tremaux",
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
}

export type CellState =
  | CellStates.Empty
  | CellStates.Wall
  | CellStates.Start
  | CellStates.End
  | CellStateWithBorder;
