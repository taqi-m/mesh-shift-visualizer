import React from 'react';
import { calculateComplexity } from '../utils/shiftLogic';

const ComplexityPanel = ({ p, q }) => {
  const { rowShiftAmount, colShiftAmount, meshSteps, ringSteps } = calculateComplexity(p, q);
  
  const maxSteps = Math.max(meshSteps, ringSteps, 1);
  const meshPercent = (meshSteps / maxSteps) * 100;
  const ringPercent = (ringSteps / maxSteps) * 100;

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 w-full max-w-sm flex flex-col gap-5">
      <h2 className="text-xl font-bold text-slate-100 border-b border-slate-700 pb-2">Complexity Analysis</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-1">Row Shift</div>
          <div className="text-xl font-bold text-blue-400">{rowShiftAmount}</div>
          <div className="text-xs text-slate-500 mt-1">q mod √p</div>
        </div>
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-1">Col Shift</div>
          <div className="text-xl font-bold text-indigo-400">{colShiftAmount}</div>
          <div className="text-xs text-slate-500 mt-1">⌊q / √p⌋</div>
        </div>
      </div>

      <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-4">
        <h3 className="text-sm font-semibold text-slate-300">Communication Steps Comparison</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-sm text-slate-300">Mesh Topology</span>
            <span className="text-lg font-bold text-emerald-400">{meshSteps}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5">
            <div 
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${meshPercent}%` }}
            ></div>
          </div>
          <div className="text-xs text-slate-500">rowShift + colShift</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-sm text-slate-300">Ring Topology</span>
            <span className="text-lg font-bold text-rose-400">{ringSteps}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5">
            <div 
              className="bg-rose-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${ringPercent}%` }}
            ></div>
          </div>
          <div className="text-xs text-slate-500">min(q, p-q)</div>
        </div>
      </div>
      
      <div className="text-sm text-slate-400 italic">
        {meshSteps < ringSteps ? (
          <p className="text-emerald-400">Mesh outperforms Ring by {ringSteps - meshSteps} steps.</p>
        ) : meshSteps > ringSteps ? (
          <p className="text-rose-400">Ring outperforms Mesh by {meshSteps - ringSteps} steps.</p>
        ) : (
          <p className="text-slate-300">Both topologies require the same steps.</p>
        )}
      </div>
    </div>
  );
};

export default ComplexityPanel;
