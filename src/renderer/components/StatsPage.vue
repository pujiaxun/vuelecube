<template>
  <div class="wrapper">
    <h1>Stats</h1>
  </div>
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
  $bg-color: #262b33;

  .wrapper {
    background-color: $bg-color;
    color: #666;
    width: 100%;
    height: 100vh;
  }
</style>
