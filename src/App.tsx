import React, { useEffect, useState } from "react";
import Main from "./Components/Content/Main";
import NavBar from "./Components/Navigation/NavBar";
import SettingsBar from "./Components/Settings/SettingsBar";
import Animation from "./Utils/Animation";
import { createMaze } from "./Utils/Functions";
import "./App.css";
import { Algorithms, CellState, StepDetails } from "./Utils/Types";
import { algorithms } from "./Utils/Algorithms";
import Footer from "./Components/Footer/Footer";

const NUMBER_OF_COLS = 151;
const NUMBER_OF_ROWS = 75;

export default function App() {
  const [maze, setMaze] = useState<CellState[][]>([]);
  const [initialMaze, setInitialMaze] = useState<CellState[][]>([]);
  const [start, setStart] = useState<[number, number]>();
  const [end, setEnd] = useState<[number, number]>();
  const [solved, setSolved] = useState(false);

  const [stepsGenerated, setStepsGenerated] = useState(false);
  const [, setSteps] = useState<StepDetails[]>([]);
  const [totalNumberOfSteps, setTotalNumberOfSteps] = useState(0);
  const [currentStep, setCurrentStep] = useState<StepDetails | undefined>();

  const [algorithm, setAlgorithm] = useState(Algorithms.aStar);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [perfectMaze, setPerfectMaze] = useState(false);

  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timer>();
  const [animationRunning, setAnimationRunning] = useState(false);

  const [numberOfSteps, setNumberOfSteps] = useState(0);
  const [executionTime, setExecutionTime] = useState(0);

  useEffect(() => {
    createNewMaze();
  }, []);

  useEffect(() => {
    resetValues();
  }, [algorithm]);

  const resetValues = () => {
    setMaze(initialMaze?.map((row) => [...row]));

    setStepsGenerated(false);
    setSteps([]);
    setCurrentStep(undefined);

    setNumberOfSteps(0);
    setSolved(false);
    setTotalNumberOfSteps(0);
    setExecutionTime(0);
  };

  const changeAlgorithm = (algo: Algorithms) => {
    if (animationRunning) return;

    setAlgorithm(algo);
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

    let { maze, start, end } = createMaze(
      NUMBER_OF_ROWS,
      NUMBER_OF_COLS,
      perfectMaze
    );

    setMaze(maze);

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
            newMaze[nextStep.y][nextStep.x] = nextStep.nextState;

            setNumberOfSteps((n) => n + 1);
            setCurrentStep(nextStep);

            if (newSteps.length === 0) {
              endAnimation(true);
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
        const start = performance.now();
        const steps = algorithms[algorithm](maze);
        const end = performance.now();

        const timeElapsed = end - start;
        setExecutionTime(timeElapsed);
        setTotalNumberOfSteps(steps.length);

        setSteps(steps);
        setStepsGenerated(true);
      }

      setAnimationInterval(setInterval(animationStep, 505 - animationSpeed));
    } else {
      if (animationInterval) {
        endAnimation();
      }
    }
  };

  return (
    <div className="App">
      <NavBar
        currentAlgorithm={algorithm}
        animationRunning={animationRunning}
        setAlgorithm={setAlgorithm}
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
        currentAlgorithm={algorithm}
        steps={numberOfSteps}
        solved={solved}
      />
      <Footer></Footer>
    </div>
  );
}
