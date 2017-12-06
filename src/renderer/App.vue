<template>
  <div id="app">
    <the-sidebar></the-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
  import TheSidebar from './components/Common/TheSidebar';

  export default {
    name: 'vuelecube',
    components: { TheSidebar },
  };
</script>

<style>
  /* CSS */
</style>
