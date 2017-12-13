import db from '../../datastore';
// TODO: Add common handler for db error.

const state = {
  solves: [],
  cubeType: '',
};

const mutations = {
  ADD_NEW_SOLVE(state, { solve }) {
    state.solves.push(solve);
  },
  SET_CURRENT_SOLVES(state, { solves }) {
    state.solves = solves;
  },
  REMOVE_SOLVE(state, { _id }) {
    /* eslint-disable no-underscore-dangle */
    state.solves = state.solves.filter(s => s._id !== _id);
  },
  CLEAR_SOLVES(state) {
    state.solves = [];
  },
  UPDATE_CUBE_TYPE(state, { type }) {
    state.cubeType = type;
  },
};

const SOLVES_TABLE_NAME = 'solves';
const SESSIONS_TABLE_NAME = 'sessions';
const CONFIGS_TABLE_NAME = 'configs';
const DEFAULT_CUBE_TYPE = '333';

const actions = {
  getCurrentCubeType({ commit }) {
    db.findOne({
      table: CONFIGS_TABLE_NAME,
      name: 'cubeType',
    }, (_, config) => {
      const type = config ? config.value : DEFAULT_CUBE_TYPE;
      commit('UPDATE_CUBE_TYPE', { type });
    });
  },
  updateCubeType({ commit }, { type }) {
    db.update({
      table: CONFIGS_TABLE_NAME,
      name: 'cubeType',
    }, {
      table: CONFIGS_TABLE_NAME,
      name: 'cubeType',
      value: type,
    }, { upsert: true }, () => {
      commit('UPDATE_CUBE_TYPE', { type });
    });
  },
  getCurrentSolves({ commit }) {
    db.find({ table: SOLVES_TABLE_NAME })
      .sort({ created_at: 1 })
      .exec((__, solves) => {
        commit('SET_CURRENT_SOLVES', { solves });
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
  archiveSession({ commit, state }) {
    const solves = state.solves.map(({ ms, dnf, pop }) => ({ ms, dnf, pop }));
    db.insert({
      table: SESSIONS_TABLE_NAME,
      solves,
      cube_type: state.cubeType,
      created_at: new Date(),
    }, () => {
      db.remove({ table: SOLVES_TABLE_NAME }, { multi: true }, () => {
        commit('CLEAR_SOLVES');
      });
    });
  },
};

const getters = {
  allSolves: state => state.solves,
  currentCubeType: state => state.cubeType,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
