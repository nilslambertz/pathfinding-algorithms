import React from "react";
import { coordiatesAreTheSame } from "../../Utils/Functions";
import { CellState, CellStates } from "../../Utils/Types";
import "./Main.css";
import "./MazeElem.css";

interface MainProps {
  currentAlgorithm: string;
  steps: number;
  solved: boolean;
  start: [number, number];
  end: [number, number];
  maze: CellState[][];
}

export default function Main({
  currentAlgorithm,
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
              case CellStates.Empty:
                className = "bg-white border border-white";
                break;
              case CellStates.Visited:
                className = "bg-orange-500 border border-orange-500";
                break;
              case CellStates.Correct:
                className = "bg-blue-500 border border-blue-500";
            }

            if (
              coordiatesAreTheSame(start, [rowIndex, colIndex]) ||
              coordiatesAreTheSame(end, [rowIndex, colIndex])
            ) {
              className = "bg-red-600";
            }

            return (
              <div className={"transition-colors " + className} key={key} />
            );
            /*
            switch (cell) {
              case CellStates.Wall:
                return <div key={key} />;
              case CellStates.Start:
                return <div className="bg-red-500" key={key} />;
              case CellStates.End:
                return <div className="bg-red-500" key={key} />;
              case CellStates.Visited:
                return <div className="bg-orange-500" key={key} />;
              case CellStates.Correct:
                return <div className="bg-blue-500" key={key} />;
              default: {
                let width = "2px solid ";
                let left =
                  cell.left > 0 ? (cell.left > 1 ? "red" : "orange") : "none";
                let right =
                  cell.right > 0 ? (cell.right > 1 ? "red" : "orange") : "none";
                let top =
                  cell.top > 0 ? (cell.top > 1 ? "red" : "orange") : "none";
                let bottom =
                  cell.bottom > 0
                    ? cell.bottom > 1
                      ? "red"
                      : "orange"
                    : "none";
                let style = {
                  borderBottom: width + bottom,
                  borderLeft: width + left,
                  borderTop: width + top,
                  borderRight: width + right,
                };
                return (
                  <div className={"mazeElem empty"} style={style} key={key} />
                );
              }
            }*/
          })
        )}
        <span className="col-span-full flex flex-row items-center justify-center text-white">
          steps: {steps}
        </span>
      </div>
    </div>
  );
}
