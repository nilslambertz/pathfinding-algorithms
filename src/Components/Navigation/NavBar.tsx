import React from "react";
import { algorithms } from "../../Utils/Algorithms";
import { Algorithms } from "../../Utils/Types";

interface NavBarProps {
  currentAlgorithm: string;
  setAlgorithm: (algorithm: Algorithms) => void;
  animationRunning: boolean;
}

function NavBar({
  currentAlgorithm,
  setAlgorithm,
  animationRunning,
}: NavBarProps) {
  function changeAlgorithm(algo: Algorithms) {
    if (animationRunning) return;

    setAlgorithm(algo);
  }

  return (
    <div className="w-full select-none h-20 border-b flex flex-row flex-wrap justify-center items-center gap-10">
      {Object.keys(algorithms).map((algorithm) => {
        return (
          <button
            key={algorithm}
            className={
              "text-2xl text-gray-300 hover:text-white cursor-pointer transition-all disabled:opacity-10 disabled:cursor-default disabled:hover:text-gray-300 " +
              (currentAlgorithm === algorithm ? "!text-white underline" : "")
            }
            disabled={animationRunning && algorithm !== currentAlgorithm}
            onClick={() => changeAlgorithm(algorithm as Algorithms)}
          >
            {algorithm}
          </button>
        );
      })}
    </div>
  );
}

export default NavBar;
