import React from 'react';

const ControlPanel = ({ 
  p, setP, 
  q, setQ, 
  stage, setStage, 
  onReset,
  onNextStage
}) => {

  const handlePChange = (e) => {
    const newP = parseInt(e.target.value);
    setP(newP);
    if (q >= newP) {
      setQ(1);
    }
    // Automatically reset when P changes
    onReset();
  };

  const handleQChange = (e) => {
    let newQ = parseInt(e.target.value);
    if (isNaN(newQ)) newQ = 1;
    if (newQ < 1) newQ = 1;
    if (newQ >= p) newQ = p - 1;
    setQ(newQ);
    onReset();
  };

  const isSquare = (num) => Math.sqrt(num) % 1 === 0;

  const validPs = [4, 9, 16, 25, 36, 49, 64];

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 w-full max-w-sm flex flex-col gap-6">
      <h2 className="text-xl font-bold text-slate-100 border-b border-slate-700 pb-2">Configuration</h2>
      
      <div className="space-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-300">Nodes (p) - Perfect Square</span>
          <select 
            value={p} 
            onChange={handlePChange}
            className="bg-slate-900 border border-slate-600 rounded-lg p-2 text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            {validPs.map(val => (
              <option key={val} value={val}>{val} ({Math.sqrt(val)}x{Math.sqrt(val)})</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-300">Shift Amount (q): {q}</span>
          <input 
            type="range" 
            min={1} 
            max={p - 1} 
            value={q} 
            onChange={handleQChange}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>1</span>
            <span>{p - 1}</span>
          </div>
        </label>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-300">Current State:</span>
          <span className="font-semibold px-2 py-1 bg-slate-700 rounded text-blue-300">
            {stage === 0 ? "Initial" : stage === 1 ? "After Row Shift" : "Final (Col Shift)"}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={onNextStage}
            disabled={stage >= 2}
            className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {stage === 0 ? "Run Stage 1" 
             : stage === 1 ? "Run Stage 2" 
             : "Finished"}
          </button>
          <button 
            onClick={onReset}
            disabled={stage === 0}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-slate-200 font-medium rounded-lg transition-colors border border-slate-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
