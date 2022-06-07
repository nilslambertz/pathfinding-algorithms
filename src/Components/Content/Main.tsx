import React from "react";
import {
  CellColorClasses,
  BorderColorClasses,
  TopBorderColorClasses,
  LeftBorderColorClasses,
  RightBorderColorClasses,
  BottomBorderColorClasses,
} from "../../Utils/CellColors";
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
                className = `${CellColorClasses.Start} border ${BorderColorClasses.Start}`;
              } else {
                className = `${CellColorClasses.End} border ${BorderColorClasses.End}`;
              }
            } else {
              switch (cell) {
                case CellStates.Start:
                  className = `${CellColorClasses.Start} border ${BorderColorClasses.Start}`;
                  break;
                case CellStates.End:
                  className = `${CellColorClasses.End} border ${BorderColorClasses.End}`;
                  break;
                case CellStates.Wall:
                  break;
                case CellStates.Visited:
                  className = `${CellColorClasses.Visited} border ${BorderColorClasses.Visited}`;
                  break;
                case CellStates.Correct:
                  className = `${CellColorClasses.Correct} border ${BorderColorClasses.Correct}`;
                  break;
                default: {
                  className = `${CellColorClasses.Empty} border ${BorderColorClasses.Empty}`;
                  const borderCell = cell as CellStateWithBorder;

                  if (borderCell.state === CellStates.Visited) {
                    className = `${CellColorClasses.Visited} border ${BorderColorClasses.Visited}`;
                  }

                  if (borderCell.top) {
                    if (borderCell.top === BorderState.Orange)
                      className += ` ${TopBorderColorClasses.Orange}`;
                    if (borderCell.top === BorderState.Red)
                      className += ` ${TopBorderColorClasses.Red}`;
                  }
                  if (borderCell.left) {
                    if (borderCell.left === BorderState.Orange)
                      className += ` ${LeftBorderColorClasses.Orange}`;
                    if (borderCell.left === BorderState.Red)
                      className += ` ${LeftBorderColorClasses.Red}`;
                  }
                  if (borderCell.right) {
                    if (borderCell.right === BorderState.Orange)
                      className += ` ${RightBorderColorClasses.Orange}`;
                    if (borderCell.right === BorderState.Red)
                      className += ` ${RightBorderColorClasses.Red}`;
                  }
                  if (borderCell.bottom) {
                    if (borderCell.bottom === BorderState.Orange)
                      className += ` ${BottomBorderColorClasses.Orange}`;
                    if (borderCell.bottom === BorderState.Red)
                      className += ` ${BottomBorderColorClasses.Red}`;
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
