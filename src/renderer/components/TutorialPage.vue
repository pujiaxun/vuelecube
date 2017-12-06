<template>
  <div>
    <h1>Tutorial</h1>
    <p>{{mes}}</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "tutorial-page",
  data() {
    return {
      mes: "233",
    };
  },
};
</script>
