import Scrambo from "scrambo";

const state = {
  scramble: '',
};

const mutations = {
  SET_SCRAMBLE(state, { scramble }) {
    state.scramble = scramble;
  },
};

const actions = {
  updateScramble({ commit }, { cubeType }) {
    if (cubeType) {
      const scramble = new Scrambo().type(cubeType).get()[0];
      commit('SET_SCRAMBLE', { scramble });
    }
  },
};

const getters = {
  currentScramble: state => state.scramble,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
