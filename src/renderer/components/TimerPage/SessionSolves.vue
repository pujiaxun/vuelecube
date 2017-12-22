<template>
  <div class="solve-wrapper">
    <h4>SessionSolves</h4>
    <ul>
      <li v-for="solve in solves" :key="solve._id">
        {{solve.ms | ms2second}}
        <span @click="deleteSolveHandler(solve._id)">X</span>
      </li>
    </ul>
    <Button
      v-if="solves.length >= 3"
      type="success"
      shape="circle"
      long
      @click="archiveSessionHandler">Archive Session</Button>
    <div v-if="solves.length >= 3">We suggest you archive a session every 5 or 12 solves.</div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import utils from '../../utils';

  export default {
    name: 'session-solves',
    computed: {
      ...mapGetters({
        solves: 'allSolves',
        configs: 'allConfigs',
      }),
    },
    methods: {
      ...mapActions([
        'deleteSolve',
        'archiveSession',
      ]),
      deleteSolveHandler(_id) {
        const message = `Are you sure to DELETE this solve?`;
        const buttons = ['Confirm', 'Cancel'];
        this.$electron.remote.dialog.showMessageBox({
          type: 'question',
          message,
          buttons,
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            this.deleteSolve({ _id });
          }
        });
      },
      // TODO: support auto archiving
      archiveSessionHandler() {
        const message = `Are you sure to ARCHIVE this session?`;
        const buttons = ['Confirm', 'Cancel'];
        this.$electron.remote.dialog.showMessageBox({
          type: 'question',
          message,
          buttons,
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            this.archiveSession({ cubeType: this.configs.cubeType });
          }
        });
      },
    },
    filters: {
      ms2second: utils.ms2second,
    },
  };
</script>

<style lang='scss' scoped>
  .solve-wrapper {
    border: 1px dashed red;
  }

  .archive-btn {
    border: 1px dashed #aaa;
    text-align: center;
    cursor: pointer;

    &:hover {
      border: 1px solid #aaa;
    }
  }
</style>
