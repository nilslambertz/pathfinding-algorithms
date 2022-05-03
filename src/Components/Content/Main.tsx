import React from "react";
import "./Main.css";
import "./MazeElem.css";

interface MainProps {
  currentAlgorithm: string;
  steps: number;
  solved: boolean;
  maze: number[][];
}

export default function Main({
  currentAlgorithm,
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
          row.map(function (cell: any, colIndex) {
            if (cell === 0) {
              return (
                <div className={"mazeElem empty"} key={rowIndex + colIndex} />
              );
            } else if (cell === 1) {
              return (
                <div className={"mazeElem wall"} key={rowIndex + colIndex} />
              );
            } else if (cell === 2) {
              return (
                <div className={"mazeElem start"} key={rowIndex + colIndex} />
              );
            } else if (cell === 3) {
              return (
                <div className={"mazeElem end"} key={rowIndex + colIndex} />
              );
            } else if (cell === 4) {
              return (
                <div
                  className={"mazeElem searched"}
                  key={rowIndex + colIndex}
                />
              );
            } else if (cell === 5) {
              return (
                <div
                  className={"mazeElem correctPath"}
                  key={rowIndex + colIndex}
                />
              );
            } else {
              let width = "2px solid ";
              let left =
                cell.left > 0 ? (cell.left > 1 ? "red" : "orange") : "none";
              let right =
                cell.right > 0 ? (cell.right > 1 ? "red" : "orange") : "none";
              let top =
                cell.top > 0 ? (cell.top > 1 ? "red" : "orange") : "none";
              let bottom =
                cell.bottom > 0 ? (cell.bottom > 1 ? "red" : "orange") : "none";
              let style = {
                borderBottom: width + bottom,
                borderLeft: width + left,
                borderTop: width + top,
                borderRight: width + right,
              };
              return (
                <div
                  className={"mazeElem empty"}
                  style={style}
                  key={rowIndex + colIndex}
                />
              );
            }
          })
        )}
        <span className="col-span-full flex flex-row items-center justify-center text-white">
          steps: {steps}
        </span>
      </div>
    </div>
  );
}
