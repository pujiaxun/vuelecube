// TODO: need unit testing

// filter out dnfs and compute plus2
const solvesFilter = solves => solves
  .filter(s => !s.dnf)
  .map(s => (s.ms + (s.plus2 ? 2000 : 0)));

const worstTime = (solves) => {
  const times = solvesFilter(solves);
  return times.length && Math.max(...times);
};

const bestTime = (solves) => {
  const times = solvesFilter(solves);
  return times.length && Math.min(...times);
};

const mean = (solves) => {
  const times = solvesFilter(solves);
  return times.length && times.reduce((a, b) => a + b, 0) / times.length;
};

const stdDev = (solves) => {
  const times = solvesFilter(solves);
  if (times.length === 0) return 0;
  const meanOfSolves = mean(solves);
  const devSum = times.reduce((a, b) => a + ((b - meanOfSolves) ** 2), 0);
  return Math.sqrt(devSum / times.length);
};

const avg = (solves) => {
  if (solves.length < 3) {
    return 0;
  }

  const times = solvesFilter(solves);
  const dnfCount = solves.length - times.length;
  const total = times.reduce((a, b) => a + b, 0);
  const min = Math.min(...times);
  let res;

  if (dnfCount > 1) {
    res = Number.POSITIVE_INFINITY;
  } else if (dnfCount === 1) {
    res = (total - min) / (times.length - 1);
  } else {
    const max = Math.max(...times);
    res = (total - min - max) / (times.length - 2);
  }
  return res;
};

const solvedCount = solves => solves.filter(s => !s.dnf).length;

const ms2time = (ms) => {
  const seconds = ms / 1000;
  const s = (seconds % 60).toFixed(2);
  const m = Math.floor(seconds / 60);
  return m > 0 ? `${m}'${s}` : s;
};

export default {
  bestTime,
  worstTime,
  solvedCount,
  mean,
  stdDev,
  avg,
  ms2time,
  // ...
};
