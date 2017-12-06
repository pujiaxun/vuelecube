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

<style lang='scss'>
  html, body, #app {
    height: 100%;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    /* TODO: add more fonts and a pretty fallback */
    font-family: 'Hiragino Sans GB';
  }

  #app {
    display: flex;
  }
</style>
