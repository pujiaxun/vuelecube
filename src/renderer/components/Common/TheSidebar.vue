<template>
  <div class="wrapper">
    <h1 class="title">V</h1>
    <nav class="side-nav">
      <router-link
        v-for="nav in navs"
        :key="nav.title"
        :to="'/' + nav.title"
        :title="nav.title"
        class="nav-btn">
        <img :src="nav.icon" :alt="nav.title">
      </router-link>
    </nav>
  </div>
</template>

<script>
  import timerIcon from '../../assets/timer.svg';
  import statsIcon from '../../assets/training.svg';
  import tutorialIcon from '../../assets/office.svg';
  import prefIcon from '../../assets/set.svg';

  export default {
    data() {
      return {
        navs: [
          { title: 'timer', icon: timerIcon },
          { title: 'stats', icon: statsIcon },
          { title: 'tutorial', icon: tutorialIcon },
          { title: 'preferences', icon: prefIcon },
        ],
      };
    },
  };
</script>


<style lang='scss' scoped>
  $font-color: #eee;
  $nav-bg-color: #3c4564;
  $active-bg-color: #262b33;

  .wrapper {
    user-select: none;
    width: 120px;
    background-color: $nav-bg-color;
  }

  .title {
    text-align: center;
    color: $active-bg-color;
  }

  .side-nav {
    .nav-btn {
      display: block;
      font-size: 25px;
      height: 60px;
      padding: 30px;
      text-align: center;
      text-decoration: none;
      color: $font-color;

      &:active, &:focus, &:hover {
        color: $font-color;
      }

      &.router-link-active {
        color: $font-color;
        background-color: $active-bg-color;
      }

      img {
        width: 60px;
      }
    }
  }

</style>
