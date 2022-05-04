import { getDfsSteps } from "../Algorithms/Dfs";
import { Algorithms, PathfindingAlgorithms } from "./Types";

export const algorithms: PathfindingAlgorithms = {
  [Algorithms.aStar]: () => ({}),
  [Algorithms.dfs]: getDfsSteps,
  [Algorithms.dijkstra]: () => ({}),
  [Algorithms.greedy]: () => ({}),
  [Algorithms.tremaux]: () => ({}),
};
