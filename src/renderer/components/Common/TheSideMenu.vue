<template>
  <div class="layout-menu">
    <Menu
      theme="dark"
      :active-name="menus[0].name"
      :style="menuStyle"
      @on-select="onSelectHandler"
    >
      <div class="layout-logo-left" @click="toggleClick">Vuelecube</div>
      <MenuItem v-for="menu in menus" :key="menu.name" :name="menu.name">
          <span class="menu-icon-container" :style="iconStyle">
            <Icon class="menu-icon" :type="menu.icon" :size="iconSize"></Icon>
          </span>
          <transition name="fade">
            <span class="menu-text" v-if='isExpending'>{{menu.title}}</span>
          </transition>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isExpending: false,
        menus: [
          { title: 'Timer', name: 'timer', icon: 'speedometer' },
          { title: 'Stats', name: 'stats', icon: 'stats-bars' },
          { title: 'Tutorial', name: 'tutorial', icon: 'map' },
          { title: 'Preferences', name: 'preferences', icon: 'gear-a' },
        ],
      };
    },
    computed: {
      iconSize() {
        return this.isExpending ? 14 : 50;
      },
      menuStyle() {
        return { width: this.isExpending ? '160px' : '100px' };
      },
      iconStyle() {
        return { width: `${this.iconSize}px` };
      },
    },
    methods: {
      toggleClick() {
        this.isExpending = !this.isExpending;
      },
      onSelectHandler(name) {
        this.$router.push(name);
      },
    },
  };
</script>

<style lang='scss' scoped>
  .layout-logo-left {
    width: 90%;
    height: 30px;
    line-height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    cursor: pointer;
    text-align: center;
  }

  .layout-menu {
    height: 100vh;
    user-select: none;
    background: #464c5b;
  }

  .ivu-menu {
    transition: width 0.3s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
  }

  .menu-icon-container {
    display: inline-block;
    text-align: center;
    transition: width 0.3s ease-in-out;
  }

  .menu-icon {
    transition: font-size 0.3s ease-in-out;
  }
</style>
