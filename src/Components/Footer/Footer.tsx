import React from "react";

export default function Footer() {
  return (
    <div className="absolute bottom-2 select-none text-gray-400 w-full text-xl flex flex-row justify-center items-center gap-2">
      by
      <a
        href="http://www.nilslambertz.de"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-white"
      >
        nils lambertz
      </a>
      -
      <a
        href="https://github.com/nilslambertz/MazeVisualizer"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-white"
      >
        source code
      </a>
    </div>
  );
}
