<template>
  <div class="solve-wrapper">
    <Card>
      <p slot="title">
        <Icon type="ribbon-b"></Icon>
        Current Session
      </p>
      <div class="buttons-container">
        <ButtonGroup shape="circle">
          <Button :disabled="solves.length < 3"
            type="primary"
            @click="archiveSessionHandler"
          >
            Archive
          </Button>
          <Button :disabled="solves.length === 0" @click="clearSessionHandler">
            Reset
          </Button>
        </ButtonGroup>
      </div>
      <ul class="solves-list">
        <!-- TODO: reversed order -->
        <li v-for="(solve, index) in solves" :key="solve._id">
          <Row class="solve-row">
            <i-col span="4" class="solve-order">{{ index + 1 }}.</i-col>
            <i-col span="12" class="solve-ms">{{ solve.ms | ms2time }}</i-col>
            <i-col span="4" class="solve-edit"
              @click.native="editSolveHandler(solve._id)">
              <Icon type="edit"></Icon>
            </i-col>
            <i-col span="4" class="solve-rm"
              @click.native="deleteSolveHandler(solve._id)">
              <Icon type="close-round"></Icon>
            </i-col>
          </Row>
        </li>
      </ul>
    </Card>
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
      archiveSessionHandler(e) {
        e && e.target.blur();
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
        e && e.target.blur();
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
      ms2time: utils.ms2time,
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
    padding: 5px 0;
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
</style>
