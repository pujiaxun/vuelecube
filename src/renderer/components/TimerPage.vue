<template>
  <div class="timer-wrapper">
    <div class="left-wrapper">
      <stop-watch
        :on-done="appendScores"
      />
      <session-stats
        :scores="copyScores()"
      />
    </div>
    <div class="right-wrapper">
      <session-scores
        :scores="copyScores()"
        :on-delete-score="deleteScoreAt"
      />
    </div>
  </div>
</template>

<script>
  import StopWatch from './TimerPage/StopWatch';
  import SessionStats from './TimerPage/SessionStats';
  import SessionScores from './TimerPage/SessionScores';

  export default {
    name: "timer-page",
    components: { StopWatch, SessionStats, SessionScores },
    data() {
      return {
        scores: [],
      };
    },
    methods: {
      copyScores() {
        return [...this.scores];
      },
      appendScores(score) {
        this.scores.push(score);
      },
      deleteScoreAt(index) {
        const prompt = `Are you sure to DELETE this score?`;
        // HACK: Need replacing by native dialog of OS
        if (confirm(prompt)) {
          this.scores.splice(index, 1);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  $bg-color: #262b33;
  $font-color: #f4f5f5;

  .timer-wrapper {
    padding: 10px 30px;
    background-color: $bg-color;
    color: $font-color;
    width: 100%;
    flex: 1;
    display: flex;
  }

  .left-wrapper {
    flex: 1;
    position: relative;
    flex-direction: column;
    display: flex;
  }

  .right-wrapper {
    width: 200px;
  }
</style>
