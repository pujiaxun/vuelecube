// TODO: separate functions to different files.
// TODO: redesign algorithm with the importing of dnf and pop

const mean = (solves) => {
  if (solves.length === 0) {
    return 0;
  }
  return solves.reduce((a, b) => a + b.ms, 0) / solves.length;
};

const avg = (solves) => {
  if (solves.length < 3) {
    return 0;
  }
  const mSolves = solves.map(solve => solve.ms);
  const total = mSolves.reduce((a, b) => a + b, 0);
  const min = Math.min(...mSolves);
  const max = Math.max(...mSolves);

  return (total - min - max) / (mSolves.length - 2);
};

const pb = (solves) => {
  if (solves.length === 0) {
    return 0;
  }
  return Math.min(...solves.map(solve => solve.ms));
};

const ms2second = ms => (ms / 1000).toFixed(2);

export default {
  mean,
  avg,
  pb,
  ms2second,
  // ...
};
