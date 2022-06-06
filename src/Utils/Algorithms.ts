import { getAStarSteps } from "../Algorithms/AStar";
import { getDfsSteps } from "../Algorithms/Dfs";
import { getDijkstraSteps } from "../Algorithms/Dijkstra";
import { getGreedySteps } from "../Algorithms/GreedySearch";
import { getTremauxSteps } from "../Algorithms/Tremaux";
import { Algorithms, PathfindingAlgorithms } from "./Types";

export const algorithms: PathfindingAlgorithms = {
  [Algorithms.aStar]: getAStarSteps,
  [Algorithms.dfs]: getDfsSteps,
  [Algorithms.dijkstra]: getDijkstraSteps,
  [Algorithms.greedy]: getGreedySteps,
  [Algorithms.tremaux]: getTremauxSteps,
};
