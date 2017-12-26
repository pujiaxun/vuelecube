<template>
  <div class="stats-wrapper">
    <h4>SessionStats</h4>
    <p>PB(personal best): {{pb | ms2time}}</p>
    <p>MEAN(mean of solves): {{mean | ms2time}}(std = {{ stdDev | ms2time }})</p>
    <p>AVG(except the best and worst): {{avg | ms2time}}</p>
  </div>
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
