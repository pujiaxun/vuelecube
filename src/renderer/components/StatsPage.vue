<template lang="pug">
  .wrapper
    h1 Stats
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "stats-page",
    computed: mapGetters({
      sessions: 'allSessions',
    }),
    methods: {
      ...mapActions([
        'getSessions',
      ]),
    },
    created() {
      this.getSessions();
    },
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    height: 100vh;
  }
</style>
