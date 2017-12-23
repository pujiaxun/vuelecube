<template>
  <div class="list-wrapper">
    <pref-item label="Theme">
      <RadioGroup slot="content" type="button" size="large"
        :value="configs.themeStyle"
        @on-change="(v) => configChangeHandler('themeStyle', v)">
        <Radio label="dark">Dark</Radio>
        <Radio label="light">Light</Radio>
      </RadioGroup>
    </pref-item>

    <pref-item label="Start delay (ms)">
      <Slider slot="content" size="large" show-input
        :max="configs.maxStartDelay"
        :min="configs.minStartDelay"
        :value="configs.startDelay"
        :step="100"
        @on-change="(v) => configChangeHandler('startDelay', v)">
      </Slider>
    </pref-item>

    <pref-item label="Auto archive threshold">
      <Slider slot="content" size="large" show-input
        :max="configs.maxSessionSolves"
        :min="configs.minSessionSolves"
        :value="configs.autoArchiveSessionThreshold"
        @on-change="(v) => configChangeHandler('autoArchiveSessionThreshold', v)">
      </Slider>
    </pref-item>

    <pref-item label="Show the hint when auto archiving ">
      <i-switch slot="content" size="large"
        :value="configs.needAutoArchiveHint"
        @on-change="(v) => configChangeHandler('needAutoArchiveHint', v)">
        <span slot="open">ON</span>
        <span slot="close">OFF</span>
      </i-switch>
    </pref-item>

  </div>
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
