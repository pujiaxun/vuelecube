import db from '../../datastore';
// TODO: Add common handler for db error.

const state = {
  solves: [],
};

const mutations = {
  ADD_NEW_SOLVE(state, { solve }) {
    state.solves.push(solve);
  },
  GET_CURRENT_SOLVES(state, { solves }) {
    state.solves = solves;
  },
  REMOVE_SOLVE(state, { _id }) {
    /* eslint-disable no-underscore-dangle */
    state.solves = state.solves.filter(s => s._id !== _id);
  },
  ARCHIVE_SESSION_FROM_SOLVES(state) {
    state.solves = [];
  },
};

const SOLVES_TABLE_NAME = 'solves';
const SESSIONS_TABLE_NAME = 'sessions';

const actions = {
  getCurrentSolves({ commit }) {
    db.find({ table: SOLVES_TABLE_NAME })
      .sort({ created_at: 1 })
      .exec((__, solves) => {
        commit('GET_CURRENT_SOLVES', { solves });
      });
  },
  addNewSolve({ commit }, { ms, dnf, pop }) {
    db.insert({
      table: SOLVES_TABLE_NAME,
      ms,
      dnf,
      pop,
      created_at: new Date(),
    }, (err, solve) => {
      commit('ADD_NEW_SOLVE', { solve });
    });
  },
  deleteSolve({ commit }, { _id }) {
    db.remove({ _id }, () => {
      commit('REMOVE_SOLVE', { _id });
    });
  },
  archiveSession({ commit }) {
    db.find({ table: SOLVES_TABLE_NAME })
      .sort({ created_at: 1 })
      .exec((__, originSolves) => {
        const solves = originSolves.map(({ ms, dnf, pop }) => ({ ms, dnf, pop }));
        db.insert({
          table: SESSIONS_TABLE_NAME,
          solves,
          created_at: new Date(),
        }, () => {
          db.remove({ table: SOLVES_TABLE_NAME }, { multi: true }, () => {
            commit('ARCHIVE_SESSION_FROM_SOLVES');
          });
        });
      });
  },
};

const getters = {
  allSolves: state => state.solves,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
