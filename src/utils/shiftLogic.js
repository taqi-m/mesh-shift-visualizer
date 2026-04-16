export const calculateComplexity = (p, q) => {
  const sqrtP = Math.sqrt(p);
  const rowShiftAmount = q % sqrtP;
  const colShiftAmount = Math.floor(q / sqrtP);
  const meshSteps = rowShiftAmount + colShiftAmount;
  const ringSteps = Math.min(q, p - q);

  return {
    rowShiftAmount,
    colShiftAmount,
    meshSteps,
    ringSteps
  };
};

export const generateInitialGrid = (p) => {
  return Array.from({ length: p }, (_, i) => ({
    id: i,
    currentData: i,
    originalData: i,
  }));
};

export const computeStage1 = (grid, p, q) => {
  const sqrtP = Math.sqrt(p);
  const rowShiftAmount = q % sqrtP;
  const newGrid = [...grid];
  const nextData = new Array(p);

  for (let i = 0; i < p; i++) {
    const r = Math.floor(i / sqrtP);
    const c = i % sqrtP;
    
    // Data at (r, c) moves to (r, c')
    const nextC = (c + rowShiftAmount) % sqrtP;
    const targetIdx = r * sqrtP + nextC;
    nextData[targetIdx] = grid[i].currentData;
  }

  for (let i = 0; i < p; i++) {
    newGrid[i] = { ...grid[i], currentData: nextData[i] };
  }

  return newGrid;
};

export const computeStage2 = (grid, p, q) => {
  const sqrtP = Math.sqrt(p);
  const colShiftAmount = Math.floor(q / sqrtP);
  const newGrid = [...grid];
  const nextData = new Array(p);

  for (let i = 0; i < p; i++) {
    const r = Math.floor(i / sqrtP);
    const c = i % sqrtP;
    
    // Data at (r, c) moves to (r', c)
    const nextR = (r + colShiftAmount) % sqrtP;
    const targetIdx = nextR * sqrtP + c;
    nextData[targetIdx] = grid[i].currentData;
  }

  for (let i = 0; i < p; i++) {
    newGrid[i] = { ...grid[i], currentData: nextData[i] };
  }

  return newGrid;
};
