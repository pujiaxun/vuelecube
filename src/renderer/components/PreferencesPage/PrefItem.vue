<template lang="pug">
  Row.pref-item-row
    i-col.pref-label(span='12') {{ label }}
    i-col.pref-content(span='12')
      slot(name='content')
</template>

<script>
  export default {
    name: 'pref-item',
    props: {
      label: String,
    },
  };
</script>


<style lang='scss' scoped>
  .pref-item-row {
    padding: 10px;

    & + & {
      border-top: 1px solid rgba(136, 136, 136, 0.2);
    }

    .pref-label, .pref-content{
      line-height: 40px;
      padding: 0 10px;
    }

    .pref-label {
      font-size: 18px;
    }

  }
</style>
