<template lang="pug">
  .list-wrapper
    pref-item(label='Theme')
      RadioGroup(slot='content' type='button' size='large'
        :value='configs.themeStyle'
        @on-change='(v) => configChangeHandler("themeStyle", v)')
        Radio(label='dark') Dark
        Radio(label='light') Light

    pref-item(label='Start delay (ms)')
      Slider(slot='content' size='large' show-input :step="100"
        :max='configs.maxStartDelay'
        :min='configs.minStartDelay'
        :value='configs.startDelay'
        @on-change='(v) => configChangeHandler("startDelay", v)')

    pref-item(label='Threshold of auto archiving')
      Slider(slot='content' size='large' show-input
        :max='configs.maxSessionSolves'
        :min='configs.minSessionSolves'
        :value='configs.autoArchiveSessionThreshold'
        @on-change='(v) => configChangeHandler("autoArchiveSessionThreshold", v)')

    pref-item(label='Confirm when auto archiving')
      i-switch(slot='content' size='large'
        :value='configs.needAutoArchiveHint'
        @on-change='(v) => configChangeHandler("needAutoArchiveHint", v)')
        span(slot='open') ON
        span(slot='close') OFF
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import PrefItem from "./PrefItem";

  export default {
    name: 'prefs-list',
    components: { PrefItem },
    computed: {
      ...mapGetters({
        configs: 'allConfigs',
      }),
    },
    methods: {
      ...mapActions([
        'updateConfig',
      ]),
      configChangeHandler(name, value) {
        this.updateConfig({ name, value });
      },
    },
  };
</script>


<style lang='scss' scoped>
</style>
