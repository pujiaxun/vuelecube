<template lang="pug">
  .stats-wrapper
    p PB: {{ pb | ms2time }}
    p MEAN: {{ mean | ms2time }}(std = {{ stdDev | ms2time }})
    p AVG:{{ avg | ms2time }}
</template>

<script>
  import { mapGetters } from 'vuex';
  import utils from '../../utils';

  export default {
    name: 'session-stats',
    computed: {
      ...mapGetters({
        solves: 'allSolves',
      }),
      pb() {
        return utils.bestTime(this.solves);
      },
      mean() {
        return utils.mean(this.solves);
      },
      avg() {
        return utils.avg(this.solves);
      },
      stdDev() {
        return utils.stdDev(this.solves);
      },
    },
    filters: {
      ms2time: utils.ms2time,
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
