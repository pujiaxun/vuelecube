<template>
  <Row class="pref-item-row">
    <i-col span="12" class="pref-label">{{ label }}</i-col>
    <i-col span="12" class="pref-content"><slot name="content"></slot></i-col>
  </Row>
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
