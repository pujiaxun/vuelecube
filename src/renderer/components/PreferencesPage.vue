<template>
  <div>
    <h1>Preferences</h1>
    <p>{{mes}}</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "preferences-page",
  data() {
    return {
      mes: "233",
    };
  },
};
</script>
