import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel';
import ComplexityPanel from './components/ComplexityPanel';
import MeshGrid from './components/MeshGrid';
import { generateInitialGrid, computeStage1, computeStage2 } from './utils/shiftLogic';

function App() {
  const [p, setP] = useState(16);
  const [q, setQ] = useState(1);
  const [stage, setStage] = useState(0); // 0: init, 1: after row, 2: after col
  
  const [grid, setGrid] = useState([]);
  const [prevGrid, setPrevGrid] = useState([]);

  useEffect(() => {
    // Initialize
    const initGrid = generateInitialGrid(p);
    setGrid(initGrid);
    setPrevGrid(initGrid);
    setStage(0);
  }, [p]);

  const handleReset = () => {
    const initGrid = generateInitialGrid(p);
    setGrid(initGrid);
    setPrevGrid(initGrid);
    setStage(0);
  };

  const handleNextStage = () => {
    if (stage === 0) {
      setPrevGrid(grid);
      setGrid(computeStage1(grid, p, q));
      setStage(1);
    } else if (stage === 1) {
      setPrevGrid(grid);
      setGrid(computeStage2(grid, p, q));
      setStage(2);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans flex flex-col items-center">
      <header className="mb-8 text-center max-w-2xl">
         <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">
          Mesh Circular Shift Visualizer
        </h1>
        <p className="text-slate-400">
          Interactive simulation of 2-stage circular shift on a √p × √p mesh topology.
        </p>
      </header>

      <main className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl justify-center items-start">
        
        <div className="flex flex-col gap-6 w-full lg:w-auto">
          <ControlPanel 
            p={p} setP={setP} 
            q={q} setQ={setQ} 
            stage={stage} setStage={setStage}
            onReset={handleReset}
            onNextStage={handleNextStage}
          />
          <ComplexityPanel p={p} q={q} />
        </div>

        <div className="flex-1 w-full flex justify-center">
          {grid.length > 0 && (
            <MeshGrid 
              p={p} q={q} 
              grid={grid} prevGrid={prevGrid} 
              stage={stage} 
            />
          )}
        </div>

      </main>
    </div>
  );
}

export default App;
