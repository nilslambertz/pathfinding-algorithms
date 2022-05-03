import React from "react";

interface NavBarProps {
  algorithmList: string[];
  currentAlgorithm: string;
  setAlgorithm: (algorithm: string) => void;
  animationRunning: boolean;
}

function NavBar({
  algorithmList,
  currentAlgorithm,
  setAlgorithm,
  animationRunning,
}: NavBarProps) {
  function changeAlgorithm(algo: string) {
    if (animationRunning) return;

    setAlgorithm(algo);
  }

  return (
    <div className="w-full select-none h-20 border-b flex flex-row flex-wrap justify-center items-center gap-10">
      {algorithmList.map(function (algorithm) {
        return (
          <button
            key={algorithm}
            className={
              "text-2xl text-gray-300 hover:text-white cursor-pointer transition-all disabled:opacity-10 disabled:cursor-default disabled:hover:text-gray-300 " +
              (currentAlgorithm === algorithm ? "!text-white underline" : "")
            }
            disabled={animationRunning && algorithm !== currentAlgorithm}
            onClick={() => changeAlgorithm(algorithm)}
          >
            {algorithm}
          </button>
        );
      })}
    </div>
  );
}

export default NavBar;
