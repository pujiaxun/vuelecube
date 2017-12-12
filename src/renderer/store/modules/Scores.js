import db from '../../datastore';
// TODO: Add common handler for db error.

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
  ARCHIVE_SESSION_FROM_SCORES(state) {
    state.scores = [];
  },
};

const SCORES_TABLE_NAME = 'scores';
const SESSIONS_TABLE_NAME = 'sessions';

const actions = {
  getCurrentScores({ commit }) {
    db.find({ table: SCORES_TABLE_NAME })
      .sort({ created_at: 1 })
      .exec((__, scores) => {
        commit('GET_CURRENT_SCORES', { scores });
      });
  },
  addNewScore({ commit }, { ms, dnf, pop }) {
    db.insert({
      table: SCORES_TABLE_NAME,
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
  archiveSession({ commit }) {
    db.find({ table: SCORES_TABLE_NAME })
      .sort({ created_at: 1 })
      .exec((__, originScores) => {
        const scores = originScores.map(({ ms, dnf, pop }) => ({ ms, dnf, pop }));
        db.insert({
          table: SESSIONS_TABLE_NAME,
          scores,
          created_at: new Date(),
        }, () => {
          db.remove({ table: SCORES_TABLE_NAME }, { multi: true }, () => {
            commit('ARCHIVE_SESSION_FROM_SCORES');
          });
        });
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
