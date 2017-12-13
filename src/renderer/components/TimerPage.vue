<template>
  <div class="timer-wrapper">
    <div class="left-wrapper">
      <session-settings />
      <stop-watch
        :on-done="addNewSolve"
      />
      <session-stats
        :solves="solves"
      />
    </div>
    <div class="right-wrapper">
      <session-solves
        :solves="solves"
        :on-delete-solve="deleteSolveHandler"
        :on-archive-session="archiveSessionHandler"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import StopWatch from './TimerPage/StopWatch';
  import SessionStats from './TimerPage/SessionStats';
  import SessionSolves from './TimerPage/SessionSolves';
  import SessionSettings from './TimerPage/SessionSettings';

  export default {
    name: "timer-page",
    components: { StopWatch, SessionStats, SessionSolves, SessionSettings },
    computed: mapGetters({
      solves: 'allSolves',
      cubeType: 'currentCubeType',
    }),
    created() {
      this.getCurrentSolves();
      this.getCurrentCubeType();
    },
    methods: {
      ...mapActions([
        'getCurrentSolves',
        'addNewSolve',
        'deleteSolve',
        'archiveSession',
        'getCurrentCubeType',
        'updateCubeType',
      ]),
      deleteSolveHandler(_id) {
        const message = `Are you sure to DELETE this solve?`;
        const buttons = ['Confirm', 'Cancel'];
        this.$electron.remote.dialog.showMessageBox({
          type: 'question',
          message,
          buttons,
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            this.deleteSolve({ _id });
          }
        });
      },
      // TODO: support different cube types
      // TODO: support auto archiving
      archiveSessionHandler() {
        const message = `Are you sure to ARCHIVE this session?`;
        const buttons = ['Confirm', 'Cancel'];
        this.$electron.remote.dialog.showMessageBox({
          type: 'question',
          message,
          buttons,
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            this.archiveSession();
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
    height: 100vh;
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
