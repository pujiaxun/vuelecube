<template>
  <div class="solve-wrapper">
    <h4>SessionSolves</h4>
    <ul>
      <li v-for="solve in solves" :key="solve._id">
        {{solve.ms | ms2second}}
        <span @click="onDeleteSolve(solve._id)">X</span>
      </li>
    </ul>
    <Button
      v-if="solves.length >= 3"
      type="success"
      long
      @click="onArchiveSession">Archive Session</Button>
    <div v-if="solves.length >= 3">We suggest you archive a session every 5 or 12 solves.</div>
  </div>
</template>

<script>
  import utils from '../../utils';

  export default {
    name: 'session-solves',
    props: {
      solves: Array,
      onDeleteSolve: Function,
      onArchiveSession: Function,
    },
    filters: {
      ms2second: utils.ms2second,
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
