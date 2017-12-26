<template lang="pug">
  .pref-wrapper
    about-me
    prefs-list
</template>

<script>
  import AboutMe from './PreferencesPage/AboutMe';
  import PrefsList from './PreferencesPage/PrefsList';

  export default {
    name: "preferences-page",
    components: { AboutMe, PrefsList },
    data() {
      return {
      };
    },
  };
</script>

<style lang="scss" scoped>
  .pref-wrapper {
    padding: 10px 30px;
    width: 100%;
  }
</style>
