<template>
  <div class="score-wrapper">
    <h4>SessionScores</h4>
    <ul>
      <li v-for="score in scores" :key="score._id">
        {{score.ms | scoreFormater}}
        <span @click="onDeleteScore(score._id)">X</span>
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
