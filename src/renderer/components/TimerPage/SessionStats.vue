<template>
  <div class="stats-wrapper">
    <h4>SessionStats</h4>
    <p>PB(personal best): {{pb | solveFormater}}</p>
    <p>MEAN(mean of solves): {{mean | solveFormater}}</p>
    <p>AVG(except the best and worst): {{avg | solveFormater}}</p>
  </div>
</template>

<script>
  export default {
    name: 'session-stats',
    props: {
      solves: Array,
    },
    computed: {
      pb() {
        if (this.solves.length === 0) {
          return 0;
        }
        return Math.min(...this.solves.map(solve => solve.ms));
      },
      mean() {
        if (this.solves.length === 0) {
          return 0;
        }
        return this.solves.reduce((a, b) => a + b.ms, 0) / this.solves.length;
      },
      avg() {
        if (this.solves.length < 3) {
          return 0;
        }
        const mSolves = this.solves.map(solve => solve.ms);
        const total = mSolves.reduce((a, b) => a + b, 0);
        const min = Math.min(...mSolves);
        const max = Math.max(...mSolves);

        return (total - min - max) / (mSolves.length - 2);
      },
    },
    filters: {
      solveFormater(ms) {
        return (ms / 1000).toFixed(2);
      },
    },
  };
</script>


<style lang='scss' scoped>
  .stats-wrapper {
    border: 1px dashed blue;
    height: 200px;
    width: 100%;
    flex: none;
  }
</style>
