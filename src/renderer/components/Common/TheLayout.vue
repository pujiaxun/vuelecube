<template lang="pug">
  .layout(:class='configs.themeStyle + "-theme-layout"')
    the-side-menu
    .layout-content
      transition(name='fade' mode='out-in')
        router-view
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import TheSideMenu from "./TheSideMenu";

  export default {
    components: { TheSideMenu },
    computed: mapGetters({
      configs: 'allConfigs',
    }),
    created() {
      this.getConfigs();
    },
    methods: {
      ...mapActions([
        'getConfigs',
      ]),
    },
  };
</script>

<style lang='scss' scoped>
  .layout {
    position: relative;
    overflow: hidden;
    display: flex;
  }

  .layout-content {
    flex: 1;
  }
</style>
