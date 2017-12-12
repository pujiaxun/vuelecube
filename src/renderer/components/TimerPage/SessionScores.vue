<template>
  <div class="score-wrapper">
    <h4>SessionScores</h4>
    <ul>
      <li v-for="score in scores" :key="score._id">
        {{score.ms | scoreFormater}}
        <span @click="onDeleteScore(score._id)">X</span>
      </li>
    </ul>
    <div v-if="scores.length >= 3" class="archive-btn" @click="onArchiveSession">Archive Session</div>
    <div v-if="scores.length >= 3">We suggest you archive a session every 5 or 12 scores.</div>
  </div>
</template>

<script>
  export default {
    name: 'session-scores',
    props: {
      scores: Array,
      onDeleteScore: Function,
      onArchiveSession: Function,
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

  .archive-btn {
    border: 1px dashed #aaa;
    text-align: center;
    cursor: pointer;

    &:hover {
      border: 1px solid #aaa;
    }
  }
</style>
