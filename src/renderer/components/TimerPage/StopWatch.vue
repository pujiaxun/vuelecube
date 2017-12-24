<template>
  <div class="watch-wrapper">
    <h4>Timer</h4>
    timingStatus: {{timingStatus}}
    ms: {{ms}}
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import StopWatch from 'timer-stopwatch';

  export default {
    name: "stop-watch",
    computed: mapGetters({
      scramble: 'currentScramble',
      configs: 'allConfigs',
    }),
    data() {
      return {
        timingStatus: 'READY',
        theStopwatch: new StopWatch(),
        statusTimeout: null,
        ms: 0,
      };
    },
    created() {
      window.addEventListener('keydown', this.keydownHandler);
      window.addEventListener('keyup', this.keyupHandler);
      this.theStopwatch.onTime((time) => {
        this.ms = time.ms;
      });
    },
    methods: {
      ...mapActions([
        'addNewSolve',
        'updateScramble',
      ]),
      keyupHandler(e) {
        // READY -> HOLDING(>=n seconds) -> FIRE -> TIMING -> READY
        // READY -> HOLDING(<n seconds) -> READY
        const FIRE_KEY_CODE = this.configs.fireKeyCode;
        const { cubeType, needScramble } = this.configs;
        if (e.keyCode === FIRE_KEY_CODE) {
          if (this.timingStatus === 'FIRE') {
            this.theStopwatch.reset();
            this.theStopwatch.start();
            this.timingStatus = 'TIMING';
          } else if (this.timingStatus === 'HOLDING') {
            clearTimeout(this.statusTimeout);
            this.timingStatus = 'READY';
          } else if (this.timingStatus === 'TIMING') {
            this.theStopwatch.stop();
            this.timingStatus = 'READY';
            this.addNewSolve({
              ms: this.ms,
              plus2: false,
              dnf: false,
              scramble: needScramble ? this.scramble : '',
              cubeType,
            });
            this.updateScramble({ cubeType });
          }
        }
      },
      keydownHandler(e) {
        const HOLDING_TO_FIRE = this.configs.startDelay;
        const FIRE_KEY_CODE = this.configs.fireKeyCode;
        if (e.keyCode === FIRE_KEY_CODE && this.timingStatus === 'READY') {
          this.timingStatus = 'HOLDING';
          this.statusTimeout = setTimeout(() => {
            this.timingStatus = 'FIRE';
          }, HOLDING_TO_FIRE);
        }
      },
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.keydownHandler);
      window.removeEventListener('keyup', this.keyupHandler);
    },
  };
</script>


<style lang='scss' scoped>
  .watch-wrapper {
    border: 1px dashed green;
    flex: 1;
  }
</style>
