import React, { useEffect, useState } from "react";
import Main from "./Components/Content/Main";
import NavBar from "./Components/Navigation/NavBar";
import SettingsBar from "./Components/Settings/SettingsBar";
import { createMaze } from "./Utils/Functions";
import { Algorithms, CellState, CellStates, StepDetails } from "./Utils/Types";
import { algorithms } from "./Utils/Algorithms";
import Footer from "./Components/Footer/Footer";

const NUMBER_OF_COLS = 151;
const NUMBER_OF_ROWS = 75;

export default function App() {
  const [maze, setMaze] = useState<CellState[][]>([]);
  const [, setInitialMaze] = useState<CellState[][]>([]);
  const [start, setStart] = useState<[number, number]>([-1, -1]);
  const [end, setEnd] = useState<[number, number]>([-1, -1]);
  const [solved, setSolved] = useState(false);

  const [stepsGenerated, setStepsGenerated] = useState(false);
  const [, setPath] = useState<[number, number][]>([]);
  const [, setSteps] = useState<StepDetails[]>([]);
  const [, setTotalNumberOfSteps] = useState(0);
  const [, setCurrentStep] = useState<StepDetails | undefined>();

  const [algorithm, setAlgorithm] = useState(Algorithms.aStar);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [perfectMaze, setPerfectMaze] = useState(false);

  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timer>();
  const [animationRunning, setAnimationRunning] = useState(false);

  const [numberOfSteps, setNumberOfSteps] = useState(0);
  const [, setExecutionTime] = useState(0);

  useEffect(() => {
    createNewMaze();
  }, []);

  useEffect(() => {
    resetValues();
  }, [algorithm]);

  const resetValues = () => {
    setInitialMaze((init) => {
      setMaze(init?.map((row) => [...row]));

      return init;
    });

    setStepsGenerated(false);
    setSteps([]);
    setCurrentStep(undefined);
    setPath([]);

    setNumberOfSteps(0);
    setSolved(false);
    setTotalNumberOfSteps(0);
    setExecutionTime(0);
  };

  const changeAlgorithm = (algo: Algorithms) => {
    if (animationRunning) return;

    setAlgorithm(algo);
    resetValues();
  };

  const changeSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (animationRunning) return;

    let newSpeed = parseInt(event.target.value);
    setAnimationSpeed(newSpeed);
  };

  const togglePerfectMaze = () => {
    if (animationRunning) return;

    setPerfectMaze(!perfectMaze);
  };

  const createNewMaze = () => {
    if (animationRunning) return;

    let {
      maze: newMaze,
      start,
      end,
    } = createMaze(NUMBER_OF_ROWS, NUMBER_OF_COLS, perfectMaze);

    setInitialMaze(newMaze);
    setMaze(newMaze);

    setStart(start);
    setEnd(end);

    resetValues();
  };

  const endAnimation = (removeHighlights?: boolean) => {
    setAnimationInterval((interval) => {
      if (interval) clearInterval(interval);
      return undefined;
    });

    if (removeHighlights) {
      setCurrentStep(undefined);
    }

    setAnimationRunning(false);
  };

  const animationStep = () => {
    setSteps((currentSteps) => {
      const newSteps = [...currentSteps];
      const nextStep = newSteps.shift();

      if (nextStep) {
        setMaze((prevMaze) => {
          const newMaze = prevMaze?.map((row) => [...row]);

          if (newMaze) {
            nextStep.cells.forEach(([x, y]) => {
              newMaze[x][y] = nextStep.nextState;
            });

            setNumberOfSteps((n) => n + 1);
            setCurrentStep(nextStep);

            if (newSteps.length === 0) {
              setPath((currentPath) => {
                for (let pathStep of currentPath) {
                  newMaze[pathStep[0]][pathStep[1]] = CellStates.Correct;
                }

                endAnimation(true);
                setSolved(true);

                return [];
              });
            }
          }

          return newMaze;
        });
      }

      return newSteps;
    });
  };

  const toggleAnimationRunning = () => {
    if (solved) return;

    const running = !animationRunning;
    setAnimationRunning(running);

    if (running) {
      if (!stepsGenerated) {
        const startTime = performance.now();
        const { steps: stepArr, correctPath } = algorithms[algorithm](
          maze,
          start,
          end
        );
        const endTime = performance.now();

        const timeElapsed = endTime - startTime;
        setExecutionTime(timeElapsed);
        setTotalNumberOfSteps(stepArr?.length ?? 0);

        setSteps(stepArr);
        setStepsGenerated(true);

        setPath(correctPath);
      }

      setAnimationInterval(setInterval(animationStep, 505 - animationSpeed));
    } else {
      if (animationInterval) {
        endAnimation();
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-green-700 bg-opacity-70">
      <NavBar
        currentAlgorithm={algorithm}
        animationRunning={animationRunning}
        setAlgorithm={changeAlgorithm}
      />
      <SettingsBar
        animationRunning={animationRunning}
        animationSpeed={animationSpeed}
        newMazeClick={createNewMaze}
        animationClick={toggleAnimationRunning}
        changeSpeed={changeSpeed}
        perfectMaze={perfectMaze}
        setPerfectMaze={togglePerfectMaze}
      />
      <Main
        maze={maze}
        start={start}
        end={end}
        currentAlgorithm={algorithm}
        steps={numberOfSteps}
        solved={solved}
      />
      <Footer></Footer>
    </div>
  );
}
