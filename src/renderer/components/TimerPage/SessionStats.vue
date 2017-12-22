<template>
  <div class="stats-wrapper">
    <h4>SessionStats</h4>
    <p>PB(personal best): {{pb | ms2second}}</p>
    <p>MEAN(mean of solves): {{mean | ms2second}}</p>
    <p>AVG(except the best and worst): {{avg | ms2second}}</p>
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
        return utils.pb(this.solves);
      },
      mean() {
        return utils.mean(this.solves);
      },
      avg() {
        return utils.avg(this.solves);
      },
    },
    filters: {
      ms2second: utils.ms2second,
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
