import React from "react";

interface SettingsBarProps {
  animationRunning: boolean;
  animationSpeed: number;
  newMazeClick: () => void;
  animationClick: () => void;
  changeSpeed: (e: React.ChangeEvent<HTMLInputElement>) => void;
  perfectMaze: boolean;
  setPerfectMaze: (perfectMaze: boolean) => void;
}

function SettingsBar({
  animationRunning,
  animationSpeed,
  newMazeClick,
  animationClick,
  changeSpeed,
  perfectMaze,
  setPerfectMaze,
}: SettingsBarProps) {
  return (
    <div className="p-3 border-b flex flex-row justify-center items-center text-white gap-20 select-none">
      <div
        className={
          "text-2xl w-16 text-center text-shadow hover:text-shadow-blurred cursor-pointer " +
          (animationRunning ? "text-orange-500" : "text-green-300")
        }
        onClick={animationClick}
      >
        {animationRunning ? "stop" : "start"}
      </div>
      <div
        className={
          "text-2xl transition-opacity text-shadow hover:text-shadow-blurred cursor-pointer text-blue-200 " +
          (animationRunning ? "opacity-10" : "")
        }
        onClick={newMazeClick}
      >
        new maze
      </div>
      <div
        className={
          "text-2xl transition-opacity text-shadow hover:text-shadow-blurred cursor-pointer text-blue-200 " +
          (animationRunning ? " opacity-10 " : "") +
          (perfectMaze ? "  text-green-300" : " text-orange-400")
        }
        onClick={() => (!animationRunning ? setPerfectMaze(!perfectMaze) : "")}
      >
        perfect maze: {perfectMaze ? "✅" : "❌"}
      </div>
      <div
        className={
          "flex flex-col gap-2 items-center transition-opacity " +
          (animationRunning ? "opacity-10" : "")
        }
      >
        <input
          type="range"
          min="10"
          max="500"
          value={animationSpeed}
          onChange={changeSpeed}
        />
        <span>animation speed</span>
      </div>
    </div>
  );
}

export default SettingsBar;
