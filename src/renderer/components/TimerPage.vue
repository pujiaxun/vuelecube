<template>
  <div class="timer-wrapper">
    <div class="left-wrapper">
      <session-settings />
      <stop-watch />
      <session-stats/>
    </div>
    <div class="right-wrapper">
      <session-solves />
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
      configs: 'allConfigs',
    }),
    created() {
      this.getCurrentSolves();
      this.getConfigs();
    },
    methods: {
      ...mapActions([
        'getCurrentSolves',
        'getConfigs',
      ]),
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
