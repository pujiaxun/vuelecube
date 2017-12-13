<template>
  <div class="layout">
    <the-side-menu />
    <div class="layout-content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import TheSideMenu from "./TheSideMenu";

  export default {
    components: { TheSideMenu },
  };
</script>

<style lang='scss' scoped>
  $bg-color: #262b33;
  .layout {
    background: $bg-color;
    position: relative;
    overflow: hidden;
    display: flex;
  }

  .layout-content {
    flex: 1;
  }
</style>
