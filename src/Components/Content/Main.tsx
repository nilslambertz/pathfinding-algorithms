import React from "react";
import { CellColors } from "../../Utils/CellColors";
import { coordiatesAreTheSame } from "../../Utils/Functions";
import {
  BorderState,
  CellState,
  CellStates,
  CellStateWithBorder,
} from "../../Utils/Types";
import "./Main.css";

interface MainProps {
  currentAlgorithm: string;
  transitionClass: string;
  steps: number;
  solved: boolean;
  start: [number, number];
  end: [number, number];
  maze: CellState[][];
}

export default function Main({
  currentAlgorithm,
  transitionClass,
  start,
  end,
  steps,
  solved,
  maze,
}: MainProps) {
  let className = "transition";
  if (currentAlgorithm === "tremaux") {
    className = "noTransition";
  }
  if (solved === true) className += " solved";
  return (
    <div className={"w-full p-1 flex flex-row justify-center " + className}>
      <div
        id="mazeGrid"
        className="p-3 pb-0 bg-black bg-opacity-30 grid justify-center"
      >
        {maze.map((row, rowIndex) =>
          row.map(function (cell: CellState, colIndex) {
            const key = rowIndex + "-" + colIndex;
            let className = "";

            if (
              coordiatesAreTheSame(start, [rowIndex, colIndex]) ||
              coordiatesAreTheSame(end, [rowIndex, colIndex])
            ) {
              if (coordiatesAreTheSame(start, [rowIndex, colIndex])) {
                className = `bg-${CellColors.Start} border border-${CellColors.Start}`;
              } else {
                className = `bg-${CellColors.End} border border-${CellColors.End}`;
              }
            } else {
              switch (cell) {
                case CellStates.Start:
                  className = `bg-${CellColors.Start} border border-${CellColors.Start}`;
                  break;
                case CellStates.End:
                  className = `bg-${CellColors.End} border border-${CellColors.End}`;
                  break;
                case CellStates.Wall:
                  break;
                case CellStates.Visited:
                  className = `bg-${CellColors.Visited} border border-${CellColors.Visited}`;
                  break;
                case CellStates.Correct:
                  className = `bg-${CellColors.Correct} border border-${CellColors.Correct}`;
                  break;
                default: {
                  className = `bg-${CellColors.Empty} border border-${CellColors.Empty}`;
                  const borderCell = cell as CellStateWithBorder;

                  if (borderCell.state === CellStates.Visited) {
                    className = `bg-${CellColors.Visited} border border-${CellColors.Visited}`;
                  }

                  if (borderCell.top) {
                    if (borderCell.top === BorderState.Orange)
                      className += ` border-t-${CellColors.OrangeBorder}`;
                    if (borderCell.top === BorderState.Red)
                      className += ` border-t-${CellColors.RedBorder}`;
                  }
                  if (borderCell.left) {
                    if (borderCell.left === BorderState.Orange)
                      className += ` border-l-${CellColors.OrangeBorder}`;
                    if (borderCell.left === BorderState.Red)
                      className += ` border-l-${CellColors.RedBorder}`;
                  }
                  if (borderCell.right) {
                    if (borderCell.right === BorderState.Orange)
                      className += ` border-r-${CellColors.OrangeBorder}`;
                    if (borderCell.right === BorderState.Red)
                      className += ` border-r-${CellColors.RedBorder}`;
                  }
                  if (borderCell.bottom) {
                    if (borderCell.bottom === BorderState.Orange)
                      className += ` border-b-${CellColors.OrangeBorder}`;
                    if (borderCell.bottom === BorderState.Red)
                      className += ` border-b-${CellColors.RedBorder}`;
                  }
                }
              }
            }

            return (
              <div className={transitionClass + " " + className} key={key} />
            );
          })
        )}
        <span className="col-span-full flex flex-row items-center justify-center text-white">
          steps: {steps}
        </span>
      </div>
    </div>
  );
}
