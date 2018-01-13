<template lang="pug">
  .watch-wrapper
    p Timing Status: {{ timingStatus }}
    p ms: {{ ms }}
    RadioGroup(v-show='solves.length'
      type='button'
      v-model='lastestSolveStatus'
      @on-change='(v) => updatePenalty(v)')
      Radio(label='OK') OK
      Radio(label='DNF') DNF
      Radio(label='PLUS2') +2
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import StopWatch from 'timer-stopwatch';

  export default {
    name: "stop-watch",
    computed: mapGetters({
      scramble: 'currentScramble',
      configs: 'allConfigs',
      solves: 'allSolves',
    }),
    data() {
      return {
        timingStatus: 'READY',
        theStopwatch: new StopWatch(),
        statusTimeout: null,
        lastestSolveStatus: 'OK',
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
        'updateSolve',
      ]),
      keyupHandler(e) {
        // READY -> HOLDING(>=n seconds) -> FIRE -> TIMING -> READY
        // READY -> HOLDING(<n seconds) -> READY
        e.preventDefault();
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
            this.lastestSolveStatus = 'OK';
            this.updateScramble({ cubeType });
          }
        }
      },
      keydownHandler(e) {
        e.preventDefault();
        const HOLDING_TO_FIRE = this.configs.startDelay;
        const FIRE_KEY_CODE = this.configs.fireKeyCode;
        if (e.keyCode === FIRE_KEY_CODE && this.timingStatus === 'READY') {
          this.timingStatus = 'HOLDING';
          this.statusTimeout = setTimeout(() => {
            this.timingStatus = 'FIRE';
          }, HOLDING_TO_FIRE);
        }
      },
      updatePenalty(status) {
        const count = this.solves.length;
        const lastestSolve = count ? this.solves[count - 1] : null;
        this.lastestSolveStatus = status;
        if (lastestSolve) {
          const newAttrs = {
            dnf: status === 'DNF',
            plus2: status === 'PLUS2',
          };
          this.updateSolve({ _id: lastestSolve._id, newAttrs });
        }
      },
    },
    beforeDestroy() {
      // TODO: watch a STATUS to add/remove keyup/down event listeners
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
