import db from '../../datastore';

const state = {
  scores: [],
};

const mutations = {
  ADD_NEW_SCORE(state, { score }) {
    state.scores.push(score);
  },
  GET_CURRENT_SCORES(state, { scores }) {
    state.scores = scores;
  },
  REMOVE_SCORE(state, { _id }) {
    /* eslint-disable no-underscore-dangle */
    state.scores = state.scores.filter(s => s._id !== _id);
  },
};

const actions = {
  getCurrentScores({ commit }) {
    db.find({ table: 'currentSession' })
      .sort({ created_at: 1 })
      .exec((__, scores) => {
        commit('GET_CURRENT_SCORES', { scores });
      });
  },
  addNewScore({ commit }, { ms, dnf, pop }) {
    db.insert({
      table: 'currentSession',
      ms,
      dnf,
      pop,
      created_at: new Date(),
    }, (err, score) => {
      commit('ADD_NEW_SCORE', { score });
    });
  },
  deleteScore({ commit }, { _id }) {
    db.remove({ _id }, () => {
      commit('REMOVE_SCORE', { _id });
    });
  },
};

const getters = {
  allScores: state => state.scores,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
