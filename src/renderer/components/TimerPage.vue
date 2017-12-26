<template lang="pug">
  .timer-wrapper
    .left-wrapper
      session-settings
      stop-watch
      session-stats
    .right-wrapper
      session-solves
</template>

<script>
  import StopWatch from './TimerPage/StopWatch';
  import SessionStats from './TimerPage/SessionStats';
  import SessionSolves from './TimerPage/SessionSolves';
  import SessionSettings from './TimerPage/SessionSettings';

  export default {
    name: "timer-page",
    components: { StopWatch, SessionStats, SessionSolves, SessionSettings },
  };
</script>

<style lang="scss" scoped>
  .timer-wrapper {
    padding: 10px 30px;
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
