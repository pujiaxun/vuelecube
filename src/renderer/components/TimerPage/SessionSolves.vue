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
      v-if="solves.length >= 3" type="success" long @click="archiveSessionHandler"
    >
      Archive Session
    </Button>
    <Button
      v-if="solves.length > 0" type="warning" long @click="clearSessionHandler"
    >
      Reset Session
    </Button>
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
        'clearSession',
      ]),
      deleteSolveHandler(_id) {
        this.$electron.remote.dialog.showMessageBox({
          type: 'question',
          message: 'Are you sure to delete this solve?',
          buttons: ['Delete', 'Cancel'],
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            this.deleteSolve({ _id });
          }
        });
      },
      // TODO: support auto archiving
      archiveSessionHandler(e) {
        e.target.blur();
        this.$electron.remote.dialog.showMessageBox({
          type: 'question',
          message: 'Do you want to archive current session?',
          buttons: ['Archive', 'Cancel'],
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            this.archivedWithNotice("Archive Success");
          }
        });
      },
      clearSessionHandler(e) {
        e.target.blur();
        this.$electron.remote.dialog.showMessageBox({
          type: 'question',
          message: 'Are you sure to empty current session?',
          buttons: ['Empty', 'Cancel'],
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            this.clearSession({ cubeType: this.configs.cubeType });
          }
        });
      },
      archivedWithNotice(title) {
        this.archiveSession({ cubeType: this.configs.cubeType });
        // FIXME: async with the dispatched action
        this.$Notice.info({
          title,
          desc: 'The current session has been archived.',
        });
      },
    },
    watch: {
      solves() {
        const {
          maxSolvesCount,
          autoArchiveSessionThreshold,
          needAutoArchiveHint,
        } = this.configs;

        if (this.solves.length >= maxSolvesCount) {
          this.archivedWithNotice("Max Limit");
        } else if (this.solves.length === autoArchiveSessionThreshold) {
          if (needAutoArchiveHint) {
            this.archiveSessionHandler();
          } else {
            this.archivedWithNotice("Auto Archived");
          }
        }
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
