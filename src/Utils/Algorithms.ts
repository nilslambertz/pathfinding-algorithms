import { getAStarSteps } from "../Algorithms/AStar";
import { getDfsSteps } from "../Algorithms/Dfs";
import { getGreedySteps } from "../Algorithms/GreedySearch";
import { Algorithms, PathfindingAlgorithms } from "./Types";

export const algorithms: PathfindingAlgorithms = {
  [Algorithms.aStar]: getAStarSteps,
  [Algorithms.dfs]: getDfsSteps,
  [Algorithms.dijkstra]: () => ({}),
  [Algorithms.greedy]: getGreedySteps,
  [Algorithms.tremaux]: () => ({}),
};
