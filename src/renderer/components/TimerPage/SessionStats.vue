<template>
  <div class="stats-wrapper">
    <h4>SessionStats</h4>
    <p>PB(personal best): {{pb | scoreFormater}}</p>
    <p>MEAN(mean of scores): {{mean | scoreFormater}}</p>
    <p>AVG(except the best and worst): {{avg | scoreFormater}}</p>
  </div>
</template>

<script>
  export default {
    name: 'session-stats',
    props: {
      scores: Array,
    },
    computed: {
      pb() {
        if (this.scores.length === 0) {
          return 0;
        }
        return Math.min(...this.scores);
      },
      mean() {
        if (this.scores.length === 0) {
          return 0;
        }
        return this.scores.reduce((a, b) => a + b, 0) / this.scores.length;
      },
      avg() {
        if (this.scores.length < 3) {
          return 0;
        }
        const total = this.scores.reduce((a, b) => a + b, 0);
        const min = Math.min(...this.scores);
        const max = Math.max(...this.scores);

        return (total - min - max) / (this.scores.length - 2);
      },
    },
    filters: {
      scoreFormater(ms) {
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
