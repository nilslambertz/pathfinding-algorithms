import React from "react";
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

            switch (cell) {
              case CellStates.Start:
                className = "bg-red-600 border border-red-600";
                break;
              case CellStates.End:
                className = "bg-red-600 border border-red-600";
                break;
              case CellStates.Wall:
                break;
              case CellStates.Visited:
                className = "bg-orange-500 border border-orange-500";
                break;
              case CellStates.Correct:
                className = "bg-blue-500 border border-blue-500";
                break;
              default: {
                className = "bg-white border border-white";
                const borderCell = cell as CellStateWithBorder;

                if (borderCell.state === CellStates.Visited) {
                  className = "bg-orange-500 border border-orange-500";
                }

                if (borderCell.top) {
                  if (borderCell.top === BorderState.Orange)
                    className += " border-t-orange-500";
                  if (borderCell.top === BorderState.Red)
                    className += " border-t-red-500";
                }
                if (borderCell.left) {
                  if (borderCell.left === BorderState.Orange)
                    className += " border-l-orange-500";
                  if (borderCell.left === BorderState.Red)
                    className += " border-l-red-500";
                }
                if (borderCell.right) {
                  if (borderCell.right === BorderState.Orange)
                    className += " border-r-orange-500";
                  if (borderCell.right === BorderState.Red)
                    className += " border-r-red-500";
                }
                if (borderCell.bottom) {
                  if (borderCell.bottom === BorderState.Orange)
                    className += " border-b-orange-500";
                  if (borderCell.bottom === BorderState.Red)
                    className += " border-b-red-500";
                }
              }
            }

            if (
              coordiatesAreTheSame(start, [rowIndex, colIndex]) ||
              coordiatesAreTheSame(end, [rowIndex, colIndex])
            ) {
              className = "bg-red-600";
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
