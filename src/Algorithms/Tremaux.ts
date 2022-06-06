import { getPathNeighbours } from "../Utils/Functions";
import {
  BorderState,
  CellState,
  CellStates,
  CellStateWithBorder,
  PathElem,
  StepDetails,
  StepsAndCorrectPath,
} from "../Utils/Types";

// Returns, if we already visisted this junction
function neverBeenHere(
  marks: CellStateWithBorder[][],
  neighbours: PathElem[],
  currX: number,
  currY: number,
  ignoreX: number,
  ignoreY: number
) {
  // For all neighbours
  for (let elem of neighbours) {
    // If marks at entry of neighbour-path are not 0, return false
    if (
      getMarks(marks, currX, currY, elem.x, elem.y) > 0 &&
      (elem.x !== ignoreX || elem.y !== ignoreY)
    ) {
      return false;
    }
  }
  // We didn't visit this junction before, return true
  return true;
}

// Gets marks between two nodes
function getMarks(
  marks: CellStateWithBorder[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  let curr = marks[x1][y1];
  if (x2 < x1) {
    return curr.top ?? 0;
  } else {
    if (x1 < x2) {
      return curr.bottom ?? 0;
    } else {
      if (y2 < y1) {
        return curr.left ?? 0;
      } else {
        return curr.right ?? 0;
      }
    }
  }
}

// Sets mark between two nodes
function mark(
  marks: CellStateWithBorder[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  let curr = marks[x1][y1];
  let from = marks[x2][y2];
  if (x2 < x1) {
    curr.top = (curr.top ?? 0) + 1;
    from.bottom = (from.bottom ?? 0) + 1;
  } else {
    if (x1 < x2) {
      curr.bottom = (curr.bottom ?? 0) + 1;
      from.top = (from.top ?? 0) + 1;
    } else {
      if (y2 < y1) {
        curr.left = (curr.left ?? 0) + 1;
        from.right = (from.right ?? 0) + 1;
      } else {
        curr.right = (curr.right ?? 0) + 1;
        from.left = (from.left ?? 0) + 1;
      }
    }
  }
}

// Marks exit node before junction and updates steps
function markJunctionEnter(
  steps: StepDetails[],
  marks: CellStateWithBorder[][],
  lastX: number,
  lastY: number,
  x: number,
  y: number
) {
  mark(marks, lastX, lastY, x, y); // Mark exit of last path

  // Push mark to steps
  steps.push({
    cells: [[lastX, lastY]],
    nextState: { ...marks[lastX][lastY] },
    clearPreviousStep: true,
  });

  // Add current junction to steps
  steps.push({
    cells: [[x, y]],
    nextState: CellStates.Visited,
    clearPreviousStep: true,
  });
}

interface TremauxArgs {
  maze: CellState[][];
  start: [number, number];
  end: [number, number];
}

interface TremauxResult {
  found: boolean;
  steps: StepDetails[];
  lastX?: number;
  lastY?: number;
  marks?: CellStateWithBorder[][];
}

// Tremaux-algorithm
function tremaux({ maze, start, end }: TremauxArgs): TremauxResult {
  let found = false; // If we found the exit

  const steps: StepDetails[] = [];
  const marks: CellStateWithBorder[][] = maze.map((row) =>
    Array.from({ length: row.length }, Object)
  );

  let x = start[0];
  let y = start[1];

  let lastX = -1;
  let lastY = -1;

  // While not found
  while (!found) {
    let n = getPathNeighbours(maze, x, y); // Get neighbours

    // If at the starting-node
    if (lastX === -1 && lastY === -1) {
      // Get random neighbour
      let rand = Math.floor(Math.random() * n.length);
      let next = n[rand];

      // If we are at a junction
      if (n.length > 2) {
        mark(marks, next.x, next.y, x, y); // Mark entry

        // Push junction to steps
        steps.push({
          cells: [[x, y]],
          nextState: CellStates.Visited,
          clearPreviousStep: true,
        });

        // Push marked-coordiantes and markCount to steps
        steps.push({
          cells: [[next.x, next.y]],
          nextState: { ...marks[next.x][next.y] },
          clearPreviousStep: true,
        });
      } else {
        // If not at junction, push current element
        steps.push({
          cells: [[x, y]],
          nextState: CellStates.Visited,
          clearPreviousStep: true,
        });
      }

      // Set current coordinates to last and next to current
      lastX = x;
      lastY = y;
      x = next.x;
      y = next.y;
    } else if (n.length > 2) {
      // If not at starting node and at junction (more than 2 neighbours)

      // Mark exit node before junction
      markJunctionEnter(steps, marks, lastX, lastY, x, y);

      // If never been here
      if (neverBeenHere(marks, n, x, y, lastX, lastY)) {
        // Find node where we were in the step before
        let removeIndex = -1;
        for (let i = 0; i < n.length; i++) {
          if (n[i].x === lastX && n[i].y === lastY) removeIndex = i;
        }
        n.splice(removeIndex, 1); // Remove the node from neighbours

        // Choose random neighbour as next node and mark entry
        let rand = Math.floor(Math.random() * n.length);
        let next = n[rand];

        // If next node is also a junction, don't mark entry (will be done in next step)
        if (getPathNeighbours(maze, next.x, next.y).length < 3) {
          mark(marks, next.x, next.y, x, y);
        }

        // Set last and next node
        lastX = x;
        lastY = y;
        x = next.x;
        y = next.y;

        // Push marked entry to steps
        steps.push({
          cells: [[next.x, next.y]],
          nextState: { ...marks[next.x][next.y] },
          clearPreviousStep: true,
        });
      } else {
        // If we have been at this junction before

        // If last node currently has one mark, enter it
        if (getMarks(marks, x, y, lastX, lastY) === BorderState.Orange) {
          mark(marks, lastX, lastY, x, y); // Mark node again

          // Set last and next node
          let tempX = lastX;
          lastX = x;
          x = tempX;

          let tempY = lastY;
          lastY = y;
          y = tempY;

          // Push marked entry to steps
          steps.push({
            cells: [[lastX, lastY]],
            nextState: { ...marks[lastX][lastY] },
            clearPreviousStep: true,
          });
        } else {
          // If last node already has two marks

          // Find node with lowest number of marks
          let minMarks = 2;
          let minElem = undefined;
          let temp = null;
          for (let i = 0; i < n.length; i++) {
            if ((temp = getMarks(marks, n[i].x, n[i].y, x, y)) < minMarks) {
              minElem = n[i];
              minMarks = temp;
            }
          }

          // If every node has 2 marks, an error has occurred
          if (minMarks > 1 || minElem === undefined) {
            console.log(
              "Error, all nodes at junction " +
                x +
                ":" +
                y +
                " are already marked twice!"
            );
            return {
              found,
              steps,
            };
          }

          // If next node is also a junction, don't mark entry (will be done in next step)
          if (getPathNeighbours(maze, minElem.x, minElem.y).length < 3) {
            mark(marks, minElem.x, minElem.y, x, y); // Mark entry to next path
          }

          // Set last and next node
          lastX = x;
          lastY = y;
          x = minElem.x;
          y = minElem.y;

          // Push marked entry to steps
          steps.push({
            cells: [[minElem.x, minElem.y]],
            nextState: { ...marks[minElem.x][minElem.y] },
            clearPreviousStep: true,
          });
        }
      }
    } else if (n.length === 2) {
      // If inside a path (exactly two neighbours)

      // Push current position to steps
      steps.push({
        cells: [[x, y]],
        nextState: CellStates.Visited,
        clearPreviousStep: true,
      });

      // Chose next neighbour (the one we didn't come from)
      for (let elem of n) {
        if (elem.x !== lastX || elem.y !== lastY) {
          // Set last and next node
          lastX = x;
          lastY = y;
          x = elem.x;
          y = elem.y;
          break;
        }
      }
    } else if (n.length === 1) {
      // If at the end of one path (exactly one neighbour)

      // Push current position to steps
      steps.push({
        cells: [[x, y]],
        nextState: CellStates.Visited,
        clearPreviousStep: true,
      });

      // Set last and next node (the one we came from)
      lastX = x;
      lastY = y;
      x = n[0].x;
      y = n[0].y;
    } else {
      // If number of neighbours is lower than 1, shouldn't happen
      console.log("Error, no neighbours found");
      return {
        found,
        steps,
        lastX,
        lastY,
        marks,
      };
    }

    // If we found our destination
    if (x === end[0] && y === end[1]) {
      found = true;
    }
  }
  return {
    found,
    steps,
    lastX,
    lastY,
    marks,
  };
}

export const getTremauxSteps = (
  maze: CellState[][],
  start: [number, number],
  end: [number, number]
): StepsAndCorrectPath => {
  let { found, steps, lastX, lastY, marks } = tremaux({ maze, start, end }); // Start search

  const correctPath: [number, number][] = [];

  // If an error occured
  if (
    !found ||
    lastX === undefined ||
    lastY === undefined ||
    !marks ||
    !steps
  ) {
    console.log("Error, Tremaux didn't find destination!");
    return {
      steps: [],
      correctPath,
    };
  }

  // Set current node to last before destination and last to destination
  let x = lastX;
  let y = lastY;
  lastX = end[0];
  lastY = end[1];

  // While we are not at our starting node
  while (x !== start[0] || y !== start[1]) {
    if (x === lastX && y === lastY) {
      break;
    }

    // Push current node to path
    correctPath.push([x, y]);

    let n = getPathNeighbours(maze, x, y); // Get neighbours

    // If inside path (exactly two neighbours)
    if (n.length === 2) {
      // Choose the neighbour where we haven't been in the last step
      for (let elem of n) {
        if (elem.x !== lastX || elem.y !== lastY) {
          lastX = x;
          lastY = y;
          x = elem.x;
          y = elem.y;
          break;
        }
      }
    } else {
      if (n.length === 1) {
        console.log("Error while getting path");
        return {
          steps: [],
          correctPath,
        };
      }

      // If at junction

      for (let elem of n) {
        let numberOfMarks = getMarks(marks, x, y, elem.x, elem.y); // Get marks

        // Choose the neighbour with exactly one mark and where we haven't been in last step
        if (numberOfMarks === 1 && (elem.x !== lastX || elem.y !== lastY)) {
          lastX = x;
          lastY = y;
          x = elem.x;
          y = elem.y;
          break;
        }
      }
    }
  }

  // Return values
  return {
    steps,
    correctPath,
  };
};
