<template>
  <div class="score-wrapper">
    <h4>SessionScores</h4>
    <ul>
      <li v-for="(score, index) in scores" :key="index">
        {{score | scoreFormater}}
        <span @click="onDeleteScore(index)">X</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'session-scores',
    props: {
      scores: Array,
      onDeleteScore: Function,
    },
    data() {
      return {

      };
    },
    filters: {
      scoreFormater(ms) {
        return (ms / 1000).toFixed(2);
      },
    },
  };
</script>

<style lang='scss' scoped>
  .score-wrapper {
    border: 1px dashed red;
  }
</style>
