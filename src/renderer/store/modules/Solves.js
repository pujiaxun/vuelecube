/**
 * Solve schema:
 *
 * table: {String} database table name
 * ms: {Number} milliseconds cost of this solve
 * dnf: {Boolean} did not finish
 * plus2: {Boolean} plus 2s
 * cube_type: {String} cube type of this solve
 * created_at: {Date} when the solve has done
 */

import db from '../../datastore';
// TODO: Add common handler for db error.

const state = {
  solves: [],
};

const mutations = {
  ADD_NEW_SOLVE(state, { solve }) {
    state.solves.push(solve);
  },
  SET_CURRENT_SOLVES(state, { solves }) {
    state.solves = solves;
  },
  REMOVE_SOLVE(state, { _id }) {
    state.solves = state.solves.filter(s => s._id !== _id);
  },
  CLEAR_SOLVES(state) {
    state.solves = [];
  },
};

const SOLVES_TABLE_NAME = 'solves';
const SESSIONS_TABLE_NAME = 'sessions';

const actions = {
  getCurrentSolves({ commit }, { cubeType }) {
    db.find({ table: SOLVES_TABLE_NAME, cube_type: cubeType })
      .sort({ created_at: 1 })
      .exec((__, solves) => {
        commit('SET_CURRENT_SOLVES', { solves });
      });
  },
  addNewSolve({ commit }, { ms, dnf, plus2, scramble, cubeType }) {
    db.insert({
      table: SOLVES_TABLE_NAME,
      ms,
      dnf,
      plus2,
      scramble,
      cube_type: cubeType,
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
  archiveSession({ commit, state }, { cubeType }) {
    const solves = state.solves.map(
      ({ _id, table, cube_type, ...target }) => target);
    db.insert({
      table: SESSIONS_TABLE_NAME,
      solves,
      cube_type: cubeType,
      created_at: new Date(),
    }, () => {
      db.remove({
        table: SOLVES_TABLE_NAME,
        cube_type: cubeType,
      }, { multi: true }, () => {
        commit('CLEAR_SOLVES');
      });
    });
  },
  clearSession({ commit }, { cubeType }) {
    db.remove({
      table: SOLVES_TABLE_NAME,
      cube_type: cubeType,
    }, { multi: true }, () => {
      commit('CLEAR_SOLVES');
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
