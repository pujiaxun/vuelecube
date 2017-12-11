<template>
  <div class="timer-wrapper">
    <div class="left-wrapper">
      <stop-watch
        :on-done="addNewScore"
      />
      <session-stats
        :scores="scores"
      />
    </div>
    <div class="right-wrapper">
      <session-scores
        :scores="scores"
        :on-delete-score="deleteScoreHandler"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import StopWatch from './TimerPage/StopWatch';
  import SessionStats from './TimerPage/SessionStats';
  import SessionScores from './TimerPage/SessionScores';

  export default {
    name: "timer-page",
    components: { StopWatch, SessionStats, SessionScores },
    computed: mapGetters({
      scores: 'allScores',
    }),
    created() {
      this.getCurrentScores();
    },
    methods: {
      ...mapActions([
        'getCurrentScores',
        'addNewScore',
        'deleteScore',
      ]),
      deleteScoreHandler(_id) {
        const message = `Are you sure to DELETE this score?`;
        const buttons = ['Confirm', 'Cancel'];
        this.$electron.remote.dialog.showMessageBox({
          type: 'question',
          message,
          buttons,
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            this.deleteScore({ _id });
          }
        });
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
