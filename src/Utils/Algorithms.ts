import { getDfsSteps } from "../Algorithms/Dfs";
import { getGreedySteps } from "../Algorithms/GreedySearch";
import { Algorithms, PathfindingAlgorithms } from "./Types";

export const algorithms: PathfindingAlgorithms = {
  [Algorithms.aStar]: () => ({}),
  [Algorithms.dfs]: getDfsSteps,
  [Algorithms.dijkstra]: () => ({}),
  [Algorithms.greedy]: getGreedySteps,
  [Algorithms.tremaux]: () => ({}),
};
