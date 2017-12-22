/**
 * Session schema:
 *
 * table: {String} database table name
 * solves: {Array} a list of solves
 * cube_type: {String} type of the cube in this session
 * created_at: {Date} when the session has done
 */

import db from '../../datastore';

const state = {
  sessions: [],
};

const mutations = {
  SET_SESSIONS(state, { sessions }) {
    state.sessions = sessions;
  },
};

const SESSIONS_TABLE_NAME = 'sessions';

const actions = {
  getSessions({ commit }) {
    db.find({ table: SESSIONS_TABLE_NAME })
      .sort({ created_at: 1 })
      .exec((__, sessions) => {
        commit('SET_SESSIONS', { sessions });
      });
  },
};

const getters = {
  allSessions: state => state.sessions,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
