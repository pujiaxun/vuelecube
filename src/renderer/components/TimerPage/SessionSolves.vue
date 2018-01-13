<template lang="pug">
  .solve-wrapper
    Card
      p(slot='title')
        Icon(type='ribbon-b')
        | Current Session

      .buttons-container
        ButtonGroup(shape='circle')
          Button(:disabled='solves.length < 3'
            type='primary'
            @click='archiveSessionHandler') Archive
          Button(:disabled='solves.length === 0'
            @click='clearSessionHandler') Reset

      ul.solves-list
        transition-group(name='list' tag='div')
          li(v-for='(solve, index) in solves' :key='solve._id')
            Row.solve-row
              i-col.solve-order(span='4') {{ index + 1 }}.
              i-col.solve-ms(span='12' :title='solve.scramble')
                | {{ solve | solveDisplay }}
              i-col.solve-edit(span='4' @click.native='editSolveHandler(solve._id)')
                Icon(type='edit')
              i-col.solve-rm(span='4' @click.native='deleteSolveHandler(solve._id)')
                Icon(type='close-round')
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
      editSolveHandler(_id) {
        // TODO: implement
        console.log(_id);
      },
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
      archiveSessionHandler() {
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
      clearSessionHandler() {
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
          maxSessionSolves,
          autoArchiveSessionThreshold,
          needAutoArchiveHint,
        } = this.configs;

        if (this.solves.length >= maxSessionSolves) {
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
      solveDisplay(solve) {
        let ms = solve.ms;
        if (solve.dnf) {
          return 'DNF';
        } else if (solve.plus2) {
          ms += 2000;
        }
        return utils.ms2time(ms);
      },
    },
  };
</script>

<style lang='scss' scoped>
  $shallow-white: rgba(128, 128, 128, 0.3);

  .solve-wrapper {
    user-select: none;
  }

  .buttons-container {
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid $shallow-white;
  }

  .solves-list {
    // TODO: supalashi trasition
    max-height: 400px;
    overflow-y: auto;
  }

  .solve-row {
    padding: 5px;
    line-height: 1;
    font-size: 14px;
    border-radius: 2px;
    border-bottom: 1px dashed $shallow-white;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: $shallow-white;
    }

    .solve-ms {
    }

    .solve-edit, .solve-rm {
      text-align: center;
      cursor: pointer;
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateX(90%);
  }
</style>
