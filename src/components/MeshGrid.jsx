import React, { useEffect, useState } from 'react';

const MeshGrid = ({ p, grid, stage, prevGrid, q }) => {
  const sqrtP = Math.sqrt(p);
  const percentSpan = 100 / sqrtP;

  const [arrows, setArrows] = useState([]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (stage === 1 || stage === 2) {
      // Calculate shifts for arrows
      const newArrows = [];
      for (let i = 0; i < p; i++) {
        // Find where this node's previous data went
        const oldData = prevGrid[i].currentData;
        const newIndex = grid.findIndex(n => n.currentData === oldData);
        if (newIndex !== -1 && newIndex !== i) {
          fetchCoordsAndAddArrow(i, newIndex, newArrows);
        }
      }
      setArrows(newArrows);
      setAnimating(true);

      const timer = setTimeout(() => {
        setAnimating(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setArrows([]);
      setAnimating(false);
    }
  }, [stage, grid, prevGrid, p]);

  const fetchCoordsAndAddArrow = (sourceIdx, targetIdx, newArrows) => {
    const sR = Math.floor(sourceIdx / sqrtP);
    const sC = sourceIdx % sqrtP;
    const tR = Math.floor(targetIdx / sqrtP);
    const tC = targetIdx % sqrtP;

    // Center of cells in %
    const startX = sC * percentSpan + (percentSpan / 2);
    const startY = sR * percentSpan + (percentSpan / 2);
    let endX = tC * percentSpan + (percentSpan / 2);
    let endY = tR * percentSpan + (percentSpan / 2);

    // Arrow adjusting so it doesn't cover the number exactly
    // We add a little gap. But for simplicity, we just draw with pointer-events-none.
    newArrows.push({
      key: `${sourceIdx}-${targetIdx}`,
      x1: `${startX}%`,
      y1: `${startY}%`,
      x2: `${endX}%`,
      y2: `${endY}%`,
      isWrap: (Math.abs(sR - tR) > 1 || Math.abs(sC - tC) > 1) // basic wrap detection
    });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 w-full max-w-2xl flex flex-col items-center">
      <h2 className="text-xl font-bold text-slate-100 mb-4 border-b border-slate-700 pb-2 w-full text-center">
        Mesh Topology ({sqrtP}x{sqrtP})
      </h2>
      
      <div className="relative w-full aspect-square max-h-[60vh] bg-slate-900 rounded-lg border-2 border-slate-700 p-2 overflow-hidden">
        
        {/* SVG Arrow Overlay */}
        {animating && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 p-2" >
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>
            {arrows.map(a => (
              <line
                key={a.key}
                x1={a.x1}
                y1={a.y1}
                x2={a.x2}
                y2={a.y2}
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray={a.isWrap ? "5,5" : "none"}
                markerEnd="url(#arrowhead)"
                className="opacity-70 animate-pulse"
              />
            ))}
          </svg>
        )}

        <div 
          className="w-full h-full grid gap-2"
          style={{ gridTemplateColumns: `repeat(${sqrtP}, minmax(0, 1fr))` }}
        >
          {grid.map((node, i) => (
            <div 
              key={node.id}
              className={`relative flex flex-col items-center justify-center rounded-lg border-2 transition-all duration-500
                ${animating ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
                ${node.originalData === node.currentData ? 'bg-slate-800 border-slate-600' : 'bg-slate-700 border-blue-500'}
              `}
            >
              <span className="absolute top-1 left-2 text-[10px] text-slate-400 font-mono">
                N{node.id}
              </span>
              <span className={`text-2xl font-bold transition-opacity duration-300 ${animating ? 'opacity-50' : 'opacity-100'} text-slate-100`}>
                D{node.currentData}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeshGrid;
