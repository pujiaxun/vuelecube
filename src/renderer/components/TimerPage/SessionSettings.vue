<template lang="pug">
  .settings-wrapper
    Select(:value='configs.cubeType' @on-change='typeSelectorHandler')
      Option(v-for='t in CUBE_TYPES' :value='t' :key='t') {{ CUBE_TYPES_MAP[t] }}

    i-switch(size='large' :value='configs.needScramble'
      @on-change='scrambleSwitcherHandler')
      span(slot='open') ON
      span(slot='close') OFF

    Button(type='primary' v-show='configs.needScramble' @click='scrambleIt')
      | Scramble

    p(v-show='configs.needScramble') {{ scramble }}
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { CUBE_TYPES, CUBE_TYPES_MAP } from '../../constants/CubeTypes';

  export default {
    name: 'session-settings',
    data() {
      return {
        CUBE_TYPES,
        CUBE_TYPES_MAP,
      };
    },
    computed: mapGetters({
      configs: 'allConfigs',
      scramble: 'currentScramble',
    }),
    methods: {
      ...mapActions([
        'updateScramble',
        'updateConfig',
        'getCurrentSolves',
      ]),
      typeSelectorHandler(cubeType) {
        this.updateConfig({ name: 'cubeType', value: cubeType });
        this.getCurrentSolves({ cubeType });
        this.updateScramble({ cubeType });
      },
      scrambleSwitcherHandler(needScramble) {
        this.updateConfig({ name: 'needScramble', value: needScramble });
      },
      scrambleIt() {
        this.updateScramble({ cubeType: this.configs.cubeType });
      },
    },
  };
</script>


<style lang='scss' scoped>
  .settings-wrapper {
    border: 1px dashed yellow;
    height: 150px;
    width: 100%;
    flex: none;
  }
</style>
