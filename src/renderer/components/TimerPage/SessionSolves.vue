<template>
  <div class="solve-wrapper">
    <h4>SessionSolves</h4>
    <ul>
      <li v-for="solve in solves" :key="solve._id">
        {{solve.ms | solveFormater}}
        <span @click="onDeleteSolve(solve._id)">X</span>
      </li>
    </ul>
    <div v-if="solves.length >= 3" class="archive-btn" @click="onArchiveSession">Archive Session</div>
    <div v-if="solves.length >= 3">We suggest you archive a session every 5 or 12 solves.</div>
  </div>
</template>

<script>
  export default {
    name: 'session-solves',
    props: {
      solves: Array,
      onDeleteSolve: Function,
      onArchiveSession: Function,
    },
    filters: {
      solveFormater(ms) {
        return (ms / 1000).toFixed(2);
      },
    },
  };
</script>

<style lang='scss' scoped>
  .solve-wrapper {
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
